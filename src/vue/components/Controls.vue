<script setup>
import { inject } from 'vue'


const scene = inject('scene');

function switchCollect() {
  scene.switchCollect()
}

function changeMode(e) {
  scene.changeMode(e.target.value);

}
</script>

<template>
  <div>
    <div class="controls gradient-box" id="controls"></div>
    <div class="controls">
      <div class="control-elements">
        <div class="start">
          <label>collect Trash
          </label>
          <label class="switch">
            <input type="checkbox" @click="switchCollect">
            <span class="slider round"></span>
          </label>
          <!-- <button id="collect-button" @click="switchCollect">Collect</button> -->
        </div>
        <div class="end">
          <select id="mode-button" @change="changeMode">
            <option value="growth">Wachstum bis 2050</option>
            <option value="level">Level 2020</option>
            <option value="stop">Stop 2020</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>