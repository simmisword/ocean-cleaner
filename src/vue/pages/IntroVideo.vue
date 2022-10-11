<script setup>
import { store } from "../store.js"

</script>

<template>
    <div>
        <video controls src="../../../assets/video/Portfolio.mp4" @ended="store.increment"
            poster="../../../assets/images/plastic.png">Your browser does not support the video tag.</video>
        <div class="skip-container">

            <button class="skip-button" @click="store.increment()">skip video</button>
        </div>
    </div>
</template>