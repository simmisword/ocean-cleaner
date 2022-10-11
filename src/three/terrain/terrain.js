import * as THREE from "three";

import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import { data } from "./position";

export class Terrain {
  constructor(worldSize) {
    this.worldWidth = 32;
    this.worldDepth = 32;
    this.worldHalfWidth = this.worldWidth / 2;
    this.worldHalfDepth = this.worldDepth / 2;
    this.costalLine = [];
    this.data = data;

    this.geometry = new THREE.PlaneGeometry(
      worldSize,
      worldSize,
      this.worldWidth - 1,
      this.worldDepth - 1
    );

    this.geometry.rotateX(-Math.PI / 2);

    this.vertices = this.geometry.attributes.position.array;

    for (let i = 0, j = 0, l = this.vertices.length; i < l; i++, j += 3) {
      this.vertices[j + 1] = this.data[i] * 10;
    }

    this.geometry.attributes.position.needsUpdate = true;

    this.texture = new THREE.CanvasTexture(this.generateTexture());
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;

    this.mesh = new THREE.Mesh(
      this.geometry,
      new THREE.MeshBasicMaterial({ map: this.texture })
    );
    this.mesh.position.set(0, -250, 0);
    this.mesh.scale.set(1, 0.5, 1);

    this.mesh.rotation.y = Math.PI / 2;
  }

  generateHeight() {
    const size = this.worldWidth * this.worldDepth,
      data = new Uint8Array(size),
      perlin = new ImprovedNoise(),
      z = 25 + Math.random() * 50;

    let quality = 1;

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < size; i++) {
        const x = i % this.worldWidth,
          y = ~~(i / this.worldWidth);
        data[i] += Math.abs(
          perlin.noise(x / quality, y / quality, z) * quality * 1.75
        );
      }

      quality *= 5;
    }

    return data;
  }

  generateTexture() {
    // bake lighting into texture
    const data = this.data;
    const width = this.worldWidth;
    const height = this.worldDepth;

    let context, image, imageData, shade;

    const vector3 = new THREE.Vector3(0, 0, 0);

    const sun = new THREE.Vector3(1, 1, 1);
    sun.normalize();

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    image = context.getImageData(0, 0, canvas.width, canvas.height);
    imageData = image.data;

    for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
      vector3.x = data[j - 2] - data[j + 2];
      vector3.y = 2;
      vector3.z = data[j - width * 2] - data[j + width * 2];
      vector3.normalize();

      shade = vector3.dot(sun);

      imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
      imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
      imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
    }

    context.putImageData(image, 0, 0);

    // Scaled 4x

    // const canvasScaled = document.createElement("canvas");
    // canvasScaled.width = width * 4;
    // canvasScaled.height = height * 4;

    // context = canvasScaled.getContext("2d");
    // context.scale(4, 4);
    // context.drawImage(canvas, 0, 0);

    // image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
    // imageData = image.data;

    // for (let i = 0, l = imageData.length; i < l; i += 4) {
    //   const v = ~~(Math.random() * 5);

    //   imageData[i] += v;
    //   imageData[i + 1] += v;
    //   imageData[i + 2] += v;
    //   if (imageData[i + 1] === 0) {
    //     this.costalLine.push([
    //       imageData[i],
    //       imageData[i + 1],
    //       imageData[i + 2],
    //     ]);
    //   }
    // }

    // context.putImageData(image, 0, 0);

    return canvas;
  }
}
