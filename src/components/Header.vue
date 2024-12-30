<template>
  <el-header class="header">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
        <el-image
            :src="headerConfig.logo.url"
            :alt="headerConfig.logo.alt"
            fit="contain"
            class="logo-image"
        />
      </div>

      <!-- Navigation -->
      <div class="nav-items">
        <el-menu
            mode="horizontal"
            :ellipsis="false"
            background-color="#000000"
            text-color="#ffffff"
            active-text-color="#00ffed"
            :default-active="activeIndex"
        >
          <el-menu-item
              v-for="item in headerConfig.navItems"
              :key="item.id"
              :index="item.id.toString()"
              @click="handleNavClick(item)"
          >
            <RouterLink :to="item.link">{{ item.title }}</RouterLink>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <el-input
            v-model="searchQuery"
            :placeholder="headerConfig.searchPlaceholder"
            class="search-input"
            size="large"
            @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- Download Button -->
      <div class="download-button">
        <el-button
            type="primary"
            color="#00ffed"
            @click="handleDownload"
        >
          {{ headerConfig.downloadButton.text }}
        </el-button>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { NavItem } from '@/types/header'
//第一种获取target值的方式，通过vue中的响应式对象可使用toRaw()方法获取原始对象
import { toRaw } from '@vue/reactivity'
const searchQuery = ref('')
const activeIndex = ref('1')

import type { HeaderConfig } from '@/types/header'
import {getData} from "@/api/common";


// const getNavItems = () => {
//   const navItems = apiGetData({t:0}) //此处必须要用异步，一个小时的血与泪！！！
//   return toRaw(navItems)
// }

function useHeaderData() {
  const headerConfig = ref<HeaderConfig>({
    logo: {},
    navItems: [],
    searchPlaceholder: "",
    downloadButton: {}
  })

  getData({t:0}).then((navItemsResult) => {
    headerConfig.value.logo = navItemsResult.logo; // 直接更新响应式对象的值
    headerConfig.value.navItems = navItemsResult.navItems;
    headerConfig.value.searchPlaceholder = navItemsResult.searchPlaceholder;
    headerConfig.value.downloadButton = navItemsResult.downloadButton;
    nextTick(() => {
      // 可以在这里添加一些依赖headerConfig更新后的逻辑，比如触发其他组件重新渲染等
      console.log('headerConfig.navItems has been updated');
    });
  });
  console.log(headerConfig.value)//第二种获取target值的方式，通过promise的then方法获取

  // Simulating API call to fetch header data
  const fetchHeaderData = async () => {
    try {
      // In real application, replace with actual API call
      // const response = await fetch('/api/header-config')
      // headerConfig.value = await response.json()

      // For now, we'll use the default data
      return headerConfig.value
    } catch (error) {
      console.error('Failed to fetch header data:', error)
      return headerConfig.value
    }
  }

  return {
    headerConfig,
    fetchHeaderData
  }
}

const { headerConfig, fetchHeaderData } = useHeaderData()

// Initialize header data
onMounted(async () => {
  await fetchHeaderData()
  activeIndex.value = localStorage.getItem('curView') || '1'
})

// Event handlers
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // Implement search logic here
  }
}

const handleNavClick = (item: NavItem) => {
  console.log('Navigating to:', item.link)
  activeIndex.value = item.id.toString()
  // Implement navigation logic here
}

const handleDownload = () => {
  console.log('Download button clicked:', headerConfig.value.downloadButton.link)
  // Implement download logic here
}
</script>

<style scoped>
.header {
  background-color: #000000;
  padding: 0;
  height: 10vh;
  position: fixed;
  top: 0;
  left: -7vw;
  right: 0;
  z-index: 1000;
}

.header-container {
  max-width: 90vw;
  margin: 0 0 0 10vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  flex-shrink: 0;
  margin-right: 20px;
}

.logo-image {
  width: 40px;
  height: 40px;
}

.nav-items {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

:deep(.el-menu) {
  border-bottom: none;
  background-color: transparent;
}

:deep(.el-menu--horizontal > .el-menu-item) {
  height: 64px;
  line-height: 64px;
  border-bottom: none;
  padding: 0 16px;
  font-size: 14px;
}

:deep(.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover) {
  background-color: rgba(255, 255, 255, 0.1);
}

.search-container {
  margin: 0 20px;
  width: 240px;
}

:deep(.search-input .el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: none;
  border-radius: 20px;
}

:deep(.search-input .el-input__wrapper:hover) {
  background-color: rgba(255, 255, 255, 0.15);
}

:deep(.search-input .el-input__inner) {
  color: #ffffff;
  height: 36px;
}

:deep(.search-input .el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

:deep(.search-input .el-input__prefix-inner) {
  color: rgba(255, 255, 255, 0.5);
}

.download-button {
  flex-shrink: 0;
  margin-left: 20px;
}

:deep(.download-button .el-button) {
  border: none;
  height: 36px;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
}
</style>