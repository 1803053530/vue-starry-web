<template>
  <div class="merchant-backend">
    <el-container>
      <el-header>
        <el-menu
            mode="horizontal"
            :default-active="activeIndex"
            class="nav-menu"
            @select="handleSelect"
        >
          <el-menu-item v-for="item in navItems" style="text-align: center" :key="item.id" :index="item.id.toString()">
            <el-icon v-if="item.icon">
              <component :is="item.icon"/>
            </el-icon>
            {{ item.name }}
            <el-tag v-if="item.hot" size="small" type="danger" effect="dark">HOT</el-tag>
          </el-menu-item>
          <div class="nav-right">
            <el-dropdown>
              <span class="el-dropdown-link">
                Language<el-icon class="el-icon--right"><arrow-down/></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>中文</el-dropdown-item>
                  <el-dropdown-item>English</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button type="primary" @click="showLoginDialog">登录</el-button>
          </div>
        </el-menu>
      </el-header>

      <el-main>
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="headline-section">
              <div class="headline-content">
                <h1 class="headline-title">成为星语商家，开启您的成功之旅</h1>
                <p class="headline-subtitle">加入我们的平台，享受零成本入驻、专业支持和庞大的客户群</p>
                <el-button type="primary" size="large" @click="scrollToRegister">立即入驻</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <el-card class="register-card" ref="registerCard">
              <template #header>
                <div class="card-header">
                  <span>商家入驻</span>
                  <el-tag type="success">0元入驻</el-tag>
                </div>
              </template>
              <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" @submit.prevent="submitRegister" label-position="top">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="registerForm.phone" placeholder="请输入手机号码">
                    <template #prepend>
                      <el-select v-model="registerForm.countryCode" placeholder="+86">
                        <el-option label="+86" value="+86"></el-option>
                        <el-option label="+80" value="+80"></el-option>
                        <el-option label="+21" value="+21"></el-option>
                        <el-option label="+1" value="+1"></el-option>
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                  <el-input v-model="registerForm.code" placeholder="请输入验证码">
                    <template #append>
                      <el-button :disabled="!canGetCode" @click="getVerificationCode">
                        {{ codeButtonText }}
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="registerForm.password" type="password" placeholder="请设置密码" show-password></el-input>
                </el-form-item>
                <el-form-item prop="agreement">
                  <el-checkbox v-model="registerForm.agreement">
                    我已阅读并同意<el-link type="primary" @click="showAgreement">《用户协议》</el-link>
                  </el-checkbox>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="register-button" native-type="submit" :loading="registerLoading">
                    立即入驻
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>

        <el-divider content-position="center">热门类目</el-divider>

        <el-row :gutter="20">
          <el-col :span="6" v-for="category in hotCategories" :key="category.id">
            <el-card :body-style="{ padding: '0px' }" class="category-card">
              <el-image :src="category.image" class="category-image">
                <template #placeholder>
                  <div class="image-placeholder">
                    加载中<span class="dot">...</span>
                  </div>
                </template>
              </el-image>
              <div style="padding: 14px;">
                <span>{{ category.name }}</span>
                <div class="bottom">
                  <el-tag size="small">{{ category.tag }}</el-tag>
                  <el-button type="text" class="button" @click="showCategoryDetail(category)">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-divider content-position="center">入驻流程</el-divider>

        <el-steps :active="1" finish-status="success" align-center>
          <el-step title="注册账号" description="填写基本信息"></el-step>
          <el-step title="资质认证" description="上传相关证件"></el-step>
          <el-step title="店铺信息" description="填写店铺详情"></el-step>
          <el-step title="等待审核" description="1-3个工作日"></el-step>
          <el-step title="入驻成功" description="开始运营"></el-step>
        </el-steps>
      </el-main>
    </el-container>

    <el-dialog v-model="loginDialogVisible" title="登录" width="30%">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名/手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin" :loading="loginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog v-model="agreementDialogVisible" title="用户协议" width="50%">
      <div v-loading="agreementLoading">
        <p v-html="agreementContent"></p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const activeIndex = ref('1')
