<script setup>
import { ref } from 'vue'
import {getData} from "@/api/common.ts";

const footerSections = ref([])
getData({t:2}).then(res=>{
    footerSections.value = res
})
</script>

<template>
  <footer class="bg-black text-white py-8">
    <div class="container mx-auto grid grid-cols-4 gap-8">
      <div v-for="(section, index) in footerSections" :key="index">
        <h3 class="text-lg font-semibold mb-4">{{ section.title }}</h3>
        <ul>
          <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="mb-2">
            <a href="#" class="hover:text-gray-300">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container mx-auto mt-8 text-center text-sm">
      <p>&copy; 2016-2024 深圳信息得到有限公司</p>
      <p class="mt-2">深ICP备20241223236号-p</p>
    </div>
  </footer>
</template>