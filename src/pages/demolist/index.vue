<template>
    <div class="demolist-page" v-if="PC" >
        <!-- 展示窗口 -->
        <div class="view">
            <router-view></router-view>
        </div>
        <div class="menu">
            <div class="left btn" @click="trsL" v-show="page > 0">
                <i class="iconfont icon-arrow-lift"></i>
            </div>
            <ul class="list" :style="{transform:translate}">
                <li
                    ref="li"
                    @click="demoChange(index)"
                    v-for="(item,index) in demoName"
                    :key="index"
                >
                    <div class="title">{{item.title}}</div>
                    <div class="tips" v-if="item.tips">
                        <P v-for="item2 in item.tips" :key="item2.title">{{item2}}</P>
                    </div>
                </li>
            </ul>
            <div
                class="right btn"
                @click="trsR"
                v-show="demoUrl.length > 4 &&  page*2 < demoName.length-4"
            >
                <i class="iconfont icon-arrow-right"></i>
            </div>
        </div>
    </div>
    <div v-else>
        <h2 style="textAlign:center;fontSize:18px;">为了更好的体验，该页面请在PC端查看！</h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            demoUrl: Array(10).fill("666"),
            demoName: [
                {
                    title: "人生进度条",
                    componentName: "timebar",
                    tips: [
                        "点击头像进行设置",
                        "点击句子可更新-句子来源：一言",
                        "设置数据保存在localStorage",
                    ],
                },
                {
                    title: "音乐播放器",
                    componentName: "music",
                    tips: [
						"点击图片播放，显示播放器控件，已播放时间",
						"使用vuex对公用状态进行管理",
						"歌曲来源-网易云音乐"
                    ],
                },
                {
                    title: "敬请期待",
                    componentName: "cube",
                },
                {
                    title: "敬请期待",
                    componentName: "cube",
                },
                {
                    title: "敬请期待",
                    componentName: "cube",
                },
                {
                    title: "敬请期待",
                    componentName: "cube",
                },
                {
                    title: "敬请期待",
                    componentName: "cube",
                },
                {
                    title: "敬请期待",
                    componentName: "cube",
                },
                {
                    title: "敬请期待",
                    componentName: "cube",
                },
                {
                    title: "敬请期待",
                    componentName: "cube",
                },
            ],
            index: 0,
            page: 0,
            iframe: true,
            PC: true,
        };
    },
    created() {
        this.PC = true;
    },
    mounted() {
        if (this.$refs.li) {
            this.$nextTick(() => {
                this.itemW = this.$refs.li[0].offsetWidth;
            });
            addEventListener("resize", this.resizeFn);
        }
    },
    beforeDestroy() {
        removeEventListener("resize", this.resizeFn);
    },
    methods: {
        resizeFn() {
            this.$nextTick(() => {
                this.itemW = this.$refs.li[0].offsetWidth;
            });
        },
        trsL() {
            this.page--;
        },
        trsR() {
            this.page++;
        },
        demoChange(i) {
            this.$router.push({ name: this.demoName[i].componentName });
        },
        isPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array(
                "Android",
                "iPhone",
                "SymbianOS",
                "Windows Phone",
                "iPad",
                "iPod"
            );
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
    },
    computed: {
        translate() {
            return `translateX(-${this.page * 2 * this.itemW}px)`;
        },
    },
};
</script>

<style lang="scss" scoped>
@keyframes bgmove {
    0% {
        background-position-y: 0px, 0%;
    }
    100% {
        background-position-y: -1085px, 0%;
    }
}
.demolist-page {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .view {
        position: relative;
        top: 50px;
        margin: 0 auto;
        width: 800px;
		height: 600px;
    }
    .menu {
        position: relative;
        top: 80px;
        @include content(100%, 200px, $bgcColor: transparent);
        .btn {
            position: absolute;
            top: 0;
            bottom: 0;
            z-index: 999;
            width: 100px;
            @include flex-center;
			&:hover{
				color: deepskyblue;
				cursor: pointer;
			}
            i {
                font-size: 66px;
            }
        }
        .right {
            right: 0px;
        }
        .left {
            left: 0px;
        }
        .list {
            width: 80%;
            height: 100%;
            margin: 0 auto;
            white-space: nowrap;
            transition: all 1s;
            position: relative;
            display: flex;
            li {
                width: 25%;
                height: 100%;
                text-align: center;
                display: inline-block;
                margin-right: 5px;
                background-color: rgba($color: #000000, $alpha: 0.5);
                box-shadow: 0px 0px 12px 2px #ccc inset;
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex-shrink: 0;
				cursor: pointer;
                .title {
                    font-size: 36px;
                    font-weight: bold;
                    color: salmon;
                    margin-top: -10px;
                }
                .tips {
                    color: springgreen;
					margin-top: 10px;
					p{
						@include text-ellipsis;
					}
                }
            }
        }
    }
}
.demolist-page::before {
    content: "";
    @include abs-stretch;
    background: url($baseUrl+"/bg.png") $mainColor;
    animation: bgmove 40s infinite linear;
}
</style>