<template>
    <a-space direction="vertical">
        <a-descriptions :column="1">
            <a-descriptions-item label="标题">
                {{ info.title }}
            </a-descriptions-item>
            <a-descriptions-item label="邮件头" v-if="info.type==='email'" >
                <a-divider />
                <div class="email-title flex mb-2">   
                    <div class="email-label">主题</div>
                    <div>{{ info.email_subject || '-' }}</div>
                </div>
                <div class="flex mb-1">
                    <div class="email-label">发件人</div>
                    <div :class="info.email_from?'email-person':''">{{ info.email_from || '-' }}</div>
                </div>
                <div class="flex mb-1">
                    <div class="email-label">收件人</div>
                    <div :class="info.email_to?'email-person':''">{{ info.email_to || '-' }}</div>
                </div>
                <div class="flex">
                    <div class="email-label">时间</div>
                    <div>{{ emailDateFormat(info.email_time) }}</div>
                </div>
                <a-divider />
            </a-descriptions-item>
 
            <a-descriptions-item label="摘要">
                <pre>
                {{ info.desc }}
                </pre>
            </a-descriptions-item>
            <a-descriptions-item label="预览">
                <keep-alive>
                    <a-tooltip content="点击以查看">
                        <a-image
                            height="480"
                            width="100%"
                            fit="contain"
                            class="image"
                            v-if="info.type==='picture'"
                            :src="buildSrcURL(info.file)"
                        />
                    </a-tooltip>
                </keep-alive>
                <keep-alive>
                    <div class="media-box" v-if="info.type==='media'">
                        <icon-music class="media-icon" />
                        <video :src="buildSrcURL(info.file)" class="video" controls></video>
                    </div>
                </keep-alive>
                <keep-alive>
                    <iframe v-if="info.type==='pdf'" :src="buildSrcURL(info.file)" class="pdf" frameborder="0"></iframe>
                </keep-alive>
            </a-descriptions-item>
            <a-descriptions-item label="内容" >
                <div class="content-box">
                    <pre>{{ info.content }} </pre>
                </div>
            </a-descriptions-item>
        </a-descriptions>
    </a-space>        
</template>

<script lang="ts" setup>
    import { emailDateFormat } from '@/utils/date';

    defineProps(['info']);

    const buildSrcURL = (file: string) => {
      let url;
      if (import.meta.env.VITE_API_BASE_URL) {
          url = `${import.meta.env.VITE_API_BASE_URL}/${file}`;
      } else {
          url = `${window.origin}/${file}`;
      }
      return url;
    }
</script>

<style lang="less" scoped>
.content-box{
    // display: flex;
    width: 70vw;
    max-height: 65vh;
    overflow: auto;
}

.flex{
    display:flex;
}

.media-box{
    background:#f3f3f3;
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 70vw;

    .media-icon{
        position:absolute;
        font-size:3rem;
        color:#555;
    }
}

.email-title{
    font-weight: bold;
    font-size: 1.5rem;
}

.email-label{
    width:3rem;
    text-align: justify;
    text-align-last: justify;
    margin-right: 1rem;
}

.email-person{
    color: rgb(var(--primary-6));
}

.mb-1{
    margin-bottom: 0.5rem;
}

.mb-2{
    margin-bottom: 1rem;
}

.image{
    cursor:pointer;
}

.video{
    width:100%; 
    z-index:1;
}

.pdf{
    width:100%;
    height:75vh;
}

::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    display: block;
}

/* 设置滚动条轨道的背景色 */
::-webkit-scrollbar-track {
    background: transparent;
}

/* 设置滚动条滑块的颜色 */
::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 1rem
}

/* 设置滚动条滑块在悬停时的颜色 */
::-webkit-scrollbar-thumb:hover {
    background: #777;
}
</style>