const loginDialogVisible = ref(false)
const agreementDialogVisible = ref(false)
const agreementLoading = ref(false)
const agreementContent = ref('')
const registerLoading = ref(false)
const loginLoading = ref(false)
const codeCountdown = ref(0)
const registerFormRef = ref(null)
const registerCard = ref(null)

const navItems = [
  { id: 1, name: '立即入驻', icon: 'House' },
  { id: 2, name: '热招商家', icon: 'Star', hot: true },
  { id: 3, name: '招商活动', icon: 'Calendar' },
  { id: 4, name: '入驻流程', icon: 'Guide' },
  { id: 5, name: '帮助中心', icon: 'QuestionFilled' },
]

const banners = [
  {
    id: 1,
    image: '/src/assets/productImg/watches/001.jpg',
    title: '限时免佣，2024升级来袭！',
    description: '重点品牌可获得最高3万元免佣'
  },
  {
    id: 2,
    image: '/src/assets/productImg/watches/002.jpg',
    title: '新品牌扶持计划',
    description: '享受平台流量扶持，快速提升销量'
  },
  {
    id: 3,
    image: '/src/assets/productImg/watches/003.jpg',
    title: '跨境卖家专属福利',
    description: '海外仓储、物流、清关一站式服务'
  },
]

const hotCategories = [
  { id: 1, name: '运动鞋服', image: '/src/assets/productImg/watches/004.jpg', tag: '增长200%' },
  { id: 2, name: '手机数码', image: '/src/assets/productImg/watches/005.jpg', tag: '热销榜首' },
  { id: 3, name: '美妆个护', image: '/src/assets/productImg/watches/006.jpg', tag: '新锐品类' },
  { id: 4, name: '潮流服饰', image: '/src/assets/productImg/watches/007.jpg', tag: '年轻人最爱' },
]

const registerForm = reactive({
  phone: '',
  countryCode: '+86',
  code: '',
  password: '',
  agreement: false
})

const loginForm = reactive({
  username: '',
  password: ''
})

