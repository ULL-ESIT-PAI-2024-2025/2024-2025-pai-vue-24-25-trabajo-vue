<template>
  <p>Hola, {{ name }}</p>
</template>

<script>
export default {
  data() {
    return {
      name: 'Ana'
    };
  }
}
</script>

<style>
p {
  color: teal;
}
</style>
