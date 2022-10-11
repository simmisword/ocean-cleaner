import { loadModel } from "./ObjectLoader";
import { Trash } from "./Trash.js";

export class TrashObjects {
  constructor() {
    this.MAX_TRASH_COUNT = 500;
    this.GARBAGE_BAG_COUNT = 200;
    this.WATER_BOTTLE_COUNT = 500;
    this.PAINT_CAN_COUNT = 10;
    this.SARDINES_CAN_COUNT = 200;
    this.PETROL_CAN_COUNT = 10;
    this.trashList = [];

    this.initObjects();
  }

  async initObject(path, count, scaleX, scaleY, scaleZ) {
    let objectModel = await loadModel(path);

    for (let i = 0; i < count; i++) {
      if (objectModel) {
        const trash = new Trash(objectModel.clone(), scaleX, scaleY, scaleZ);
        this.trashList.push(trash);
      }
    }
  }

  async initObjects() {
    // this.trashObjects = new TrashObjects();

    // await this.initObject(
    //   "assets/3d-objects/garbage_bag/scene.gltf",
    //   this.GARBAGE_BAG_COUNT,
    //   1,
    //   1.5,
    //   1
    // );
    await this.initObject(
      "assets/3d-objects/plastic_water_bottle/scene.gltf",
      this.WATER_BOTTLE_COUNT,
      0.2,
      0.2,
      0.2
    );
    // await this.initObject(
    //   "assets/3d-objects/paint_can/scene.gltf",
    //   this.PAINT_CAN_COUNT,
    //   1,
    //   1,
    //   1
    // );
    // await this.initObject(
    //   "assets/3d-objects/rusty_can_of_sardines/scene.gltf",
    //   this.SARDINES_CAN_COUNT,
    //   0.01,
    //   0.01,
    //   0.01
    // );
    // await this.initObject(
    //   "assets/3d-objects/rusty_petrol_can/scene.gltf",
    //   this.PETROL_CAN_COUNT,
    //   1,
    //   1,
    //   1
    // );
  }

  updateVisibility(amount) {
    this.trashList.forEach((trash, i) => {
      if (i < amount) {
        trash.trash.visible = true;
      } else {
        trash.trash.visible = false;
      }
    });
  }
}
