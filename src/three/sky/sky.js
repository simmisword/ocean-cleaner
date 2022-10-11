import { Sky } from "three/examples/jsm/objects/Sky.js";

export class SceneSky {
  constructor(worldSize) {
    this.sky = new Sky();
    this.sky.scale.setScalar(worldSize);

    this.skyUniforms = this.sky.material.skyUniforms;
  }
}
