<template>
  <div class="product-detail">
    <!-- Product Header -->
    <div class="product-header">
      <h1 class="product-title">{{ product.title }}</h1>
      <el-icon class="expand-icon"><ArrowDown /></el-icon>
    </div>

    <!-- Price Section -->
    <div class="price-section">
      <span class="currency">¥</span>
      <span class="amount">{{ product.price }}</span>
    </div>

    <!-- Size Selection -->
    <div class="size-section">
      <h3>化妆品净含量</h3>
      <el-radio-group v-model="selectedSize" class="size-options">
        <el-radio-button v-for="size in product.sizes" :key="size.value" :label="size.value">
          <div class="size-option">
            <el-image :src="size.icon" class="size-icon"></el-image>
            <span>{{ size.label }}</span>
          </div>
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <el-button type="primary" class="buy-now" size="large" @click="handleBuyNow">
        立即购买 ¥{{ product.price }}
      </el-button>
      <el-button class="wishlist" size="large" @click="toggleWishlist">
        <el-icon><Star /></el-icon>
        想要
      </el-button>
    </div>

    <!-- QR Code Section -->
    <div class="qr-section">
      <div class="qr-code">
        <el-image :src="qrCodeUrl"></el-image>
      </div>
      <div class="qr-text">
        <p>星语App或微信扫码看商品</p>
        <p class="promotion">新人登录领最高 <span class="highlight">¥520</span> 专属礼包</p>
      </div>
    </div>

    <!-- Recent Purchases -->
    <div class="recent-purchases">
      <h3>最近购买</h3>
      <div class="purchase-list">
        <div v-for="purchase in recentPurchases" :key="purchase.id" class="purchase-item">
          <el-avatar :src="purchase.userAvatar"></el-avatar>
          <div class="purchase-info">
            <span class="username">{{ purchase.username }}</span>
            <span class="size">{{ purchase.size }}</span>
          </div>
          <div class="purchase-price">
            <span>¥{{ purchase.price }}</span>
            <span class="time">{{ purchase.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { ArrowDown, Star } from '@element-plus/icons-vue'
import {getData} from "@/api/common.ts";

const selectedSize = ref('75ml')
const qrCodeUrl = ref("")


const product = ref(  {
  id: 2,
  name: "科颜氏 高保湿面霜",
  price: 299,
  image: "/product2.jpg",
  soldCount: 800,
  reviewCount: 300,
  description: "深层滋润保湿补水",
  sizes: [
    { value: "50ml", label: "50ml", icon: "/cream-small.png" },
    { value: "125ml", label: "125ml", icon: "/cream-large.png" }
  ]
})

const recentPurchases = ref([
  {
    id: 1,
    username: '露*',
    userAvatar: '/avatar1.jpg',
    size: '500ml',
    price: 271,
    time: '28分钟前'
  },
  {
    id: 2,
    username: '长*',
    userAvatar: '/avatar2.jpg',
    size: '300ml',
    price: 272,
    time: '48分钟前'
  },
  // Add more purchase records as needed
])

const handleBuyNow = () => {
  // Implement buy now logic
}

const toggleWishlist = () => {
  // Implement wishlist toggle logic
}
onMounted(async () => {
  getData({t:3}).then(res => {
    qrCodeUrl.value = res.qrCodeUrl
  })
})
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 13vh auto;
  padding: 20px;
  color: #333;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.product-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  flex: 1;
}

.price-section {
  margin: 20px 0;
}

.currency {
  font-size: 16px;
}

.amount {
  font-size: 24px;
  font-weight: bold;
}

.size-section {
  margin: 20px 0;
}

.size-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.size-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.size-icon {
  width: 24px;
  height: 24px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}

.buy-now {
  flex: 1;
  background-color: #00c8b3;
  border: none;
}

.buy-now:hover {
  background-color: #00b3a1;
}

.wishlist {
  width: 120px;
}

.qr-section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 20px 0;
}

.qr-code {
  width: 80px;
  height: 80px;
}

.qr-text {
  font-size: 14px;
}

.highlight {
  color: #00c8b3;
  font-weight: bold;
}

.recent-purchases {
  margin-top: 30px;
}

.purchase-list {
  margin-top: 16px;
}

.purchase-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.purchase-info {
  flex: 1;
}

.username {
  display: block;
  font-weight: 500;
}

.time {
  color: #999;
  font-size: 12px;
  margin-left: 8px;
}
</style>