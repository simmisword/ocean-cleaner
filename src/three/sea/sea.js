import * as THREE from "three";
import { random } from "../../utils.js";

import { WaterSurface } from "./WaterSurface.js";
import { WaterUndergound } from "./WaterUnderground.js";

export class Sea {
  constructor(worldSize, fog) {
    this.waterUp = new WaterSurface(worldSize, fog);
    this.waterDown = new WaterSurface(worldSize, fog);

    this.waterUp.rotation.x = -Math.PI / 2;
    this.waterDown.rotation.x = Math.PI / 2;
    this.waterDown.position.setY(-0.01);

    // this.initWaterLife();
  }

  initWaterLife() {
    this.planctonVertices = [];

    for (let i = 0; i < worldSize * worldSize; i++) {
      const x = THREE.MathUtils.randFloatSpread(worldSize);
      const y = THREE.MathUtils.randFloatSpread(worldSize) - worldSize / 2;
      const z = THREE.MathUtils.randFloatSpread(worldSize);

      this.planctonVertices.push(x, y, z);
    }

    this.planctonGeometry = new THREE.BufferGeometry();
    this.planctonGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(this.planctonVertices, 3)
    );

    this.plactonMaterial = new THREE.PointsMaterial({ color: 0x888888 });

    this.planctonPoints = new THREE.Points(
      this.planctonGeometry,
      this.plactonMaterial
    );
  }

  update() {
    this.waterUp.material.uniforms["time"].value += 1.0 / 60.0;
    this.waterDown.material.uniforms["time"].value += 1.0 / 60.0;

    // this.updatePlanctonParticles();
  }

  updatePlanctonParticles() {
    let pointsVertices = this.planctonPoints.geometry.attributes.position.array;
    for (let i = 0; i < pointsVertices.length; i += 3) {
      this.planctonPoints.geometry.attributes.position.array[i] += random(
        -1,
        1
      );
      this.planctonPoints.geometry.attributes.position.array[i + 1] += random(
        -1,
        1
      );
      this.planctonPoints.geometry.attributes.position.array[i + 2] += random(
        -1,
        1
      );
    }
  }
}
