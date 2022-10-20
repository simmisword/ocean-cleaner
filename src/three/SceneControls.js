import * as THREE from "three";
import { gsap } from "gsap";

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

    // this.controls = new OrbitControls( camera, renderer.domElement );

    // //controls.update() must be called after any manual changes to the camera's transform
    // this.camera.position.set( 0, 20, 100 );
    // this.controls.update();

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
    gsap.to(this.camera.position, { duration: 2, x: 30, y: -1, z: 100 });
    // this.camera.position.set(30, -1, 100);
  }

  setCameraToPoint(x, z, rotation) {
    this.camera.position.set(x, -1, z);

    this.camera.rotation.x = rotation.x;
    this.camera.rotation.y = rotation.y; //- Math.PI / 2;
    this.camera.rotation.z = rotation.z;

    this.camera.rotateY(-Math.PI / 2);

    this.camera.translateX(10);
    this.camera.translateZ(100);
    // var t1 = gsap.timeline({ duration: 0.1 });
    // t1.to(this.camera.position, { x: x, y: -1, z: z }).to(
    //   this.camera.rotation,
    //   {
    //     y: rotation.y - Math.PI / 2,
    //   }
    // );

    // gsap.to(this.camera.position, { duration: 0.5, x: x, y: -1, z: z });
    // this.camera.position.set(x, -1, z);
    // this.camera.translateX(-50);
    // this.camera.translateZ(10);
    // gsap.to(this.camera.rotation, {
    //   duration: 0.5,
    //   y: rotationY,
    // });
    // console.log(rotationY, this.camera.rotation.y);
  }

  // update() {
  //   if (this.camera) {
  //     this.camera.rotation.y += this.speed.rot;
  //     this.camera.translateZ(-this.speed.vel);
  //   }
  // }

  // stop() {
  //   this.speed.rot = 0;
  //   this.speed.vel = 0;
  // }

  isUnderWater() {
    return this.camera.position.y < 0;
  }
}
