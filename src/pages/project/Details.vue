<template>
    <div class="details-box">
        <div class="container">
            <div class="item-wrap" v-for="item in projectArr" :key="item.id">
                <div class="item" v-show="!(showDetail === item.id)">
                    <div class="img-wrap" @click="showDetails(item.id)">
                        <img :src="item.imgUrl" />
                    </div>
                    <p>{{item.content}}</p>
                </div>
                <div class="details" v-show="showDetail === item.id" @click="showDetails(item.id)">
                    <ul>
                        <li>
                            <p class="special">
                                传送：
                                <a
                                    v-if="item.url"
                                    :href="item.url"
                                    target="_blank"
                                    style="color:#ffdd40"
                                >查看详情</a>
                                <a v-else style="color:#ccc">查看详情</a>
                            </p>
                            <div>
                                <span
                                    v-for="(tecItem,index) in item.tec"
                                    :key="index"
                                    class="tag"
                                >{{tecItem}}</span>
                            </div>
                            <h4>主要工作:</h4>
                            <p v-for="tecItem in item.work" :key="tecItem">{{tecItem}}</p>
                            <h4>实践总结:</h4>
                            <p v-for="tecItem in item.practice" :key="tecItem">{{tecItem}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projectArr: [
                {
                    id: "1",
                    url: "https://www.sf-express.com",
                    content: "顺丰官网&backbone、jquery",
                    imgUrl:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592988664395&di=776cf9e112097aeccb4a7920a35c685e&imgtype=0&src=http%3A%2F%2Fimg3.qianzhan.com%2Fnews%2F201409%2F03%2F20140903-7ad3a3994afb0a7b_550x1300.jpg",
                    ex: [],
                    tec: [
                        "Jquery",
                        "backbone",
                        "require.js",
                        "underscore.js",
                        "EJS",
                    ],
                    work: [
                        "负责网站的更新迭代,对已有功能的更新、用户反馈问题的修复，持续提升用户体验",
                        "参与需求讨论，评估能否实现及所需时间 ,协同后台开发人员定义数据接口",
                    ],
                    practice: [
                        "新增完成批量寄、越南官网发票申请、投诉反馈等页面，使用Jquery、backbone、EJS实现页面搭建及交互，使用require.js进行模块化开发",
                        "使用ajax进行前后端数据交互，通过blob对象实现对二进制流图片的下载预览打印",
                        "通过公司openCMS系统使用jsp,xml对官网新增页面进行相应配置",
                    ],
                },
                {
                    id: "2",
                    url: "https://v.sf-express.com/",
                    content: "顺丰月结服务平台&vue",
                    imgUrl:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592988664395&di=776cf9e112097aeccb4a7920a35c685e&imgtype=0&src=http%3A%2F%2Fimg3.qianzhan.com%2Fnews%2F201409%2F03%2F20140903-7ad3a3994afb0a7b_550x1300.jpg",
                    ex: [],
                    tec: [
                        "Vue",
                        "VueRouter",
                        "Vuex",
                        "Element ui",
                        "axios",
                        "ES6",
                    ],
                    work: [
                        "负责网站的更新迭代,对已有功能的更新、用户反馈问题的修复，持续提升用户体验",
                        "参与需求讨论，评估能否实现及所需时间 ,协同后台开发人员定义数据接口",
                    ],
                    practice: [
                        "使用vue和element ui进行组件化开发搭建页面,通过路由实现各组件间的通讯，vuex进行全局状态管理数据缓存",
                        "使用axios进行前端和后台的数据交互，对后台返回的数据进行相应处理",
                        "编写基础组件及业务组件,方便后续快速开发",
                    ],
                },
                {
                    id: "3",
                    url: "",
                    content: "项目报备系统&Vue",
                    imgUrl: "http://deep-brez.gitee.io/img/mypage/bb.jpg",
                    ex: [],
                    tec: [
                        "Vue",
                        "VueRouter",
                        "Vue cli",
                        "Element ui",
                        "axios",
                        "ES6",
                        "antv G2",
                    ],
                    work: [
                        "负责用户管理,权限管理,项目申请,数据统计功能模块交互实现，后续更新及维护",
                    ],
                    practice: [
                        "使用vue cli搭建项目,使用vue和element ui实现组件化开发,通过路由实现各组件间的通讯",
                        "使用axios进行前端和后台的数据交互，使用antvG2实现图表展示",
                        "编写或修改基础组件及业务组件,方便后续快速开发",
                    ],
                },
                {
                    id: "4",
                    url: "https://www.qwdzkj.com/",
                    content: "乔威电子&jquery、bootstrap",
                    imgUrl: "http://deep-brez.gitee.io/img/mypage/qw.jpg",
                    ex: [],
                    tec: ["bootstrap", "jquery", "swiper", "animate"],
                    work: ["根据交互设计稿完成对应页面的搭建及交互实现  "],
                    practice: [
                        "利用bootstrap对页面原型进行搭建，使用媒体查询及rem实现响应式布局",
                        "使用swiper和animate.css实现页面动态效果,使用jquery进行dom操作",
                    ],
                },
            ],
            showDetail: null,
        };
    },
    computed: {
        showOrhid() {
            return this.showDetail;
        },
    },
    methods: {
        showDetails(id) {
            if (this.showDetail === id) {
                this.showDetail = null;
            } else {
                this.showDetail = id;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.details-box {
    width: 1150px;
    height: auto;
    background-color: transparent;
    padding: 0px;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 20px;
    position: relative;
    .container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        .item-wrap {
            width: 48%;
            border-radius: 5px;
            margin-bottom: 10px;
            padding: 10px;
            overflow: hidden;

            background: linear-gradient(0, #ffdd40 2px, #ffdd40 0) no-repeat 0 0/0
                    2px,
                linear-gradient(-90deg, #ffdd40 2px, #ffdd40 0) no-repeat 100% 0/2px
                    0,
                linear-gradient(-180deg, #ffdd40 2px, #ffdd40 0) no-repeat 100%
                    100%/0 2px,
                linear-gradient(-270deg, #ffdd40 2px, #ffdd40 0) no-repeat 0
                    100%/2px 0;
            transition: all 0.5s;
            &:hover {
                border-radius: 0;
                background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
                color: #ffdd40;
            }

            .item {
                width: 100%;
                height: 100%;
                animation: slideInLeft 0.5s;
                .img-wrap {
                    height: 230px;
                    img {
                        width: 100%;
                        height: 230px;
                        border-radius: 5px;
                    }
                }
                p {
                    margin-top: 10px;
                    font-size: 14px;
                }
            }
            .details {
                width: 100%;
                min-height: 256px;
                color: #fff;
                animation: slideInRight 0.5s;
                ul {
                    font-size: 14px;
                    line-height: 1.5;
                    p.special:before {
                        content: "🎯 ";
                    }
                    p:before {
                        content: "🔹 ";
                    }
                    h4 {
                        padding: 6px 0px;
                    }
                    .tag {
                        font-size: 12px;
                        padding: 2px 6px;
                        border-radius: 2px;
                        background-color: #3c9;
                        color: #fff;
                        margin-right: 6px;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 1280px) and(min-width: 750px) {
    .details-box {
        width: 750px;
        .container {
            .item-wrap {
                width: 100%;
                margin: 20px auto;
                .details {
                    ul {
                        .tag {
                            padding: 0 0;
                            background-color: transparent;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 750px) {
    .details-box {
        width: 375px;
        .container {
            .item-wrap {
                width: 100%;
                .details {
                    ul {
                        .tag {
                            padding: 0 0;
                            background-color: transparent;
                        }
                    }
                }
            }
        }
    }
}
</style>