import * as THREE from "three";

import { objectLoader, loadModel } from "./objects/ObjectLoader";

// import { TrashObjects } from "./objects/trash-objects.js";
import { Boat } from "./objects/boat.js";
import { PlasticParticles } from "./objects/PlasticParticles";

import { Terrain } from "./terrain/terrain.js";
import { Sea } from "./sea/Sea.js";
import { SceneSky } from "./sky/Sky.js";
import { SceneControls } from "./SceneControls.js";
import { AudioPlayer } from "../audio/audio-player.js";

import { Trashstore } from "./calculation/TrashStore.js";
import { TrashObjects } from "./objects/TrashObjects.js";
import { map } from "../utils";

export class WaterScene {
  constructor(year) {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.worldSize = 1000;

    this.collectTrash = 0;
    this.currentYear = year;
    this.mode = "growth";
    this.trashStore = new Trashstore();

    this.objectLoader = objectLoader;

    this.boat;
    this.trash = new TrashObjects();

    this.loadObjects();

    this.sceneControls = new SceneControls(this.sizes.width, this.sizes.height);
    this.controls = this.sceneControls.controls;
    this.renderer = this.sceneControls.renderer;
    this.camera = this.sceneControls.camera;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x786563, 0.0003);

    this.sun = new THREE.Vector3();

    this.sky = new SceneSky(this.worldSize);
    this.scene.add(this.sky.sky);

    this.sea = new Sea(this.worldSize, this.scene.fog);
    this.scene.add(this.sea.waterUp);
    this.scene.add(this.sea.waterDown);
    // this.scene.add(this.sea.planctonPoints);

    this.terrain = new Terrain(this.worldSize);
    this.scene.add(this.terrain.mesh);

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.updateSun();

    this.plasticParticles = new PlasticParticles();
    this.scene.add(this.plasticParticles.particles);

    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    this.audioPlayer = new AudioPlayer(this.listener);
    this.updateYear(0);
  }

  async loadObjects() {
    let boatModel = await loadModel("assets/boat/scene.gltf");

    this.boat = new Boat(boatModel);
    if (this.collectTrash) {
      this.scene.add(this.boat.boat);
    }

    this.trash.trashList.forEach((trash) => {
      this.scene.add(trash.trash);
    });
  }

  updateSun() {
    const parameters = {
      elevation: 2,
      azimuth: 180,
    };

    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    this.sun.setFromSphericalCoords(1, phi, theta);

    this.sky.sky.material.uniforms["sunPosition"].value.copy(this.sun);
    this.sea.waterUp.material.uniforms["sunDirection"].value
      .copy(this.sun)
      .normalize();
    this.sea.waterDown.material.uniforms["sunDirection"].value
      .copy(this.sun)
      .normalize();

    this.scene.environment = this.pmremGenerator.fromScene(
      this.sky.sky
    ).texture;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();

    if (this.controls) {
      this.controls.update(0.01);
    }

    this.plasticParticles.render();
  }

  render() {
    const time = performance.now() * 0.001;

    if (this.collectTrash) {
      if (this.boat) {
        this.boat.update();
        this.sceneControls.update();

        this.checkCollisions();
      }
    }
    if (this.trash) {
      this.trash.trashList.forEach((trash) => {
        if (trash.trash) {
          if (trash.trash.visible) {
            trash.update();
          }
        }
      });
    }

    this.sea.update();

    this.renderer.render(this.scene, this.camera);
  }

  checkCollisions() {
    if (this.boat.boat) {
      this.trash.trashList.forEach((trash) => {
        if (trash.trash) {
          if (this.isColliding(this.boat.boat.position, trash.trash.position)) {
            this.scene.remove(trash.trash);
            this.trash.trashList = this.trash.trashList.filter((item) => {
              return item !== trash;
            });
          }
        }
      });
    }
  }

  isColliding(obj1Pos, obj2Pos) {
    return (
      Math.abs(obj1Pos.x - obj2Pos.x) < 15 &&
      Math.abs(obj1Pos.z - obj2Pos.z) < 15
    );
  }

  playMusic() {
    // Check if context is in suspended state (autoplay policy)
    if (this.audioPlayer.audioCtx.state === "suspended") {
      this.audioPlayer.audioCtx.resume();
    }

    // Play or pause track depending on state
    if (!this.audioPlayer.isPlaying()) {
      this.audioPlayer.play();
    } else {
      this.audioPlayer.pause();
    }
  }

  changeAudioMood(index) {
    this.audioPlayer.changeTrack(index);
  }

  muteAudio() {
    return this.audioPlayer.mute();
  }

  updateYear(increment) {
    if (this.currentYear <= 2050 && this.currentYear >= 1950) {
      this.currentYear += increment;
      this.setTrashAmount();
      let index = Math.round(
        this.trashStore.getMacroTrashFactor(this.currentYear, this.mode) *
          (this.audioPlayer.paths.length - 1)
      );
      if (this.audioPlayer.currentPathID !== index) {
        this.changeAudioMood(index);
      }
      this.renderer.toneMappingExposure = map(
        1 - this.trashStore.getMacroTrashFactor(this.currentYear, this.mode),
        0,
        1,
        0.5,
        1
      );
    }
  }

  changeMode(newMode) {
    this.mode = newMode;
    this.updateYear(0);
  }

  setTrashAmount() {
    let amount =
      this.trashStore.getMacroTrashFactor(this.currentYear, this.mode) *
      this.trash.MAX_TRASH_COUNT;
    this.trash.updateVisibility(amount);

    this.plasticParticles.setAmount(
      this.trashStore.getMicroTrashFactor(this.currentYear, this.mode)
    );
    this.plasticParticles.updatePlasticPosition();
  }

  switchCollect() {
    if (this.collectTrash) {
      this.collectTrash = 0;
      this.scene.remove(this.boat.boat);
      this.sceneControls.setCameraToStartPoint();
      // deactivateButton(collectButton);
    } else {
      this.collectTrash = 1;
      this.scene.add(this.boat.boat);
      const x = this.boat.boat.position.x;
      const y = this.boat.boat.position.y;
      const z = this.boat.boat.position.z;
      const rotationX = this.boat.boat.rotation.x;
      const rotationY = this.boat.boat.rotation.y - Math.PI / 2;
      const rotationZ = this.boat.boat.rotation.z;
      this.sceneControls.setCameraToPoint(
        x,
        y,
        z,
        rotationX,
        rotationY,
        rotationZ
      );
      // activateButton(collectButton);
    }
  }

  moveBoat(value) {
    this.boat.speed.vel = value;
    this.sceneControls.speed.vel = value;
  }

  rotateBoat(value) {
    this.boat.speed.rot = value;
    this.sceneControls.speed.rot = value;
  }

  stopBoat() {
    this.boat.stop();
    this.sceneControls.stop();
  }
}
