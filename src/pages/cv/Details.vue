<template>
    <div class="details-box">
        <div class="container">
            <div class="cv">
                <h1 class="title">个人信息</h1>
                <ul>
                    <li>姓名：魏志强</li>
                    <li>性别：男</li>
                    <li>毕业学校：<a href="http://www.nit.edu.cn" target="_blank">南昌工程学院</a></li>
                    <li>工作年限：3年</li>
                    <li>期望职位：前端开发</li>
                </ul>
                <h1  class="title">联系方式</h1>
                <ul>
                    <li>手机：18172894723</li>
                    <li>
                        Email：
                        <a
                            href="mailto:869612826@qq.com"
                            target="_blank"
                            class="url"
                        >869612826@qq.com</a>
                    </li>
                </ul>
                <h1  class="title">个人技能</h1>
                <ul>
                    <li>掌握HTML、CSS、JavaScript，可以高保真还原设计稿</li>
                    <li>能够有效解决和改善不同屏幕的适配问题</li>
                    <li>熟练使用jQuery,配合less完成PC端开发,熟练运用ajax进行前后端交互</li>
                    <li>熟练使用vue.js,vue-cli,webpack,vue-router,axios等相关技术进行单页面应用开发</li>
                    <li>熟练使用git、postman等开发工具</li>
                    <li>了解node.js、熟练使用npm，熟悉模块化、组件化开发</li>
                </ul>
                <h1  class="title">工作经历</h1>
                <ul>
					<li>亿达信息技术有限公司 2019.8-2020-5 </li>
                    <li>筑网信息科技有限公司 2017.4-2019-7 </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.details-box {
    @include content(1150px, auto, transparent, 0px);
    margin: 0 auto;
    box-sizing: border-box;
    .container {
        width: 100%;
		.cv {
			width: 100%;
			padding: 20px;
			.title{
				font-size: 26px;
				padding: 10px 0;
				@include lgStr($strColor);
				animation: strAnm 2s linear infinite;
			}
			ul {
				box-sizing: border-box;
				padding-left: 36px;
				padding: 36px;
				box-shadow:0 0 10px #fff;
				background-color: darkcyan;
				border-radius: 6px;
				li{
					font-size: 16px;
					line-height: 1.6;
					list-style-type: circle;
					margin-bottom: 10px;
				}
			}
		}
    }
}
@media screen and (max-width: 1024px) and(min-width: 414px) {
    .details-box  {
            @include content(750px, 182px, transparent, 0px);
    }
}
@media screen and (max-width: 414px) {
    .details-box  {
            @include content(300px, 182px, transparent, 0px);
    }
}

</style>