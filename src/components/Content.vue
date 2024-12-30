<script setup>

import BigCarouselBar from "@/components/BigCarouselBar.vue";
import Body from "@/components/Body.vue";
import CategoryBar from "@/components/CategoriesBar.vue";
import {onMounted} from "vue";
onMounted(() => {
  localStorage.setItem('curView','1')
  localStorage.setItem('curCId', '1')
})
</script>

<template>
  <BigCarouselBar/>
  <CategoryBar/>
  <Body/>
</template>

<style scoped>

</style>