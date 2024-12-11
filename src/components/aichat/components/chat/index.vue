<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  import { useAppStore } from '@/store';
  import { useDateFormat, useNow } from '@vueuse/core';
  import { chat } from '@/api/ai';

  import Message from '../message/index.vue';
  import { ChatSession } from '../types';

  const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss');
  const message = ref('');
  const activeSession = ref<ChatSession>({} as ChatSession);
  // const avatarUrl = ref('');
  const contentBox = ref<HTMLElement | null>(null);
  const props = defineProps<{
    session: ChatSession;
    hiddenHeader?: boolean;
    darkMode?: boolean;
    isLoading?: boolean
  }>();
  const emits = defineEmits(['save', 'loading']);
  const textareaRef = ref<HTMLTextAreaElement>();
  // Configurable parameters
  // const MAX_RETRIES = 5;
  // const RETRY_INCREMENT_MS = 1000;
  // const DISPLAY_TEXT_INCREMENT_MS = 100;
  // const DISPLAY_TEXT_CHUNK_SIZE = 3;
  // const HISTORY_SIZE = 1;

  onMounted(() => {
    activeSession.value = props.session;
  });

  watch(
    () => props.session,
    (session) => {
      activeSession.value = session;
      scrollToBottom();
    }
  );

  // shift + enter 换行, enter 发送消息
  function handleKeyPress(event: KeyboardEvent) {
    // 检查是否按下了 Enter 键
    if (event.key === 'Enter') {
      // 检查是否同时按下了 Shift 键
      if (!event.shiftKey) {
        // 阻止默认行为，防止自动换行
        event.preventDefault();
        // emits('loading', true);
        // 调用发送消息的函数
        sendMessage();
      }
    }
  }

  async function getChatResponse(
    question: string,
    callback: (response: string, status: string) => void
  ): Promise<void> {
    try {
      const answer = await chat({ question });
      // const answer = "根据提供的上下文信息，PLL（Polymer Light Emitting Diode的缩写）并没有直接提及。不过，根据您的问题的格式，我假设您可能想询问的是“PLG（Power Line Communication）”的成员单位。根据提供的信息，PLG成员单位包括：\n\n- 株式会社e-Mobility Power\n- 株式会社ENEO\n- SENECHANGE 株式会社\n- Terra Charge 株式会社\n- 合同会社DMM.com\n- 中日本高速道路株式会社\n- 西日本高速道路株式会社\n- 日本充電インフラ株式会社\n- 株式会社パワーエックス\n- 東日本高速道路株式会社\n- 株式会社プラゴユア\n- スタンド株式会社\n- ユビ電株式会社\n\n请注意，这里提供的信息是基于对您问题的推测，因为原始信息中并没有直接提到PLL或PLG。如果您想了解特定组织或技术的成员单位，请提供更具体的信息。"
      const count = Math.ceil(answer.length / 10); // 分10段输出
      return new Promise((resolve) => {
        let i = 0;
        const timer = setInterval(() => {
          if (i < answer.length) {
            callback(answer.slice(0, i + 1), "success");
            i += count;
          } else {
            if (i < answer.length + count) {
              callback(answer, "success");
            }
            clearInterval(timer);
            resolve();
          }
        }, 50); // 每段间隔50ms
      });
    } catch (error) {
      callback("请求失败", "failure");
      return Promise.resolve(); 
    }
  }

  async function sendMessage() {
    
    if (props.isLoading || !message.value.trim()) {
      return;
    }
    emits('loading', true);

    // 发送消息后，将消息添加到当前会话的消息列表中
    activeSession.value.messages.push({
      sender: 'user',
      content: message.value.replace(/\n/g, "<br>"),
      timestamp: formatted.value,
      status: 'success'
    });
    
    const question = message.value;
    activeSession.value.topic = question.substring(0, 10); // 更新会话主题
    message.value = '';
    emits('save', activeSession.value);
    scrollToBottom();
    
    activeSession.value.messages.push({
      sender: 'bot',
      content: '',
      timestamp: formatted.value,
      status: 'waiting'
    });
    const res  = await getChatResponse(question, 
      (answer, status) => {
        activeSession.value.messages[
          activeSession.value.messages.length - 1
        ].content = answer;
        activeSession.value.messages[
          activeSession.value.messages.length - 1
        ].status = status;
        if( status === 'failure'){
          message.value = question;
        }
      })
      emits('save', activeSession.value);
      scrollToBottom();
      emits('loading', false);
    }


  // 滚动到底部
  const scrollToBottom = async () => {
    await nextTick(() => {
      contentBox.value?.scrollTo({
        top: contentBox.value.scrollHeight,
        behavior: 'smooth',
      });
    });
  };
  const store = useAppStore();

  function terminatConnection() {
    emits('loading', false);
    // 如果message.content为空，则删除该消息
    if (
      !activeSession.value.messages[activeSession.value.messages.length - 1].content
    ) {
      activeSession.value.messages.pop();
    }
    emits('save', activeSession.value);
  }
</script>

<template>
  <div class="chat-container">
    <div ref="contentBox" class="chat-content">
      <h1 class="start-tip" v-if="props.session.messages.length===0">有什么可以帮助的？</h1>
      <template v-for="(message, index) in props.session.messages" :key="index">
        <Message
          :message="message"
          :dark-mode="darkMode"
        ></Message>
      </template>
      <template v-if="isLoading">
        <div class="waiting">
          <a-spin />
          <span>AI正在思考中...</span>
        </div>
      </template>
    </div>
    <div class="chat-footer">
      <a-divider />
          <div class="chat-input">
            <textarea
              ref="textareaRef"
              class="input"
              v-model="message"
              placeholder="输入要询问的内容（同时按下Shift与Enter可换行）"
              @keydown="handleKeyPress"
            />
            <div class="button">
              <a-button
                @click="sendMessage"
                v-show="message.trim() && !isLoading"
                shape="circle"
                type="primary"
              >
                <icon-send />
              </a-button>
              
              <a-button
                v-show="isLoading"
                @click="terminatConnection"
                status="warning"
                shape="circle"
              >
                <icon-record-stop />
              </a-button>
            </div>
          </div>
    </div>

  </div>
</template>

<style lang="less" scoped>  
  .chat-container{
    padding: 1.25rem 10vw;
    min-width: 720px;
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  // .chat-header{
  //   height: 2rem;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   font-size: large;
  // }
  .chat-content{
    flex: 1;
    padding-top: 0.25rem;
    padding-right: 1rem;
    overflow-y: scroll;
    margin: 0 auto;
    width: 100%;
  }
  .start-tip{
    text-align: center;
    font-weight: bold;
    font-size: x-larger;
  }
  .chat-footer{
    flex-direction: column;
    display: flex;
    align-items: center;
    bottom: 0;
    width: 100%;

    .chat-input{
      max-width: 720px;
      width: 100%;
      border: 1px solid var(--color-text-4);
      border-radius: 0.2rem;
      background-color:  var(--color-bg-4);
      padding: 0.5rem 0.75rem;
      .input{
        outline: none;
        width: 100%;
        background: transparent;
        border: none;
        line-height: 1.75rem;
        height: auto;
        overflow-y: auto;
        resize: none;
        color: var(--color-text-2);
      }
      .button{
        display: flex;
        justify-content: end;
      }
    }

  }
  .waiting{
    display: flex;
    align-items: center;
    span{
      margin-left: 0.5rem;
    }
  }
  .button{
    min-height: 2.5rem;
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
