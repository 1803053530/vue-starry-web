<script>
import { ref } from 'vue';
import {apiAskDoubao} from "@/api/commonApi.ts";

export default {
  setup() {
    const isDialogVisible = ref(false);
    const inputText = ref('');
    const responseText = ref('');
    const ans = ref('')

    const openDialog = () => {
      isDialogVisible.value = true;
    };

    const closeDialog = () => {
      isDialogVisible.value = false;
      inputText.value = '';
      responseText.value = '';
    };

    const sendRequest = async () => {
      if (inputText.value.trim() === '') return;
      const messages = [
        { role: 'user', content: inputText.value }
      ];
      try {
        responseText.value = "语儿正在思考中..."
        ans.value = await apiAskDoubao({q: messages[0].content})
        responseText.value = ans.value.answer// 此处待开发，waiting for api building 23/Dec/2024
      } catch (error) {
        console.error(error);
        responseText.value = '请求出错，请稍后重试';
      }
    };

    return {
      isDialogVisible,
      inputText,
      responseText,
      openDialog,
      closeDialog,
      sendRequest
    };
  }
};
</script>

<template>
  <div class="app-container">
    <el-avatar @click="openDialog" size="large" src="/src/img/1.jpg" style="cursor: pointer" alt="AI客服" title="AI客服"></el-avatar>
    <el-dialog
        v-model="isDialogVisible"
        title="向语儿提问"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
      <el-input
          placeholder="请输入你的问题"
          v-model="inputText"
          size="large"
          @keyup.enter="sendRequest"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="sendRequest" type="primary">确认</el-button>
          <el-button @click="closeDialog">关闭</el-button>
        </span>
      </template>
      <div class="response-area" v-if="responseText">
        <p>{{ responseText }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.response-area {
  margin-top: 10px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
</style>