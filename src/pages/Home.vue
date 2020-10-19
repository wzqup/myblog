<template>
    <div class="home" :class="[padding ? 'has-padding' : 'no-padding']">
        <!-- 侧边栏 -->
        <Aside />
        <!-- 内容区 -->
        <main class="main">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Aside from "../layout/Aside";
export default {
    components: {
        Aside,
    },
    data() {
        return {
            padding: true,
        };
    },
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
    background-color: #1e1f26;
    color: white;
    transition: all 1s;
    padding-left: 12px;
    background: url($baseUrl + "/fss.png");
    background-size: cover;
    &::before {
        content: "";
        @include abs-stretch;
        background-color: rgba(0, 0, 0, 0.5);
    }
}
.home:not(.no-padding) {
    padding-left: 188px;
}
.main {
    flex: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
}
@media screen and (max-width: 750px) {
    .home {
        background: url($baseUrl + "/boy.png");
        background-size: cover;
        padding-left: 0px;
    }
    .home:not(.no-padding) {
        padding-left: 0px;
    }
}
</style>