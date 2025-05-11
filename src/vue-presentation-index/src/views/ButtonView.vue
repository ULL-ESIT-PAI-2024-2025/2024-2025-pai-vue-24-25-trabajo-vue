<script lang="ts" setup>
import { ref } from 'vue'

const message = ref("Hello PAI class")
function updateMessage() {
  message.value = "Hi, there!"
}
</script>

<template>
 <div>
  <button @click="updateMessage">Update</button>
  <p>{{ message }}</p> 
 </div>
</template>

