<script setup>
import { reactive } from 'vue';

const mode = reactive({
    count: 0,
    change(val) {
        this.count = val
    }
})
</script>
<template>
    <div class="overlay info-box">
        <div class="info-navi">
            <ul>
                <div><a href="#" @click="mode.change(0)">Portfolio-Projekt</a></div>
                <div><a href="#" @click="mode.change(1)">Ocean-Cleanup und Studie</a></div>
                <div><a href="#" @click="mode.change(2)">Musik und Film</a></div>
            </ul>
        </div>
        <div class="info-body" v-if="mode.count === 0">
            <h1>Portfolio: Ocean Plastics</h1>
            <h2>Emotionales Erfassen komplexer Daten <br />
                mithilfe dreidimensionalem Rendering<br />
                in einer interaktiven Webanwendung
            </h2>
            <p>Diese Szene wurde als Hochschulprojekt erstellt und stellt ein Modell dar, das im Zuge des
                Ocean-Cleanup-Projektes aufgestellt wurde.
                Dieses berechnet die aufkommende Plastik-Verschmutzung in der Umwelt je nach Wirtschaftssektor,
                Produktionsjahr und Lebensdauer der Produkte.
            </p>
            <a class="external"
                href="https://theoceancleanup.com/updates/the-quest-to-find-the-missing-plastic/">Download:
                Dokumentation</a>
        </div>
        <div class="info-body" v-if="mode.count === 1">
            <h1>Ocean-Cleanup und Studie</h1>
            <h2>vom Schul- zum Weltverbesserungsprojekt
            </h2>
            <p>Jedes Jahr gelangen Millionen von Tonnen Plastik in die Ozeane, von denen der größte Teil aus Flüssen
                austritt. Ein Teil dieses Plastiks gelangt zu den Müllfeldern in den Ozeanen, wo es in einem Strudel
                zirkulierender Strömungen zusammen mit Plastik aus anderen Quellen (z. B. der Hochseefischerei) gefangen
                wird. Wenn keine Maßnahmen ergriffen werden, wird sich Plastik zunehmend auf unsere Ökosysteme, unsere
                Gesundheit und unsere Wirtschaft auswirken.
            </p>
            <a class="external" href="https://theoceancleanup.com">Zur Website</a>
            <p>In den letzten fünf Jahren haben Forscher bei The Ocean Cleanup daran gearbeitet, das Ausmaß der
                Plastikverschmutzung der Ozeane zu verstehen, um der Organisation zu helfen, Technologien zur Lösung
                dieses Problems zu entwickeln. Im Jahr 2018 berichteten wir, dass derzeit 80.000 Tonnen Plastik im Great
                Pacific Garbage Patch treiben, eine Zahl, die vier- bis sechzehnmal größer ist als zuvor geschätzt. Wir
                erklärten diesen Anstieg durch den Einsatz robuster Methoden zur Quantifizierung der unzähligen
                Größenklassen, aus denen sich die Plastikverschmutzung zusammensetzt, von riesigen Geisternetzen bis hin
                zu winzigem Mikroplastik.
            </p>
            <a class="external" href="https://theoceancleanup.com/updates/the-quest-to-find-the-missing-plastic/">Zum
                Artikel</a>
        </div>
        <div class="info-body" v-if="mode.count === 2">
            <h1>Video- und Musik-Quellen</h1>
            <ul><a class="external"
                    href="https://www.ardmediathek.de/video/dokus-im-ersten/dokumentarfilm-im-ersten-die-recyclingluege/das-erste/Y3JpZDovL2Rhc2Vyc3RlLmRlL3JlcG9ydGFnZSBfIGRva3VtZW50YXRpb24gaW0gZXJzdGVuL2YwMTFjNmY0LTc1MGUtNDc5Mi1iZDgyLWRkZDM4YTNhMWU4Yw">Dokumentation:
                    Recycling-Lüge</a></ul>
            <ul><a class="external"
                    href="https://open.spotify.com/album/6y5l3VyZmHrIabKU0Lrp8n?si=9rr84CCxRwiivs2yIsHCAA">Das Album
                    "Natureboy" von Natureboy Flako</a></ul>
        </div>
    </div>
</template>