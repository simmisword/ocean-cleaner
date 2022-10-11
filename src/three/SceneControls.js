import * as THREE from "three";

import { FlyControls } from "three/examples/jsm/controls/FlyControls";

export class SceneControls {
  constructor(width, height) {
    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    this.setCameraToStartPoint();

    // Controls
    this.controls = new FlyControls(this.camera, this.renderer.domElement);
    this.controls.movementSpeed = 100;
    this.controls.rollSpeed = Math.PI / 4;
    this.controls.autoForward = false;
    this.controls.dragToLook = true;
    this.speed = {
      vel: 0,
      rot: 0,
    };
    // this.gui = new dat.GUI();
  }

  initGuiControls(plasticParticles) {
    this.particlesControls = this.gui.addFolder("Plastic Particles");

    this.particlesControls
      .add(plasticParticles, "AMOUNTX")
      .min(0)
      .max(5000)
      .step(10);
  }

  setCameraToStartPoint() {
    this.camera.position.set(30, -1, 100);
  }

  setCameraToPoint(x, z, rotationY) {
    this.camera.position.set(x, -1, z);
    this.camera.translateX(-50);
    this.camera.translateZ(10);
    this.camera.rotation.y = rotationY;
    console.log(this.camera.position);
  }

  update() {
    if (this.camera) {
      this.camera.rotation.y += this.speed.rot;
      this.camera.translateZ(-this.speed.vel);
    }
  }

  stop() {
    this.speed.rot = 0;
    this.speed.vel = 0;
  }
}
