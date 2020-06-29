<template>
    <aside
        class="aside"
        :class="[trsin ? 'trs-in':'trs-out']"
        @mouseenter="showBtnFn"
        @mouseleave="hidBtnFn"
    >
        <div class="logo">CODE MAN</div>
        <div class="photoBox">
            <div class="photo">
                <!-- <div class="tx"></div> -->
				<img class="tx" src="http://demo.qfpffmp.cn/cssthemes6/ddjb_6_booster/images/pro.jpg" alt="">
            </div>
        </div>
        <div class="menu">
            <h2>个人信息</h2>
            <ul class="list-wrap">
                <li class="list-item" :class="[active === 1 ? 'active':'']" @click="active = 1">
                    <router-link to="/aboutme">关于我</router-link>
                </li>
                <li class="list-item" :class="[active === 2 ? 'active' : '']" @click="active = 2">
                    <router-link to="/project">项目经历</router-link>
                </li>
            </ul>
        </div>
        <div class="side">
            <transition name="trs">
                <div
                    class="btn"
                    @click="hiddenAside"
                    @mouseenter="showBarAnm"
                    @mouseleave="hidBarAnm"
                    v-show="showBtn"
                >
                    <i class="iconfont" :class="[trsin ? 'icon-huaban': 'icon-huaban1']"></i>
                </div>
            </transition>
            <transition name="fade">
                <div class="side-bar" :class="[barAnm ? 'anm':'']"></div>
            </transition>
        </div>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            showBtn: false, // 显示隐藏按钮
            trsin: true, 	// 隐藏显示侧边导航
			barAnm: false,	// 是否显示动画
			active:1		// 当前选中的选项
        };
	},
	mounted(){
		const that = this;
		that.clientHeight = `${document.documentElement.clientWidth}`
		if(that.clientHeight < 1280){
			this.showBtn = true;
		}
	},
    methods: {
        // 点击收起按钮
        hiddenAside() {
            // 隐藏侧边栏
            this.trsin = !this.trsin;
            // 父元素是否有padding
            this.$parent.padding = this.trsin;
        },
        // 显示收起按钮
        showBtnFn() {
           if(this.trsin) this.showBtn = true;
        },
        hidBtnFn() {
           if(this.trsin) this.showBtn = false;
		},
		// 是否显示条形的动画
        showBarAnm() {
			if(!this.trsin) this.barAnm = true
        },
        hidBarAnm() {
			if(!this.trsin) this.barAnm = false
		}
    }
};
</script>

<style lang="scss" scoped>
.aside {
    width: 188px;
    height: 100%;
    background-color: $asideColor;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 666;
    box-sizing: border-box;
    @include box-shadow;
    .logo {
        height: 64px;
        line-height: 64px;
        text-align: center;
        font-weight: 700;
        font-size: 26px;
        @include lgStr($bgColor);
        animation: strAnm 2s linear 2;
    }
    .photoBox {
        @include flex-center;
        height: 200px;
        .photo {
            @include round(140px);
            @include bgColor;
            padding: 5px;
            .tx {
                @include round(100%);
                &:hover {
                    transform: scale(1.2);
                    transition: all 1s 0.5s;
                }
            }
            &:hover {
                @include bgAnm;
            }
        }
    }
    .menu {
        width: 100%;
        height: 186px;
        position: absolute;
        top: 268px;
        left: 0;
        z-index: 2;
        padding-left: 16px;
        h2 {
            color: #ffdd40;
            font-size: 12px;
        }
        .list-wrap {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .list-item {
                width: 166px;
                height: 36px;
                padding: 5px;
                a {
                    display: block;
                    width: 90%;
                    height: 100%;
                    text-align: center;
                    line-height: 26px;
                    color: #fff;
                    border: 1px $btnBgc dashed;
                    letter-spacing: 2px;
                    &:hover {
                        background-color: #000;
                        border: 1px $btnBgc solid;
                        transition: all 0.5s;
                    }
                }
                &.active a {
                    background-color: #000;
                    border: 1px $btnBgc solid;
                    transition: all 0.5s;
                }
            }
        }
    }
    .btn {
        width: 24px;
        height: 24px;
        position: fixed;
        left: 188px;
        top: 74px;
        background-color: #5a5f73;
        z-index: 1;
        border-radius: 0 6px 6px 0;
        @include flex-center;
    }
    .side-bar {
        width: 12px;
        height: 120%;
        position: absolute;
        top: 0px;
        right: 0px;
		background-color: $asideColor;
        z-index: 1;
    }
}
.aside.trs-in {
    transform: translateX(0px);
    transition: all 0.3s linear;
}
// 侧边栏淡入淡出动画
@keyframes ddd {
    100% {
        transform: translateY(-17px);
    }
}
.aside.trs-out {
    .side-bar {
        opacity: 0.3;
        background-image: repeating-linear-gradient(
            45deg,
            #868ca0,
            #868ca0 2px,
            #5a5f73 0,
            #5a5f73 4px
        );
        &:hover {
            opacity: 0.6;
            transition: opacity 0.3s;
            animation: ddd 0.6s linear 0s infinite;
        }
    }
    .side-bar.anm {
        opacity: 0.6;
        transition: opacity 0.3s;
        animation: ddd 0.6s linear 0s infinite;
    }
    .btn {
        z-index: 2;
        transform: translateX(-12px);
        transition: all 1s;
    }
    transform: translateX(-176px);
    transition: all 1s ease;
}

// 按钮移入移出动画
.trs-enter-active {
    transition: all 0.3s ease;
}
.trs-leave-active {
    transition: all 0.3s ease-in-out;
}
.trs-enter, .trs-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-12px);
}
</style>