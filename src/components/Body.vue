<script setup>
import {onMounted, ref} from 'vue'
import {getData} from "@/api/common.ts";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
const route = useRoute();
</script>
<template>
  <RouterView/>
</template>