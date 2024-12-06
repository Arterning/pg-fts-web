<template>
  <router-view v-slot="{ Component, route }">
    <Transition name="move">
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </Transition>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useTabBarStore } from '@/store';

  const tabBarStore = useTabBarStore();
  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style lang="less" >
  .move-enter-active {
    animation: puffIn 0.3s;
    animation-delay: 0.2s;
  }
  .move-leave-active {
    animation: vanishOut 0.2s;
  }

  @keyframes puffIn {
    0% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(1.02, 1.02);
      filter: blur(2px);
    }
    100% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1);
      filter: blur(0px);
    }
  }
  @keyframes vanishOut {
    0% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1);
      filter: blur(0px);
    }
    100% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(1.03, 1.03);
      filter: blur(20px);
    }
  }
</style>