const registerRules = {
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码长度应为6位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请设置密码', trigger: 'blur' },
    { min: 8, max: 20, message: '密码长度应在8-20位之间', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,20}$/, message: '密码必须包含大小写字母和数字', trigger: 'blur' }
  ],
  agreement: [
    {
      validator: (rule, value, callback) => {
        if (value === false) {
          callback(new Error('请阅读并同意用户协议'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

const loginRules = {
  username: [
    { required: true, message: '请输入用户名/手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const canGetCode = computed(() => {
  return registerForm.phone && registerForm.phone.length === 11 && codeCountdown.value === 0
})

const codeButtonText = computed(() => {
  return codeCountdown.value > 0 ? `${codeCountdown.value}s后重新获取` : '获取验证码'
})

const handleSelect = (key) => {
  console.log(key)
}

const showLoginDialog = () => {
  loginDialogVisible.value = true
}

const handleBannerClick = (banner) => {
  ElMessage.info(`点击了banner: ${banner.title}`)
}

const getVerificationCode = async () => {
  if (!canGetCode.value) return
  try {
    await registerFormRef.value.validateField('phone')
    // 模拟发送验证码
    ElMessage.success('验证码已发送，请注意查收')
    codeCountdown.value = 60
    const timer = setInterval(() => {
      codeCountdown.value--
      if (codeCountdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error) {
    console.error('Phone validation failed:', error)
    ElMessage.error('请输入正确的手机号码')
  }
}

const submitRegister = async () => {
  if (!registerFormRef.value) return

  registerLoading.value = true
  try {
    await registerFormRef.value.validate()
    // 所有验证通过，可以提交表单
    // 模拟注册请求
    await new Promise(resolve => setTimeout(resolve, 2000))
    ElMessage.success('注册成功！')
    // 重置表单
    registerFormRef.value.resetFields()
  } catch (error) {
    console.error('Form validation failed:', error)
    ElMessage.error('请检查表单填写是否正确')
  } finally {
    registerLoading.value = false
  }
}

const submitLogin = async () => {
  loginLoading.value = true
  try {
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success('登录成功！')
    loginDialogVisible.value = false
    // 重置表单
    loginForm.username = ''
    loginForm.password = ''
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
  } finally {
    loginLoading.value = false
  }
}

const showAgreement = async () => {
  agreementDialogVisible.value = true
  agreementLoading.value = true
  try {
    // 模拟加载协议内容
    await new Promise(resolve => setTimeout(resolve, 1000))
    agreementContent.value = `
      <h2>用户协议</h2>
      <p>欢迎使用我们的服务！本协议是您与我们之间关于使用我们服务的法律协议。</p>
      <h3>1. 服务内容</h3>
      <p>我们提供电子商务平台服务，允许卖家在我们的平台上展示和销售商品。我们致力于为买家和卖家创造一个安全、便捷的交易环境。</p>
      <h3>2. 用户注册</h3>
      <p>您需要注册成为我们的用户才能使用某些服务。注册时，您应当提供真实、准确、完整和最新的个人资料。您有责任保护您的账户安全，对您账户下的所有活动负责。</p>
      <h3>3. 用户行为</h3>
      <p>您同意不会使用我们的服务进行任何非法或未经授权的活动，包括但不限于发布虚假信息、侵犯他人知识产权、散布垃圾信息等。</p>
      <h3>4. 隐私保护</h3>
      <p>我们重视您的隐私。我们将按照隐私政策收集、使用和保护您的个人信息。使用我们的服务即表示您同意我们按照隐私政策处理您的个人信息。</p>
      <h3>5. 免责声明</h3>
      <p>我们的服务按"现状"提供，不提供任何明示或暗示的保证。我们不对因使用我们的服务而导致的任何直接、间接、附带、特殊或惩罚性损害负责。</p>
      <h3>6. 协议修改</h3>
      <p>我们保留随时修改本协议的权利。修改后的协议将在网站上公布。继续使用我们的服务即表示您接受修改后的协议。</p>
    `
  } catch (error) {
    ElMessage.error('加载协议失败，请重试')
  } finally {
    agreementLoading.value = false
  }
}

const showCategoryDetail = (category) => {
  ElMessage.info(`查看类目详情：${category.name}`)
}

const scrollToRegister = () => {
  registerCard.value.$el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  localStorage.setItem('curView', '3')
})
</script>

<style scoped>
.merchant-backend {
  margin-top: 10vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  padding: 0;
}

.nav-menu {
  display: flex;
  justify-content: space-between;
}

.nav-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.el-main {
  flex: 1;
}

.register-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-button {
  width: 100%;
}

.category-card {
  margin-bottom: 20px;
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-image {
  height: 200px;
  width: 100%;
  display: block;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f0f0f0;
  color: #909399;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.el-carousel__item {
  position: relative;
}

.banner-carousel {
  margin-bottom: 20px;
}

.banner-item {
  border-radius: 8px;
  overflow: hidden;
}

.banner-image {
  height: 100%;
  width: 100%;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.carousel-caption h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
}

.carousel-caption p {
  margin-bottom: 15px;
}

.headline-section {
  position: relative;
  height: 500px;
  background-image: url('/src/assets/productImg/watches/001.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.headline-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
}

.headline-content {
  position: relative;
  z-index: 1;
  padding: 40px;
  color: #ffffff;
  max-width: 600px;
  margin-top: 60px;
}

.headline-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.headline-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

@keyframes ellipsis {
  0% { content: '.'; }
  33% { content: '..'; }
  66% { content: '...'; }
}

.dot::after {
  content: '.';
  animation: ellipsis 1.5s infinite;
}

@media (max-width: 768px) {
  .headline-section {
    height: 400px;
  }

  .headline-content {
    padding: 20px;
    margin-top: 40px;
  }

  .headline-title {
    font-size: 2rem;
  }

  .headline-subtitle {
    font-size: 1.2rem;
  }
}
</style>

