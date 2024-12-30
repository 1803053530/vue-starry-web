<template>
  <div class="hero-section">
    <!-- Left Content -->
    <div class="hero-content">
      <h1 class="hero-title">得到运动×潮流×好物</h1>
      <p class="hero-subtitle">正品保障·退件查验·多重鉴别</p>

      <!-- QR Code -->
      <div class="qr-section">
        <div class="qr-wrapper">
          <el-image :src="qrCodeUrl" alt="Download QR Code" class="qr-code" />
        </div>
        <div class="download-buttons">
          <el-button class="download-btn" type="primary">
            <el-icon><Apple /></el-icon>
            App Store 内搜索"得到"下载
          </el-button>
          <el-button class="download-btn" type="primary">
            <el-icon></el-icon>
            安卓应用市场内搜索"得到"下载
          </el-button>
        </div>
      </div>
    </div>

    <!-- Right Carousel -->
    <div class="carousel-section">
      <el-carousel
          :interval="4000"
          type="card"
          height="400px"
          :autoplay="true"
      >
        <el-carousel-item v-for="item in carouselItems" :key="item.id">
          <el-card class="carousel-card" :body-style="{ padding: '0px' }">
            <img :src="item.imageUrl" class="carousel-image" />
            <div class="carousel-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Apple} from '@element-plus/icons-vue'
import {getData} from "@/api/common.ts";

// Dynamic carousel data
const carouselItems = ref([])

// QR Code URL (replace with actual QR code)
const qrCodeUrl = ref("")
getData({t:3}).then(res => {
  carouselItems.value = res.carouselItems
  qrCodeUrl.value = res.qrCodeUrl
})
</script>

<style scoped>
.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5rem 6rem;
  background:url("@/img/homeBg1.png");
  color: #fff;
  min-height: 600px;
  gap: 4rem;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  padding-right: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
}

.qr-section {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.qr-wrapper {
  flex-shrink: 0;
}

.qr-code {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.download-buttons {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-top: 0.5rem;
}

.download-btn {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  height: auto;
}

.download-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.download-btn .el-icon {
  font-size: 1.25rem;
}

.carousel-section {
  flex: 1;
  max-width: 600px;
  margin-left: 2rem;
}

.carousel-card {
  background-color: #1a1a1a;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.carousel-content {
  padding: 1rem;
  color: #fff;
}

.carousel-content h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.carousel-content p {
  margin: 0.5rem 0 0;
  color: #888;
}

:deep(.el-carousel__item) {
  border-radius: 8px;
}

:deep(.el-carousel__arrow) {
  background-color: rgba(0, 0, 0, 0.7);
}

:deep(.el-carousel__arrow:hover) {
  background-color: rgba(0, 0, 0, 0.9);
}

:deep(.el-carousel__indicators) {
  bottom: -2rem;
}

:deep(.el-carousel__button) {
  background-color: #fff;
}
</style>


