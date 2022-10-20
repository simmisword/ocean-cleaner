import * as THREE from "three";
import { map, random } from "../../utils";

// export class Particles {
//   constructor(width) {
//     this.amount = 5000;
//     // this.group = THREE.Group();
//     // const map = new THREE.TextureLoader().load("sprite.png");
//     const material = new THREE.SpriteMaterial();

//     for (let i = 0; i < worldSize * worldSize; i++) {
//       const x = THREE.MathUtils.randFloatSpread(worldSize);
//       const y = THREE.MathUtils.randFloatSpread(worldSize) - worldSize / 2;
//       const z = THREE.MathUtils.randFloatSpread(worldSize);

//       this.planctonVertices.push(x, y, z);
//     }

//     const sprite = new THREE.Sprite(material);
//     scene.add(sprite);
//   }
// }

export class PlasticParticles {
  constructor() {
    this.MAX_SEPERATION = 10;
    this.MIN_SEPERATION = 0;
    this.MAX_AMOUNT = 300;
    this.MIN_AMOUNT = 0;

    this.AMOUNTX = this.MAX_AMOUNT;
    this.AMOUNTY = this.MAX_AMOUNT;

    this.POS_MIN = -500;
    this.POS_MAX = 500;

    this.numParticles = this.MAX_AMOUNT * this.MAX_AMOUNT;

    this.positions = new Float32Array(this.numParticles * 3);
    this.scales = new Float32Array(this.numParticles);
    this.rotation = new Float32Array(this.numParticles);
    this.colors = new Float32Array(this.numParticles * 3);
    // this.colors.fill(random(0, 1));

    this.geometry = new THREE.BufferGeometry();

    this.particles;
    this.count = 0;
    this.initPlasticPosition();
    // this.scales.fill(10);

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.geometry.setAttribute(
      "scale",
      new THREE.BufferAttribute(this.scales, 1)
    );
    this.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(this.colors, 3)
    );
    this.geometry.setAttribute(
      "rotation",
      new THREE.BufferAttribute(this.rotation, 3)
    );

    this.texture = new THREE.TextureLoader().load(
      "../../assets/normal-map/triangle.png"
    );

    this.material = new THREE.PointsMaterial({
      // color: 0xffffff,
      // map: this.texture,
      size: 0.2,
      vertexColors: true,
      alphaTest: 0.5,
      // onBeforeCompile: (shader) => {
      //   shader.vertexShader = `
      //     attribute float rotation;
      //     varying float vRotation;
      //     ${shader.vertexShader}
      //   `.replace(
      //     `#include <fog_vertex>`,
      //     `#include <fog_vertex>
      //     vRotation = rotation;
      //     `
      //   );
      //   console.log(shader.vertexShader);
      //   shader.fragmentShader = `
      //     varying float vRotation;
      //     ${shader.fragmentShader}
      //   `.replace(
      //     `#include <map_particle_fragment>`,
      //     `
      //     #if defined( USE_MAP ) || defined( USE_ALPHAMAP )
      //       vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
      //     #endif
      //     #ifdef USE_MAP
      //       // MODIFICATION =======================================================
      //       float mid = 0.5;
      //       uv = vec2(
      //         cos(vRotation) * (uv.x - mid) + sin(vRotation) * (uv.y - mid) + mid,
      //         cos(vRotation) * (uv.y - mid) - sin(vRotation) * (uv.x - mid) + mid
      //       );
      //       // ====================================================================
      //       vec4 mapTexel = texture2D( map, uv );
      //       diffuseColor *= mapTexelToLinear( mapTexel );
      //     #endif
      //     #ifdef USE_ALPHAMAP
      //       diffuseColor.a *= texture2D( alphaMap, uv ).g;
      //     #endif
      //     `
      //   );
      //   console.log(shader.fragmentShader);
      // },
    });
    this.particles = new THREE.Points(this.geometry, this.material);
  }

  initPlasticPosition() {
    let i = 0,
      j = 0;
    for (let ix = 0; ix < this.MAX_AMOUNT; ix++) {
      for (let iy = 0; iy < this.MAX_AMOUNT; iy++) {
        this.positions[i] = map(
          ix,
          this.MIN_AMOUNT,
          this.AMOUNTX,
          this.POS_MIN,
          this.POS_MAX
        );
        this.positions[i + 1] =
          Math.sin((ix + this.count) * 0.5) * 0.5 +
          Math.sin((iy + this.count) * 0.5) * 0.5;
        this.positions[i + 2] = map(
          iy,
          this.MIN_AMOUNT,
          this.AMOUNTY,
          this.POS_MIN,
          this.POS_MAX
        );

        this.colors[i] = random(0, 1);
        this.colors[i + 1] = random(0, 1);
        this.colors[i + 2] = random(0, 1);

        this.scales[j] = random(0.1, 1);
        this.rotation[j] = random(0, 1) * Math.PI * 2;
        i += 3;
        j++;
      }
    }
    this.geometry.setDrawRange(0, this.AMOUNTX * this.AMOUNTY);
    // console.log(this.scales);
    // console.log(this.colors);
    // console.log(random(0, 1));
  }

  updatePlasticPosition() {
    const positions = this.particles.geometry.attributes.position.array;

    let i = 0;
    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i] =
          map(ix, this.MIN_AMOUNT, this.AMOUNTX, this.POS_MIN, this.POS_MAX) +
          random(-5, 5);
        positions[i + 1] =
          Math.sin((ix + this.count) * 0.5) * 0.5 +
          Math.sin((iy + this.count) * 0.5) * 0.5;
        positions[i + 2] =
          map(iy, this.MIN_AMOUNT, this.AMOUNTY, this.POS_MIN, this.POS_MAX) +
          random(-5, 5);
        i += 3;
      }
    }

    this.geometry.setDrawRange(0, this.AMOUNTX * this.AMOUNTY);
  }

  render() {
    const positions = this.particles.geometry.attributes.position.array;
    const scales = this.particles.geometry.attributes.scale.array;

    let i = 0,
      j = 0;

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i] -= 0.01 + random(-0.01, 0.01);
        positions[i + 2] -= 0.01 + random(-0.01, 0.01);

        positions[i + 1] =
          Math.sin((ix + this.count) * 0.3) * 0.1 +
          Math.sin((iy + this.count) * 0.5) * 0.1 -
          0.1;

        scales[j] = random(0.1, 1);

        i += 3;
        j++;
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
    this.particles.geometry.attributes.scale.needsUpdate = true;

    this.count += 0.1;
  }

  setAmount(trashFactor) {
    this.AMOUNTX = trashFactor * this.MAX_AMOUNT;
    this.AMOUNTY = trashFactor * this.MAX_AMOUNT;
    // this.particles.material.color.set((1 - trashFactor) * 0xffffff);
  }
}
