<template>
  <div
      class="category-bar"
  >
    <div class="category-container">
      <el-menu
          mode="horizontal"
          :default-active="activeCategory"
          class="category-menu"
      >
        <el-menu-item
            v-for="category in categoryConfig.categories"
            :key="category.id"
            :index="category.id.toString()"
            @click="handleCategoryClick(category)"
        >
          <RouterLink :to="'/home/category/'+category.engTitle">{{ category.name }}</RouterLink>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoryData } from '@/composables/useCategoryData'
import type { CategoryItem } from '@/types/categoryBar'
import {onBeforeRouteUpdate, useRouter} from 'vue-router'
import { defineProps, defineEmits } from 'vue';
import { inject } from 'vue';
const emits = defineEmits(['categorySelected']);
const route = useRouter()
const { categoryConfig, fetchCategoryData } = useCategoryData()
const activeCategory = ref('1')

onMounted(async () => {
  await fetchCategoryData()
  activeCategory.value = localStorage.getItem('curCId') || '1'
})


const handleCategoryClick = (category: CategoryItem) => {
  activeCategory.value = category.id.toString()
  localStorage.setItem('curCId', category.id.toString())
  console.log(category.engTitle)
  // route.push({ name: 'CategoryProducts', params: { cId: category.engTitle } });
}
</script>

<style scoped>
.category-bar {
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  z-index: 999;
}

.category-bar-visible {
  transform: translateY(64px);
}

.category-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  padding: 0 20px;
}

.category-menu {
  border-bottom: none;
  height: 64px;
}

:deep(.el-menu--horizontal > .el-menu-item) {
  height: 64px;
  line-height: 64px;
  border-bottom: 2px solid transparent;
  padding: 0 20px;
  font-size: 15px;
}

:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  border-bottom: 2px solid #000;
  color: #000;
  font-weight: 500;
}

:deep(.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover) {
  color: #000;
}
</style>