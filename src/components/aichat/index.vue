<script lang="ts" setup>

  import { onMounted, onUnmounted, ref } from 'vue';
  import { useDateFormat, useNow } from '@vueuse/core';

  import Chat from './components/chat/index.vue';
  import SessionItem from './components/sessionitem/index.vue';
  import { ChatSession } from './components/types';


  const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss');
  const activeSession = ref<ChatSession>({} as ChatSession);
  const sessionList = ref<ChatSession[]>([]);
  const isWaitingForResponse = ref(false);

  const visible = ref(false);

  const handleOpen = () => {
    visible.value = true;
  }

  
  // 判断是否正在等待响应，如果在等待则不能切换会话,接收emit事件
  const handleLoading = (loading: boolean) => {
    isWaitingForResponse.value = loading;
  };

  // 切换会话
  const handleSessionSwitch = (session: ChatSession) => {
    if (isWaitingForResponse.value) {
      return;
    }
    activeSession.value = { ...session };
  };

  // 从会话列表中删除会话
  const handleDeleteSession = (session: ChatSession) => {
    const index = sessionList.value.findIndex((s) => s.id === session.id);
    sessionList.value.splice(index, 1);
    // 删除后切换到第一个会话
    activeSession.value = { ...sessionList.value[0] };
    localStorage.setItem('sessionList', JSON.stringify(sessionList.value));
  };

  // 新增会话
  const handleCreateSession = () => {
    // sessionList头部插入一个新的会话，模拟新增会话
    sessionList.value.unshift({
      id: `${formatted.value}-${sessionList.value.length}`,
      topic: '新对话',
      messages: [],
      updatedAt: formatted.value,
    });
    // 切换到新增的会话
    handleSessionSwitch(sessionList.value[0]);
    localStorage.setItem('sessionList', JSON.stringify(sessionList.value));
  };

  // 成功接收消息后，保存会话列表到本地存储
  const saveSessions = (session: ChatSession) => {
    activeSession.value = session;
    localStorage.setItem('sessionList', JSON.stringify(sessionList.value));
  };

  onMounted(() => {
    // 从本地存储中获取会话列表
    const localSessionList = localStorage.getItem('sessionList');
    if (localSessionList) {
      sessionList.value = JSON.parse(localSessionList);
    }
    // 默认选中第一个会话
    handleSessionSwitch(sessionList.value[0]);
  });

  onUnmounted(() => {
    // 组件销毁时保存会话列表到本地存储
    localStorage.setItem('sessionList', JSON.stringify(sessionList.value));
  });

  const testSession = {
    id: '2024-12-05 14:03:09-4',
    topic: '测试1',
    messages:[
      {
        sender: 'user',
        content: '叽里呱啦',
        timestamp: 'Mon Aug 27 2018 20:59:22 GMT+0800',
        status: 'success',
      },
      {
        sender: 'bot',
        content: '乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦乌里哇啦',
        timestamp: 'Mon Aug 27 2018 21:59:22 GMT+0800',
        status: 'success',
      },
      {
        sender: 'user',
        content: '歪比巴卜',
        timestamp: 'Mon Aug 27 2018 20:59:26 GMT+0800',
        status: 'success',
      },
      {
        sender: 'bot',
        content: '歪比歪比',
        timestamp: 'Mon Aug 27 2018 20:59:46 GMT+0800',
        status: 'success',
      },
      {
        sender: 'user',
        content: '歪比巴卜',
        timestamp: 'Mon Aug 27 2018 21:00:26 GMT+0800',
        status: 'success',
      },
      {
        sender: 'bot',
        content: '歪比歪比',
        timestamp: 'Mon Aug 27 2018 21:39:46 GMT+0800',
        status: 'success',
      },
    ],
    updatedAt: '2024-12-05 14:03:09'
  }
</script>

<template>
  <a-button :shape="'circle'" class="nav-btn" type="primary" @click="handleOpen" >
    <template #icon>
      <icon-robot />
    </template>
  </a-button>

  <a-modal v-model:visible="visible" :footer="false" fullscreen>
    <template #title>
      <h3>AI助手 (o゜▽゜)o☆</h3>
    </template>

    <div class="layout-content">
      <div class="layout-sider"> 
        <div class="add-btn">
          <a-button
            type="text"
            @click="handleCreateSession"
            long
          >
            <span> 新建对话 </span>
            <icon-plus />
          </a-button>
        </div>
        
        <div class="session-list">
          <SessionItem
            v-for="session in sessionList"
            :key="session.id"
            :active="session.id === activeSession.id"
            :session="session"
            @click="handleSessionSwitch(session)"
            @delete="handleDeleteSession"
          ></SessionItem>
        </div>

      </div>
      <a-layout-content>
        <Chat
          :session="activeSession"
          :loading="isWaitingForResponse"
          @save="saveSessions"
          @loading="handleLoading"
        />
      </a-layout-content>
    </div>
  </a-modal>

</template>

<style lang="less" scoped>
  .layout-content{
    max-height: 100%;
    // overflow: hidden;
    display: flex;
  }
  .layout-sider{
    min-width: 220px;
  }
  .add-btn{
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }
  .session-list{
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 80vh;
  }

  /* 自定义滚动条的样式 */
  ::-webkit-scrollbar {
    display: block;
    width: 5px;
    height: 5px;
    scroll-behavior:smooth;
  }

  ::-webkit-scrollbar-thumb {
    background: #858585;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #e2e2e2;
  }
</style>
