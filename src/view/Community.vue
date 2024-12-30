<script setup>

import CommunityInfo from "@/components/CommunityDetail/CommunityInfo.vue";
import {onMounted} from "vue";
onMounted(() => {
  localStorage.setItem('curView','2')
})
</script>

<template>
    <CommunityInfo/>
</template>

<style scoped>

</style>