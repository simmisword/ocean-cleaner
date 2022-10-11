import * as THREE from "three";

import { Sky } from "three/examples/jsm/objects/Sky.js";

export class SceneSky {
  constructor(worldSize) {
    this.sky = new Sky();
    this.sky.scale.setScalar(worldSize);

    this.skyUniforms = this.sky.material.skyUniforms;

    this.sun = new THREE.Vector3();

    this.effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: 180,
    };
  }

  updateSky() {
    this.skyUniforms = this.sky.material.uniforms;
    this.skyUniforms["turbidity"].value = this.effectController.turbidity;
    this.skyUniforms["rayleigh"].value = this.effectController.rayleigh;
    this.skyUniforms["mieCoefficient"].value =
      this.effectController.mieCoefficient;
    this.skyUniforms["mieDirectionalG"].value =
      this.effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - this.effectController.elevation);
    const theta = THREE.MathUtils.degToRad(this.effectController.azimuth);

    this.sun.setFromSphericalCoords(1, phi, theta);

    this.skyUniforms["sunPosition"].value.copy(this.sun);

    // this.sky.material.skyUniforms.nee;
  }
}
