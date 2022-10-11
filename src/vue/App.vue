
<script setup>
import { store } from "./store"
import { currentYear } from "./yearStore"
import Introduction from "./pages/Introduction.vue"
import OceanScene from "./pages/OceanScene.vue"
import IntroVideo from "./pages/IntroVideo.vue";
import { provide } from "vue";
import { WaterScene } from "../three/Scene";

provide('scene', new WaterScene(currentYear.currentYear));



function resize() {
    scene.sizes.width = window.innerWidth;
    scene.sizes.height = window.innerHeight;

    scene.camera.aspect = scene.sizes.width / scene.sizes.height;
    scene.camera.updateProjectionMatrix();

    scene.renderer.setSize(
        scene.sizes.width,
        scene.sizes.height
    );
}
</script>

<template>
    <div @resize="resize">
        <IntroVideo v-if="store.count === 0" />
        <Introduction v-if="store.count === 1" />
        <OceanScene v-if="store.count === 2" />
    </div>
</template>
