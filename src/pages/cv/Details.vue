<template>
    <div class="details-box">
        <div class="container">
            <div class="cv">
                <h1 class="title">个人信息</h1>
                <ul>
                    <li class="name">姓名：魏志强</li>
                    <li>毕业学校：南昌工程学院</li>
                    <li>工作年限：3年</li>
                    <li>期望职位：前端开发</li>
                </ul>
                <h1 class="title">联系方式</h1>
                <ul>
                    <li>手机：18172894723</li>
                    <li>Email：869612826@qq.com</li>
                </ul>
                <h1 class="title">个人技能</h1>
                <ul>
                    <li>
                        掌握web前端开发基本技能HTML，CSS，Javascript，可以高保真还原设计稿，有效解决和改善不同屏幕的适配问题
                    </li>
                    <li>
                        对element等各类UI组件库，jquery、lodash等JS库，EJS等模板引擎有着较熟练的实践
                    </li>
                    <li>
                        熟练使用ES6语法编程，熟练使用vue,vuex,vue-router,webpack,axios等相关技术进行应用开发,对React,ts,node.js有一定的了解
                    </li>
                    <li>
                        熟悉模块化、组件化开发,熟悉sass,less等css扩展语言的使用
                    </li>
                    <li>
                        熟练使用Git进行版本控制和代码托管、Markdown进行文档编写，postman进行接口测试，了解项目常规开发流程、开发调试技巧。
                    </li>
                </ul>
                <h1 class="title">自我评价</h1>
                <ul>
                    <li>工作认真，心思细腻，乐于沟通</li>
                    <li>追求编码细节和代码规范，认真写好每一行代码</li>
                    <li>
                        拥有扎实的前端基础，擅长基于JavaScript开发各种Web应用
                    </li>
                    <li>在大公司小公司都工作过，可以快速适应各种工作环境</li>
                </ul>
                <h1 class="title">工作经历</h1>
                <ul>
                    <li>亿达信息技术有限公司 2019.8-2020-5</li>
                    <li>杭州派迪科技有限公司 2017.4-2019-7</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.details-box {
    @include content(1150px, auto, transparent, 0px);
    margin: 0 auto;
    box-sizing: border-box;
    animation: slideInUp 0.5s;
    .container {
        width: 100%;
        .cv {
            width: 100%;
            padding: 20px;
            .title {
                font-size: 26px;
                padding: 10px 0;
            }
            ul {
                box-sizing: border-box;
                padding: 36px;
                padding-left: 10px;
                background-color: darkcyan;
                border-radius: 6px;
                li {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 10px;
                }
                li::before {
                    content: "🔸";
                    margin-right: 10px;
                }
                li.name::before {
                    content: "😎";
                    margin-right: 10px;
                }
            }
        }
    }
}
@media screen and (max-width: 1024px) and(min-width: 414px) {
    .details-box {
        @include content(750px, auto, transparent, 0px);
        animation: bounceInRight 1s;
    }
}
@media screen and (max-width: 414px) {
    .details-box {
        @include content(350px, auto, transparent, 0px);
        animation: bounceInRight 1s;
    }
}
</style>