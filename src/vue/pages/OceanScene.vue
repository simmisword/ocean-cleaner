<script setup>
// import "../../../sceneHandler"
import { currentYear } from "../yearStore.js"
import { showInfo } from "../store.js"
import Navigation from "../components/Navigation.vue"
import Scroll from "../components/Scroll.vue"
import Controls from "../components/Controls.vue"
import InfoBox from "../components/InfoBox.vue"


import { inject, onMounted, ref } from "vue"


const scene = inject("scene")

var scrollCount = 0;

onMounted(() => {

  document
    .getElementById("threeScene")
    .appendChild(scene.renderer.domElement);
});

function updateYear(event) {

  if (scrollCount % 7 === 0) {
    if (event.deltaY > 0) {
      if (currentYear.currentYear < 2050) {
        scene.updateYear(1);
        currentYear.increment(1)
      }
    } else if (event.deltaY < 0) {
      if (currentYear.currentYear > 1950) {

        scene.updateYear(-1);
        currentYear.increment(-1)
      }
    }
  }
  scrollCount++
}

function handleKeys(event) {
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

  console.log('+')
  if (event.key == "n") {
    scene.controls.autoForward = !scene.controls.autoForward;
    scene.controls.dragToLook = !scene.controls.dragToLook;
  }
}

function stopBoat() {
  scene.stopBoat();
}

</script>

<template>
  <div class="ocean-app" @wheel="updateYear" @keydown="handleKeys" @keyup="stopBoat">
    <div id="threeScene" ref="threejsScene"></div>

    <Navigation />
    <Scroll />
    <Controls />

    <InfoBox v-if="showInfo.show" />

  </div>
</template>

<script defer>

</script>