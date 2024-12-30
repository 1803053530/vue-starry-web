<script setup>
import AIAssistant from "@/components/AIAssistant.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
  <RouterView/>
  <Footer />
  <div class="AIAssistant">
    <AIAssistant/>
  </div>
</template>

<style scoped>
.AIAssistant {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.category-bar.visible {
  transform: translateY(64px);
}
</style>