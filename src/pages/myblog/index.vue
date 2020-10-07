<template>
    <div class="blog-page" v-loading="loading" element-loading-text="稍等,努力加载中..">
        <iframe :src="`https://deep-brez.gitee.io/blog`" frameborder="0" class="blog-iframe" ref="iframe"></iframe>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: true,
			date: new Date()
        };
    },
    mounted() {
		const blog = this.$refs.iframe;
		// 每次进来先刷新
		blog.contentWindow.location.reload(true);
        blog.onload = () => {
            this.loading = false;
        };
    },
};
</script>

<style lang="scss">
.blog-page {
    width: 100%;
    height: 100%;
    .blog-iframe {
        width: 100%;
        height: 100%;
    }
}
</style>