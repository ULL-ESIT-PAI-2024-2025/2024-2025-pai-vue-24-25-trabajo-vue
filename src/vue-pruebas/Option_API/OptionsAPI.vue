<!-- OptionsAPI.vue -->
<template>
  <div>
    <p>Hola, {{ name }}</p>
    <input v-model="name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Juan'
    };
  }
};
</script>
