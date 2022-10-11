<script setup>
import { currentYear } from "../yearStore"

</script>

<template>
    <div class="scroll-control">
        <div class="slider-container">
            <div class="year-label">
                <label id="year-range-lb-1">{{currentYear.currentYear}}</label>
                <label id="year-range-lb-2"></label>
            </div>
            <input id="year-range" name="year-range" type="range" min="0" max="100" step="1" value="100"
                orient="vertical" list="tickmarks" />
        </div>
    </div>
</template>