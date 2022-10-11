import { random } from "../../utils";

export class Trash {
  constructor(_scene, scaleX, scaleY, scaleZ) {
    _scene.scale.set(scaleX, scaleY, scaleZ);

    _scene.rotation.x = Math.PI * random(0, 1);
    _scene.rotation.y = Math.PI * random(0, 1);
    _scene.rotation.z = Math.PI * random(0, 1);

    _scene.position.set(random(-500, 500), random(-1, -50), random(-500, 500));

    this.trash = _scene;
    this.count = 0;
  }

  update() {
    if (this.count % 5 === 0) {
      let newX = this.trash.position.x - 0.01 + random(-0.01, 0.01);
      let newY = this.trash.position.y + random(-0.01, 0.01);
      let newZ = this.trash.position.z - 0.01 + random(-0.01, 0.01);
      this.trash.position.set(newX, newY, newZ);

      this.trash.rotation.x += Math.PI * random(0, 0.001);
      this.trash.rotation.y += Math.PI * random(0, 0.001);
      this.trash.rotation.z += Math.PI * random(0, 0.001);
    }
  }
}
