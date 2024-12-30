<script setup lang="ts">

</script>

<template>
  <div class="not-found-container">
    <el-row justify="center">
      <el-col :span="12">
        <h1 class="error-title">4O4</h1>
        <p class="error-description">当前页面不存在</p>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.not-found-container {
  padding: 50px;
  text-align: center;
}
.error-title {
  font-size: 150px;
  margin-bottom: 0px;
}
.error-description {
  font-size: 30px;
  color: #666;
}
</style>
