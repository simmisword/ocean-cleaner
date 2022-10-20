<script setup>
// import "../../../sceneHandler"
import { currentYear } from "../yearStore.js"
import { showInfo } from "../store.js"
import Navigation from "../components/Navigation.vue"
import Scroll from "../components/Scroll.vue"
import Controls from "../components/Controls.vue"
import InfoBox from "../components/InfoBox.vue"
import * as THREE from "three"


import { inject, onMounted, ref } from "vue"


const scene = inject("scene")

scene.animate();
scene.updateTrash(1);


var scrollCount = 0;

onMounted(() => {

  document
    .getElementById("threeScene")
    .appendChild(scene.renderer.domElement);
  // scene.updateTrash(1);

});

function updateTrash(event) {

  if (scrollCount % 5 === 0) {
    if (event.deltaY > 0) {
      if (currentYear.currentYear < 2050) {
        scene.updateTrash(0.3);
        currentYear.increment(1)
      }
    } else if (event.deltaY < 0) {
      if (currentYear.currentYear > 1950) {

        scene.updateTrash(0.3);
        currentYear.increment(-1)
      }
    }
  }
  scrollCount++
}

function handleKeys(event) {
  if (event.key == "n") {
    scene.controls.autoForward = !scene.controls.autoForward;
    scene.controls.dragToLook = !scene.controls.dragToLook;
    if (scene.controls.autoForward === false) {
    }
  }
  if (scene.switchCollect) {
    if (event.key == "u") {
      scene.moveBoat(1)
    }
    if (event.key == "j") {
      scene.moveBoat(-1);
    }
    if (event.key == "h") {
      scene.rotateBoat(0.05)
    }
    if (event.key == "k") {
      scene.rotateBoat(-0.05)
    }
  }

}

function stopBoat() {
  scene.stopBoat();
}

</script>

<template>
  <div class="ocean-app" @wheel="updateTrash" @keydown="handleKeys" @keyup="stopBoat">
    <div id="threeScene" ref="threejsScene"></div>

    <Navigation />
    <Scroll />
    <Controls />

    <InfoBox v-if="showInfo.show" />

  </div>
</template>
