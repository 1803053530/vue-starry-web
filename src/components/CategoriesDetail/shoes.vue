<script setup>
import {onMounted, ref} from 'vue'
import {getData} from "@/api/common.ts";
import {onBeforeRouteUpdate, useRoute} from "vue-router";

const route = useRoute();
const products = ref([])

const fetchProductsByCategory = async () => {
  try {
    const res = await getData({t: 1, cId: "shoes"});
    products.value = res;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(async () => {
  await fetchProductsByCategory();
});

onBeforeRouteUpdate(async (to, from) => {
  await fetchProductsByCategory();
});
</script>
<template>
  <main class="container mx-auto py-8">
    <el-row :gutter="20">
      <el-col :span="4" v-for="product in products" :key="product.id">
        <el-card :body-style="{ padding: '0px' }">
          <RouterLink :to="'/productDetail/'+'shoes/'+product.name+'/'+product.price">
            <img :src="product.image" class="w-full h-40 object-cover"/>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
              <p class="text-red-500 font-bold">¥{{ product.price }}</p>
            </div>
          </RouterLink>
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>