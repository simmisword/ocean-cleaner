<script setup>
import { store } from "../store.js"
import { inject, onMounted } from "vue"
import { WaterScene } from "../../three/WaterScene"
import { MIN_YEAR } from "../../utils";

const scene = inject("scene")


scene.animate();

scene.updateTrash(1);

onMounted(() => {
    document
        .getElementById("threeScene")
        .appendChild(scene.renderer.domElement);

});
</script>

<template>
    <div>
        <div id="threeScene" ref="threejsScene"></div>

        <div class="skip-container">

            <button @click="store.increment()" class="skip-button">start application</button>

        </div>
        <div class="info-box">
            <div class="intro-header">
                <h1 class="center">"Die Menschheit ist mehr denn je gefordert, zu beweisen, dass wir nicht die
                    Natur, sondern uns selbst
                    beherrschen.”</h1>
                <p class="center">~ Rachel Carson</p>
                <br />
                <p>Scrolle, um das Jahr zu ändern.</p>
                <p>Mit den Pfeiltasten veränderst du die Blickrichtung der Kamera.
                    <br />Mit [w, a, s, d] kannst du die Kamera bewegen.
                    <br />Mit [r, f] kannst du sie heben und senken.
                    <br />Mit [q, e] neigen.
                </p>
                <p>mit [n] kannst du die Kamera automatisch bewegen lassen.</p>
                <button @click="store.increment()" class="skip-button">start application</button>
            </div>
        </div>
    </div>
</template>
