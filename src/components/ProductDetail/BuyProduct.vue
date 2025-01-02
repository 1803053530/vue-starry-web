<template>
  <el-dialog
      v-model="visible"
      width="400px"
      :show-close="true"
      :close-on-click-modal="true"
      class="qr-modal"
  >
    <div class="flex flex-col items-center p-6">
      <img
          src="@/img/logo1.png"
          alt="Mascot"
          class="w-20 h-20 mb-4"
      />
      <h2 class="text-xl font-bold mb-2">新人登录领最高</h2>
      <div class="text-2xl font-bold text-primary mb-4">
        ¥520 <span class="text-base">专属礼包</span>
      </div>
      <p class="text-sm text-gray-500 mb-6">正品保障·速件查验·多重鉴别</p>

      <div class="qr-code-container w-48 h-48 mb-4">
        <img
            src="@/img/qrCode.png"
            alt="QR Code"
            class="w-full h-full"
        />
      </div>

      <p class="text-sm text-gray-500">使用App或微信扫码继续操作</p>
      <p class="text-xs text-gray-400 mt-2">星语App如何扫码？</p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = defineModel<boolean>('visible', { default: false })
</script>

<style scoped>
.qr-modal :deep(.el-dialog) {
  border-radius: 12px;
}
</style>
