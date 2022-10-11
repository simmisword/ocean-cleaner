import * as THREE from "three";

import { Water } from "./Water2.js";

export class WaterUndergound {
  constructor(worldSize) {
    const waterGeometry = new THREE.PlaneGeometry(worldSize, worldSize);
    return new Water(waterGeometry, {
      color: 0x001e0f,
      scale: 2,
      flowDirection: new THREE.Vector2(1, 1),
      textureWidth: 1024,
      textureHeight: 1024,
      //   flowMap: new THREE.TextureLoader().load(
      //     "assets/textures/Water_1_M_Normal.jpeg"
      //   ),
    });
  }
}
