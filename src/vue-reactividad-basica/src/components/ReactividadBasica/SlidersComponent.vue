<template>
  <section class="seccion">
    <h2>Sliders Reactivos</h2>
    <div class="slider-container">
      <label>Valor: {{ sliderValue }}</label>
      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model.number="sliderValue"
        class="slider"
      >
    </div>
    <div class="color-picker">
      <label>Color RGB</label>
      <div class="sliders">
        <input type="range" min="0" max="255" v-model.number="color.r">
        <input type="range" min="0" max="255" v-model.number="color.g">
        <input type="range" min="0" max="255" v-model.number="color.b">
      </div>
      <div 
        class="color-box" 
        :style="{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }"
      ></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'SlidersComponent',
  setup() {
    const sliderValue = ref(50);
    const color = reactive({
      r: 100,
      g: 150,
      b: 200
    });
    
    return { sliderValue, color };
  }
});
</script>

<style scoped>
.slider-container, .color-picker {
  margin: 20px 0;
}

.slider {
  width: 100%;
  margin: 10px 0;
}

.color-box {
  width: 100px;
  height: 100px;
  margin: 10px auto;
  border: 1px solid #ddd;
}

.sliders input {
  display: block;
  width: 100%;
  margin: 5px 0;
}
</style>