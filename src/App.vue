<!-- src/App.vue -->


<script setup>
import Home from './view/Home.vue'
import Body from './components/Body.vue'
</script>

<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style>
@import 'element-plus/dist/index.css';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>