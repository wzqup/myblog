<template>
    <header class="header">
        <nav class="h-nav">
			<!-- <div class="theme">点我播放音乐</div> -->
			<Btn>首页</Btn>
			<Btn>牛逼</Btn>
        </nav>
    </header>
</template>

<script>
import Btn from '@/components/GraBtn'
export default {
	components:{
		Btn
	}
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 74px;
    box-sizing: border-box;
    position: relative;
    nav {
        width: 100%;
        height: 74px;
        display: flex;
		align-items: center;
		.theme {
			flex: 1;
			background-color: #ae63e4;
			height: 44px;
			margin-left: 10px;
			margin-right: 10px;
			opacity: .3;
		}
    }
}
</style>