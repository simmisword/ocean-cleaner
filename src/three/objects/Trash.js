import { random } from "../../utils";
import { gsap } from "gsap";

export class Trash {
  constructor(_scene, scaleX, scaleY, scaleZ) {
    _scene.scale.set(scaleX, scaleY, scaleZ);

    _scene.rotation.x = Math.PI * random(0, 1);
    _scene.rotation.y = Math.PI * random(0, 1);
    _scene.rotation.z = Math.PI * random(0, 1);

    _scene.position.set(random(-500, 500), random(-1, -50), random(-500, 500));

    this.trash = _scene;
  }

  update() {
    gsap.to(this.trash.position, {
      duration: 0.1,
      x: this.trash.position.x - 0.01 + random(-0.005, 0.005),
      y: this.trash.position.y + random(-0.005, 0.005),
      z: this.trash.position.z - 0.01 + random(-0.005, 0.005),
    });
    // let newX = this.trash.position.x - 0.01 + random(-0.01, 0.01);
    // let newY = this.trash.position.y + random(-0.01, 0.01);
    // let newZ = this.trash.position.z - 0.01 + random(-0.01, 0.01);
    // this.trash.position.set(newX, newY, newZ);
    gsap.to(this.trash.rotation, {
      duration: 0.1,
      x: this.trash.rotation.x + Math.PI * random(0, 0.005),
      y: this.trash.rotation.y + Math.PI * random(0, 0.005),
      z: this.trash.rotation.z + Math.PI * random(0, 0.005),
    });
    // this.trash.rotation.x += Math.PI * random(0, 0.001);
    // this.trash.rotation.y += Math.PI * random(0, 0.001);
    // this.trash.rotation.z += Math.PI * random(0, 0.001);
  }
}
