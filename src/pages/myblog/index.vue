<template>
	<div class="blog-page">
		<iframe :src="blogUrl" frameborder="0" class="blog-iframe"></iframe>
	</div>
</template>
<script>
export default {
	created(){
		// 获取当前的路径
		const url = window.location.href;
		if(url.indexOf('wzq') > -1){
			this.blogUrl = './blog/'
		} else {
			this.blogUrl = 'http://localhost:8081/'
		}
	}
}
</script>

<style lang="scss">
	.blog-page{
		width: 100%;
		height: 100%;
		.blog-iframe{
			width: 100%;
			height: 100%;
		}
	}
</style>