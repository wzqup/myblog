<template>
    <div class="index-page animate__animated animate__fadeIn">
        <div class="wrap">
            <h1 :class="blink">{{ str }}</h1>
            <span class="go" @click="$router.push('/aboutme')">进入首页</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            str: "",
            blink: "blink",
        };
    },
    mounted() {
        this.timer = this.typeist("Hello , I'm Wzq ..");
    },
    methods: {
        typeist(str) {
            // 切割字体
            const strArr = str.split("");
            let index = 0;
            // 每次打一个字
            const timer = setInterval(() => {
                if (index === strArr.length - 1) this.clearTimer(timer);
                this.str += strArr[index];
                index++;
            }, 300);

            return timer;
        },
        clearTimer(timer) {
            // 清楚计时器
            clearInterval(timer);
            // 去掉blink
            this.blink = "";
        },
    },
    beforeDestroy() {
        this.clearTimer(this.timer);
    },
};
</script>

<style lang="scss">
@keyframes move {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes move2 {
    0% {
        background-position-x: 0px;
    }
    100% {
        background-position-x: 126px;
    }
}
.index-page {
    width: 100%;
    height: 100%;
    background: url($baseUrl + "/fss.png");
    background-color: #131417;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba($color: #000000, $alpha: 0.6);
    }
    .wrap {
        width: 66%;
        background-color: rgba($color: #000000, $alpha: 0.6);
        box-shadow: 8px 8px 3px 0px rgba($color: #000000, $alpha: 0.8);
        text-align: center;
        font-size: 66px;
        position: relative;
        z-index: 2;
        color: #eee;
        padding: 30px 10px;
        .blink {
            &::after {
                content: "|";
                animation: move 0.5s 1;
            }
        }
        .go {
            width: 220px;
            height: 39px;
            box-sizing: border-box;
            padding: 6px 30px;
            font-size: 16px;
            cursor: pointer;

            background: linear-gradient(0, #ffc700 2px, #ffc700 0) no-repeat 0 0/0
                    2px,
                linear-gradient(-90deg, #ffc700 2px, #ffc700 0) no-repeat 100% 0/2px
                    0,
                linear-gradient(-180deg, #ffc700 2px, #ffc700 0) no-repeat 100%
                    100%/0 2px,
                linear-gradient(-270deg, #ffc700 2px, #ffc700 0) no-repeat 0
                    100%/2px 0;
            transition: all 0.5s;
            &:hover {
                border-radius: 0;
                background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
                -webkit-transform: translate3d(0, -10px, 0) scale(1.05);
                transform: translate3d(0, -10px, 0) scale(1.05);
            }
        }
    }
}
@media screen and (max-width: 750px) {
    .index-page {
        background: url($baseUrl + "/fj.jpg");
		background-size: cover;
    }
}
</style>