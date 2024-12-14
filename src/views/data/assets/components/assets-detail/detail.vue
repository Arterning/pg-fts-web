<template>
  <a-space direction = "vertical">
    <a-descriptions :column="1">
        <a-descriptions-item label="资产名">
            {{ info.assets_name }}
        </a-descriptions-item>
        <a-descriptions-item label="IP地址">
            {{ info.ip_addr }}
        </a-descriptions-item>
        <a-descriptions-item label="开放端口号">
          <a-space wrap>
            <a-tag v-for="(item, index) in info.assets_ports" :key='index'>{{ item }}</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="开放服务">
          <a-space wrap>
            <a-tag v-for="(item, index) in info.assets_services" :key='index'>{{ item }}</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="描述">
            {{ info.assets_desc }}
        </a-descriptions-item>
        <a-descriptions-item label="状态">
            {{ info.assets_status? '正常': '异常' }}
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          <!-- <ol v-if="info.assets_remarks.length > 0">
            <li v-for="item, index in info.assets_remarks" :key="index"> -->
            <!-- {{ item }} -->
            <!-- </li>
          </ol> -->
          {{ info.assets_remarks }}
        </a-descriptions-item>
    </a-descriptions>
  </a-space>        
</template>

<script lang="ts" setup>

  const props = defineProps(['info']);


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
