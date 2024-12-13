<template>
  <a-layout class="flex-layout">
    <Breadcrumb />
    <div class="general-card">
      <a-spin :loading="loading">
        <a-card v-if="info" class="content-box">
          <Detail :info="info"/>
        </a-card>
      </a-spin>
    </div>
    <Footer />
  </a-layout>
</template>

<script lang="ts" setup>
  import { 
    SysAssetsRes, 
    querySysAssetsDetail 
  } from '@/api/assets';
  import useLoading from '@/hooks/loading';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTabBarStore } from '@/store';
  import Footer from '@/components/footer/index.vue';
  import Detail from './detail.vue';
  import { querySysAssetsDetailTest } from '../../test';


  const route = useRoute();
  const { loading, setLoading } = useLoading(true);
  const tabBarStore = useTabBarStore();
  const info = ref<SysAssetsRes>();

  const { id } = route.params;

  onMounted( async ()=>{
    setLoading(true);
      try {
        if(id){
          // const res = querySysAssetsDetailTest(Number(id[0]));
          const res = await querySysAssetsDetail(Number(id));
          console.log(res);
          info.value = res;
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
  })

</script>

<style scoped lang="less">
// .content-box{
//   border:none;    
//   width: 100%;
// }
.content-box{
    // display: flex;
    width: 70vw;
    max-height: 65vh;
    overflow: auto;
}

.flex{
    display:flex;
}

</style>
