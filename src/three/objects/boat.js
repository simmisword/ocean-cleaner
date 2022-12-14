import * as THREE from "three";

export class Boat {
  constructor(_scene) {
    _scene.scale.set(3, 3, 3);
    _scene.position.set(5, 12.9, -20);

    // _scene.applyMatrix(new THREE.Matrix4().makeTranslation(3, 0, -3));

    this.boat = _scene;
    this.boat.visible = false;
    console.log(this.boat);
    this.speed = {
      vel: 0,
      rot: 0,
    };
  }

  update() {
    if (this.boat) {
      // this.boat.rotation.y += this.speed.rot;
      this.boat.rotateY(this.speed.rot);
      this.boat.translateX(this.speed.vel);
    }
  }

  stop() {
    this.speed.rot = 0;
    this.speed.vel = 0;
  }
}
