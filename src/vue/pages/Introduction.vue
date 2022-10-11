<script setup>
import { store } from "../store.js"
import { inject, onMounted } from "vue"
import { WaterScene } from "../../three/WaterScene"
import { MIN_YEAR } from "../../utils";

const scene = inject("scene")


scene.animate();

onMounted(() => {

    document
        .getElementById("threeScene")
        .appendChild(scene.renderer.domElement);

    scene.updateYear(0);
});
</script>

<template>
    <div>
        <div id="threeScene" ref="threejsScene"></div>

        <div class="skip-container">

            <button @click="store.increment()" class="skip-button">start application</button>

        </div>
        <div class="info-box">
            <h1>"Die Menschheit ist mehr denn je gefordert, zu beweisen, dass wir nicht die Natur, sondern uns selbst
                beherrschen.”</h1>
            <p>~ Rachel Carson</p>
            <br />
            <p>Scrolle, um das Jahr zu ändern.</p>
            <p>Mit den Pfeiltasten veränderst du die Blickrichtung der Kamera. Mit [w,a,s,d] kannst du die Kamera
                bewegen, mit [r,f] kannst du sie heben und senken. Und mit [q,e] neigen</p>
            <p>mit [n] kannst du die Kamera automatisch bewegen lassen.</p>
            <ul><a
                    href="https://www.ardmediathek.de/video/dokus-im-ersten/dokumentarfilm-im-ersten-die-recyclingluege/das-erste/Y3JpZDovL2Rhc2Vyc3RlLmRlL3JlcG9ydGFnZSBfIGRva3VtZW50YXRpb24gaW0gZXJzdGVuL2YwMTFjNmY0LTc1MGUtNDc5Mi1iZDgyLWRkZDM4YTNhMWU4Yw">Dokumentation:
                    Recycling-Lüge</a></ul>
            <ul><a href="https://open.spotify.com/album/6y5l3VyZmHrIabKU0Lrp8n?si=9rr84CCxRwiivs2yIsHCAA">Das Album
                    "Natureboy" von Natureboy Flako</a></ul>
            <button @click="store.increment()" class="skip-button">start application</button>
        </div>
    </div>
</template>
