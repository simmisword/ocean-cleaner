import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

export class WaterSurface {
  constructor(worldSize, fog) {
    const waterGeometry = new THREE.PlaneGeometry(worldSize, worldSize);
    return new Water(waterGeometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals: new THREE.TextureLoader().load(
        "assets/textures/waternormals.jpeg",
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      // distortionScale: .1,
      scale: 2,
      fog: fog !== undefined,
      // material: {
      //   transparent: true,
      //   opacity: 0.1,
      // },
    });
  }
}
