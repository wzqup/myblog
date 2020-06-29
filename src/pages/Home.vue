<template>
    <div class="home" :class="[padding ? 'has-padding':'no-padding']">
        <!-- 顶部导航 -->
        <!-- <Header /> -->
        <!-- 侧边栏 -->
        <Aside />
        <!-- 内容区 -->
        <main class="main">
			<router-view></router-view>
        </main>
    </div>
</template>

<script>
// import Header from "../layout/Header";
import Aside from "../layout/Aside";
export default {
    components: {
        // Header,
		Aside
	},
	data(){
		return{
			padding: true
		}
	}
};
</script>

<style lang = "scss" scoped>
@keyframes borderA {
    0%,
    100% {
        background-image: linear-gradient(
            115deg,
            #4fcf70,
            #fad648,
            #a767e5,
            #12bcfe
        );
    }

    25% {
        background-image: linear-gradient(
            115deg,
            #fad648,
            #a767e5,
            #12bcfe,
            #4fcf70
        );
    }
    50% {
        background-image: linear-gradient(
            115deg,
            #a767e5,
            #12bcfe,
            #4fcf70,
            #fad648
        );
    }
    75% {
        background-image: linear-gradient(
            115deg,
            #12bcfe,
            #4fcf70,
            #fad648,
            #a767e5
        );
    }
}
.home {
    width: 100%;
    height: 100%;
    background-color: #131417;
    color: white;
	transition: all 1s;
	padding-left: 20px;
}
.home:not(.no-padding) {
    padding-left: 188px;
}
.main {
	width: 100%;
	height: 100%;
	background-size: 30%;
	box-sizing: border-box;
	overflow: auto;
	position: relative;
	background-color: $mainColor;
	padding-bottom: 166px;
}
</style>