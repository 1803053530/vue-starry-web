<template>
  <el-card class="community-info">
    <template #header>
      <div class="header">
        <h2>热门动态</h2>
        <el-button text>查看更多</el-button>
      </div>
    </template>

    <el-row :gutter="20">
      <el-col
          v-for="(item, index) in communityItems"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          class="mb-4"
      >
        <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            class="item-card"
        >
          <el-image
              :src="item.imageUrl"
              fit="cover"
              lazy
              class="item-image"
          >
            <template #error>
              <div class="image-placeholder">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>

          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="item-stats">
              <span>
                <el-icon><View /></el-icon>
                {{ item.views }}
              </span>
              <span>
                <el-icon><Star /></el-icon>
                {{ item.likes }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { Picture, View, Star } from '@element-plus/icons-vue'
import {getData} from "@/api/common.ts";
const communityItems = ref([])
const fetchCommunityItems = async () => {
  try {
    const res = await getData({t: 5, cId: "communityInfo"});
    console.log(res)
    communityItems.value = res.communityInfo.hot;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(async () => {
  await fetchCommunityItems();
});
</script>

<style scoped>
.community-info {
  max-width: 1200px;
  margin: 14vh auto 7vh auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.item-card {
  transition: transform 0.3s;
}

.item-card:hover {
  transform: translateY(-5px);
}

.item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #f5f7fa;
}

.item-info {
  padding: 15px;
}

.item-info h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: bold;
}

.item-info p {
  margin: 0 0 12px;
  font-size: 14px;
  color: #666;
}

.item-stats {
  display: flex;
  gap: 15px;
  color: #999;
  font-size: 13px;
}

.item-stats span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.mb-4 {
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .item-image {
    height: 160px;
  }

  .header h2 {
    font-size: 20px;
  }
}
</style>