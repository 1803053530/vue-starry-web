<script setup>
const logo = '@/img/logo.jpg';
</script>

<template>
  <el-container class="blog-container">
    <el-header class="blog-header">
      <div class="logo" w-50>
        <el-avatar src="src/img/logo.jpg" class="logo-avatar" alt="Blog Logo" />
        <h1>Cheung 的博客</h1>
      </div>
      <el-menu mode="horizontal" :router="true">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/cloud">云盘</el-menu-item>
        <el-menu-item index="/message">留言板</el-menu-item>
        <el-menu-item index="/help">帮助中心</el-menu-item>
      </el-menu>
    </el-header>

    <el-container class="main-container">
      <el-main>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="16" :lg="18">
            <div class="blog-posts">
              <el-card v-for="post in blogPosts" :key="post.id" class="blog-post">
                <h2>{{ post.title }}</h2>
                <p>{{ post.excerpt }}</p>
                <el-button type="primary" size="small">阅读更多</el-button>
              </el-card>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <el-card class="sidebar">
              <h3>博客统计</h3>
              <ul>
                <li>文章: 100</li>
                <li>评论: 500</li>
                <li>浏览: 10000</li>
              </ul>
              <h3>最近活动</h3>
              <ul>
                <li>发布了新文章: "HarmonyOS 最新更新"</li>
                <li>回复了评论: "谢谢您的支持！"</li>
              </ul>
              <h3>标签</h3>
              <el-tag v-for="tag in tags" :key="tag" size="small" class="tag">
                {{ tag }}
              </el-tag>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <el-footer class="blog-footer">
      © 2024 Cheung's blog. All rights reserved.
    </el-footer>
  </el-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'BlogHome',
  setup() {
    const blogPosts = ref([
      { id: 1, title: 'HarmonyOS 和 GMS 的最新动态', excerpt: '最新的 HarmonyOS 更新带来了哪些新特性？GMS 在 Mate60pro 和 MateX5 上的安装指南。' },
      { id: 2, title: '华为新品发布会回顾', excerpt: '华为最新发布的产品有哪些亮点？让我们一起来回顾一下发布会的精彩瞬间。' },
      // Add more blog posts as needed
    ])

    const tags = ref(['HarmonyOS', 'GMS', '华为', 'Mate60pro', 'MateX5'])

    return {
      blogPosts,
      tags
    }
  }
}
</script>

<style scoped>
.logo-avatar{
  margin: 0 1vw;
}

.blog-container {
  min-height: 100vh;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 85vw;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  margin-right: 10px;
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
}

.main-container {
  background-color: #f5f7fa;
  width: 85vw;
  padding-left: 20px;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.blog-post {
  margin-bottom: 20px;
}

.sidebar {
  position: sticky;
  top: 20px;
}

.sidebar h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.sidebar ul {
  padding-left: 20px;
  margin-bottom: 20px;
}

.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.blog-footer {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  width: 85vw;

  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
</style>
