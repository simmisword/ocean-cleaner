import * as THREE from "three";
import { gsap } from "gsap";

import { objectLoader, loadModel } from "./objects/ObjectLoader";

// import { TrashObjects } from "./objects/trash-objects.js";
import { Boat } from "./objects/Boat.js";
import { PlasticParticles } from "./objects/PlasticParticles";

import { Terrain } from "./terrain/Terrain.js";
import { Sea } from "./sea/Sea.js";
import { SceneSky } from "./sky/SceneSky.js";
import { SceneControls } from "./SceneControls.js";
import { AudioPlayer } from "../audio/AudioPlayer.js";

import { Trashstore } from "./calculation/TrashStore.js";
import { TrashObjects } from "./objects/TrashObjects.js";
import { map } from "../utils";
import { currentYear } from "../vue/yearStore";

export class WaterScene {
  constructor(year) {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.worldSize = 1000;

    this.collectTrash = 0;
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
    this.scene.fog = new THREE.FogExp2(0x786563, 0.003);

    this.sky = new SceneSky(this.worldSize);
    this.scene.add(this.sky.sky);

    this.sea = new Sea(this.worldSize, this.scene.fog);
    this.scene.add(this.sea.waterUp);
    this.scene.add(this.sea.waterDown);
    // this.scene.add(this.sea.planctonPoints);

    this.terrain = new Terrain(this.worldSize, this.sky.sun);
    this.scene.add(this.terrain.mesh);

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.updateSun();

    this.plasticParticles = new PlasticParticles();
    this.scene.add(this.plasticParticles.particles);

    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    this.audioPlayer = new AudioPlayer(this.listener);
    // this.updateTrash(0);
  }

  async loadObjects() {
    let boatModel = await loadModel("assets/boat/scene.gltf");

    this.boat = new Boat(boatModel);
    this.scene.add(this.boat.boat);

    this.trash.trashList.forEach((trash) => {
      this.scene.add(trash.trash);
    });
  }

  updateSun(duration) {
    // const parameters = {
    //   elevation: 2,
    //   azimuth: 180,
    // };

    // const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    // const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    // this.sun.setFromSphericalCoords(1, phi, theta);

    // this.sky.sky.material.uniforms["sunPosition"].value.copy(this.sun);
    const sun = this.sky.sun.normalize();
    gsap.to(this.sea.waterUp.material.uniforms["sunDirection"].value, {
      duration: duration,
      x: sun.x,
      y: sun.y,
      z: sun.z,
    });
    gsap.to(this.sea.waterDown.material.uniforms["sunDirection"].value, {
      duration: duration,
      x: sun.x,
      y: sun.y,
      z: sun.z,
    });

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
    const time = performance.now() * 0.01;

    if (this.collectTrash) {
      if (this.boat.boat.visible) {
        this.boat.update();
        // this.placeCameraBehindBoat();
        // this.sceneControls.update();

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
    this.handleAudioFrequency();

    this.renderer.render(this.scene, this.camera);
  }

  handleAudioFrequency() {
    if (this.sceneControls.isUnderWater() === true) {
      this.audioPlayer.changeFrequency(
        map(this.camera.position.y, 0, -50, 0.4, 0)
      );
    } else {
      this.audioPlayer.changeFrequency(1);
    }
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

  updateTrash(duration) {
    if (currentYear.currentYear <= 2050 && currentYear.currentYear >= 1950) {
      this.trashStore.trashfactor.update(currentYear.currentYear, this.mode);
      this.setTrashAmount(duration);
      let index = Math.round(
        this.trashStore.trashfactor.macro * (this.audioPlayer.paths.length - 1)
      );
      if (this.audioPlayer.currentPathID !== index) {
        this.changeAudioMood(index);
      }
      gsap.to(this.renderer, {
        duration: duration,
        toneMappingExposure: map(
          1 - this.trashStore.trashfactor.macro,
          0,
          1,
          0.6,
          1
        ),
      });
      this.sky.effectController.azimuth = map(
        this.trashStore.trashfactor.macro,
        0,
        1,
        -180,
        180
      );
      this.sky.effectController.elevation = map(
        this.trashStore.trashfactor.macro,
        1,
        0,
        0.5,
        15
      );
      this.sky.updateSky(duration);
      this.updateSun(duration);

      // this.terrain.updateTexture(this.sky.sun);
    }
  }

  changeMode(newMode) {
    this.mode = newMode;
    this.updateTrash(2);
  }

  setTrashAmount(duration) {
    let amount = this.trashStore.trashfactor.macro * this.trash.MAX_TRASH_COUNT;

    this.trash.updateVisibility(amount, duration);

    this.plasticParticles.setAmount(this.trashStore.trashfactor.micro);
    this.plasticParticles.updatePlasticPosition();
  }

  switchCollect() {
    if (this.collectTrash) {
      this.collectTrash = 0;
      this.boat.boat.visible = false;
      this.sceneControls.setCameraToStartPoint();
      // deactivateButton(collectButton);
    } else {
      this.collectTrash = 1;
      this.boat.boat.visible = true;
      this.placeCameraBehindBoat();
      // activateButton(collectButton);
    }
  }
  placeCameraBehindBoat() {
    // console.log(this.boat.boat.position);
    const x = this.boat.boat.position.x;
    const z = this.boat.boat.position.z;
    const rotation = this.boat.boat.rotation; // - Math.PI / 2;
    // console.log(
    //   "Boat rot y Degree",
    //   THREE.MathUtils.radToDeg(this.boat.boat.rotation.y)
    // );
    // console.log("Boat rot", this.boat.boat.rotation);
    this.sceneControls.setCameraToPoint(x, z, rotation);
  }

  moveBoat(value) {
    this.boat.speed.vel = value;
    this.placeCameraBehindBoat();
  }

  rotateBoat(value) {
    this.boat.speed.rot = value;
    console.log("Boat rot", value);
    this.placeCameraBehindBoat();
  }

  stopBoat() {
    this.boat.stop();
    // this.sceneControls.stop();
  }
}
