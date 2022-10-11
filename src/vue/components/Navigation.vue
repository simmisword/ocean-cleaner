<script setup>
import { inject } from 'vue'
import { showInfo } from "../store.js"

const scene = inject('scene');

function playMusic() {
  scene.playMusic()
}

function switchInfo() {
  showInfo.switch()
}
</script>

<template>
  <div>
    <div class="nav gradient-box" id="nav"></div>
    <div class="nav">
      <div class="control-elements">
        <div class="start">
          <label>info
          </label>
          <label class="switch">
            <input type="checkbox" @click="switchInfo">
            <span class="slider round"></span>
          </label>
          <!-- <button class="icon-button" id="info-button" @click="switchInfo">i</button> -->
        </div>
        <label id="title"> Ocean Plastics </label>
        <div class="audioplayer end">
          <!-- <button class="icon-button" id="play-button" data-playing="false" role="switch" aria-checked="false"
            @click="playMusic">
            play
          </button> -->
          <label>music
          </label>
          <label class="switch">
            <input type="checkbox" @click="playMusic">
            <span class="slider round"></span>
          </label>
          <!-- <button class="icon-button" id="music-button">music</button>
            <button class="icon-button" id="mute-button">mute</button> -->
        </div>
        <!-- <audio controls loop id="audio-control">
            <source src="/assets/audio/Flako-Gelis.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio> -->
      </div>
    </div>
  </div>
</template>