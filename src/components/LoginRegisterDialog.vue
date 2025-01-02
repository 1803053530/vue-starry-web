<template>
  <el-dialog
      v-model="dialogVisible"
      :title="isLogin ? '登录' : '注册'"
      width="30%"
      :close-on-click-modal="false"
  >
    <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item v-if="!isLogin" label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          {{ isLogin ? '登录' : '注册' }}
        </el-button>
      </span>
    </template>
    <div class="switch-mode">
      <el-button link @click="switchMode">
        {{ isLogin ? '新用户？点此注册' : '已有帐户？点此登录' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps(['visible'])
const emit = defineEmits(['update:visible', 'login-success'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const isLogin = ref(true)
const formRef = ref(null)

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度应为3-20之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度应为6-20之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次确认您的密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('Passwords do not match'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const switchMode = () => {
  isLogin.value = !isLogin.value
  formRef.value.resetFields()
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    if (isLogin.value) {
      loginUser()
    } else {
      registerUser()
    }
  } catch (error) {
    console.error('Form validation failed', error)
  }
}

const loginUser = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.username === form.username && u.password === form.password)
  if (user) {
    ElMessage.success('登陆成功')
    emit('login-success', user)
    dialogVisible.value = false
  } else {
    ElMessage.error('用户名或密码不正确')
  }
}

const registerUser = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  if (users.some(u => u.username === form.username)) {
    ElMessage.error('用户已存在')
    return
  }
  users.push({ username: form.username, password: form.password })
  localStorage.setItem('users', JSON.stringify(users))
  ElMessage.success('注册成功！请登录')
  isLogin.value = true
  formRef.value.resetFields()
}
</script>

<style scoped>
.switch-mode {
  margin-top: 20px;
  text-align: center;
}
</style>

