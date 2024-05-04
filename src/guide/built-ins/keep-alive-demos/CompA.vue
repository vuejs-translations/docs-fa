<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <p> کامپوننت فعلی: A </p>
  <span style="margin-right: 20px">Count: {{ count }}</span>
  <button @click="count++">+</button>
</template>
