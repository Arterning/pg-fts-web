<script lang="ts" setup>
  import { useAppStore } from '@/store';
  import { computed, onMounted } from 'vue';
  import { Message } from '../types';

  const appStore = useAppStore();

  // message：接受消息对象，展示消息内容和头像，并且根据角色调整消息位置。
  // avatar：用户头像，如果角色是 Assistant则使用 logo。
  const props = defineProps<{
    message: Message;
    avatar: string;
    darkMode?: boolean;
  }>();

  // const computedClass = computed(() => {
  //   if (props.message.sender === 'user') {
  //     return props.darkMode
  //       ? 'dark:bg-cyan-800/50 dark:border-gray-700'
  //       : 'bg-cyan-50/20 border-gray-700';
  //   } else if (props.message.sender === 'bot') {
  //     return props.darkMode
  //       ? 'dark:bg-slate-800 dark:border-gray-700'
  //       : 'bg-slate-800 border-gray-700';
  //   }
  //   return '';
  // });

  // const computedTheme = computed(() => {
  //   if (props.darkMode) {
  //     if (appStore.theme === 'dark') {
  //       return 'dark';
  //     }
  //     return '';
  //   } else {
  //     return 'dark';
  //   }
  // });
</script>
<template>
  <div class="msg"
  :class="message.sender === 'user'? 'user-mode': 'bot-mode'">
    <a-avatar v-if="message.sender === 'bot'" class="avator">
      <IconRobot />
    </a-avatar>
    <div class="chat-area">
      <a-card class="chat-card">
        <div v-if="message.status==='waiting'">
          <a-spin />
        </div>
        <div v-else-if="message.status==='success'">
          {{ message.content }}
        </div>        
        <div v-else-if="message.status==='failure'" class="fail-response">
          <icon-exclamation-polygon-fill /> {{ message.content }}
        </div>
      </a-card>
    </div>
    <a-avatar v-if="message.sender === 'user'">
      <IconUser />
    </a-avatar>
  </div>
</template>

<style lang="less" scoped>
  .chat-card{
    margin: 0 1rem 1rem;
    padding: 0 !important;
    max-width: 80%;
  }
  .msg{
    display: flex;
  }
  .avator{
    min-width: 3rem;
  }
  .user-mode{
    justify-content: end;
  }
  .bot-mode{
    justify-content: start;
  }
  :deep(.md-editor-preview-wrapper) {
    padding: 4px;
  }
  :deep(.github-theme p:last-child) {
    margin-bottom: 0;
  }

  :deep(.github-theme ul:last-child) {
    margin-bottom: 0;
  }

  :deep(.github-theme ol:last-child) {
    margin-bottom: 0;
  }

  :deep(.github-theme ul) {
    list-style-type: disc;
  }
  :deep(.github-theme ol) {
    list-style-type: decimal;
  }
</style>
