import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const objectLoader = new GLTFLoader();

async function loadModel(url) {
  return new Promise((resolve, reject) => {
    if (objectLoader) {
      objectLoader.load(url, (gltf) => {
        resolve(gltf.scene);
      });
    }
  });
}

export { objectLoader, loadModel };
