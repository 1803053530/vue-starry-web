<template>
  <div class="product-detail">
    <div class="product-content">
      <div class="product-image-container">
        <el-image :src="product.image" fit="cover" class="product-image" />
      </div>
      <div class="product-info">
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
        <div v-if="route.params.productCategory === 'makeup'" class="size-section">
          <h3>净含量</h3>
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
          <el-button type="primary" class="buy-now" @click="handleBuyNow">
            立即购买 ¥{{ product.price }}
          </el-button>
          <el-button :class="['wishlist', { 'is-wishlisted': isWishlisted }]" @click="toggleWishlist">
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
            <p>得物App或微信扫码看商品</p>
            <p class="promotion">新人登录领最高 <span class="highlight">¥520</span> 专属礼包</p>
          </div>
        </div>
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

    <!-- Wishlist Counter -->
    <div class="wishlist-counter">
      <span>{{ wishlistCount }}</span>
    </div>

    <!-- Success Message -->
    <el-dialog
        v-model="showSuccessMessage"
        title="购买成功"
        width="30%"
        :show-close="false"
        :center="true"
    >
      <span>您已成功购买该商品！</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="showSuccessMessage = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ArrowDown, Star } from '@element-plus/icons-vue'
import { getData } from "@/api/common.ts"
import { useRoute } from "vue-router"
import { ElMessage } from 'element-plus'

const route = useRoute()
const selectedSize = ref('75ml')
const qrCodeUrl = ref("")
const isWishlisted = ref(false)
const wishlistCount = ref(0)
const showSuccessMessage = ref(false)
const imgNo = ref("0")

getData({ t: 3 }).then(res => {
  qrCodeUrl.value = res.qrCodeUrl
})

const product = ref({
  title: '科颜氏 金盏花 植萃爽肤水 收缩毛孔清洁舒缓祛痘保湿抗氧化修护控油',
  price: 75,
  image: '/product-image.jpg', // Add the product image URL here
  sizes: [
    { value: '40ml', label: '40ml', icon: '/bottle-small.png' },
    { value: '75ml', label: '75ml', icon: '/bottle-medium.png' },
    { value: '125ml', label: '125ml', icon: '/bottle-large.png' },
    { value: '250ml', label: '250ml', icon: '/bottle-xlarge.png' },
    { value: '40ml*5', label: '40ml*5', icon: '/bottle-pack.png' },
    { value: '75ml*4', label: '75ml*4', icon: '/bottle-pack-large.png' },
  ]
})

const recentPurchases = ref([
  {
    id: 1,
    username: '露*',
    userAvatar: '/src/assets/productImg/avatars/avatar1.jpg',
    size: '500ml',
    price: 271,
    time: '28分钟前'
  },
  {
    id: 2,
    username: '郑的很**',
    userAvatar: '/src/assets/productImg/avatars/avatar2.jpg',
    size: '300ml',
    price: 272,
    time: '48分钟前'
  },
  {
    id: 3,
    username: '倪*',
    userAvatar: '/src/assets/productImg/avatars/avatar3.jpg',
    size: '500ml',
    price: 271,
    time: '28分钟前'
  },
  {
    id: 4,
    username: '王海*',
    userAvatar: '/src/assets/productImg/avatars/avatar4.jpg',
    size: '300ml',
    price: 272,
    time: '48分钟前'
  },
  {
    id: 5,
    username: '邓*',
    userAvatar: '/src/assets/productImg/avatars/avatar5.jpg',
    size: '500ml',
    price: 271,
    time: '28分钟前'
  },
  {
    id: 6,
    username: '吴红*',
    userAvatar: '/src/assets/productImg/avatars/avatar6.jpg',
    size: '300ml',
    price: 272,
    time: '48分钟前'
  },
  // Add more purchase records as needed
])

onMounted(() => {
  product.value.title = route.params.productName
  product.value.price = Number(route.params.productPrice)
  route.params.productId < 10 ? imgNo.value = `00${route.params.productId}` : imgNo.value = `0${route.params.productId}`
  product.value.image = `/src/assets/productImg/${route.params.productCategory}/${imgNo.value}.jpg`
})

const handleBuyNow = () => {
  showSuccessMessage.value = true
  wishlistCount.value++
}

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  if (isWishlisted.value) {
    ElMessage.success('已添加到心愿单')
  } else {
    ElMessage.info('已从心愿单移除')
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 13vh auto;
  padding: 20px;
  color: #333;
  position: relative;
}

.product-content {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.product-image-container {
  flex: 1;
  max-width: 500px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.product-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.price-section {
  margin: 20px 0;
}

.currency {
  font-size: 18px;
  color: #ff5000;
}

.amount {
  font-size: 32px;
  font-weight: bold;
  color: #ff5000;
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
  transition: all 0.3s ease;
}

.wishlist.is-wishlisted {
  background-color: #ff69b4;
  color: white;
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

.wishlist-counter {
  position: absolute;
  top: 3vh;
  right: 10px;
  width: 40px;
  height: 40px;
  background-color: #ff0000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>

