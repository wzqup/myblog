<template>
    <div class="cube-page">
        <div class="bigBox">
            <div class="top circle">
                <img src="../assets/img/cube.gif" />
            </div>
            <div class="bottom circle">
                <img src="../assets/img/cube.gif" />
            </div>
            <div class="left circle">
                <img src="../assets/img/cube.gif" />
            </div>
            <div class="right circle">
                <img src="../assets/img/cube.gif" />
            </div>
            <div class="inside circle">
                <img src="../assets/img/cube.gif" />
            </div>
            <div class="outside circle">
                <img src="../assets/img/cube.gif" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@keyframes move {
    0% {
        /* 一开始的时候给旋转x,y角度 从0 开始 */
        transform: rotateY(0deg) rotateX(0deg);
    }
    100% {
        /* 完成360度选装 */
        transform: rotateY(360deg) rotateX(360deg);
    }
}
.cube-page {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
	@include flex-center;
}
div {
    width: 171px;
    height: 171px;
}

.bigBox {
    /* 给盒子一个3d展示效果 */
    transform-style: preserve-3d;
    /* 告诉浏览器我们要做的效果 */
    will-change: transform;
    /* translateY(30deg); */
    /* 设置动画效果 */

    animation: move 20s linear infinite;
}

.circle {
    /* border: 1px solid red; */
    /* 设置绝对定位 */
    position: absolute;
    transform-origin: 50% 50% 0;
    background-color: rgba(221, 0, 49, 0.8);
    /* 盒子阴影效果 */
    box-shadow: rgb(231, 225, 226) 0 0 150px;
    /*  h-shadow: 水平阴影位置我给了0; */
    /* v-shadow: 垂直阴影的位置我给了0 */
    /* blue: 模糊距离我给了150px */
}

.top {
    /* top 盒子 y轴平移85px   x轴旋转90度 */
    transform: translateY(85px) rotateX(90deg);
    /* background-color: skyblue; */
}

.bottom {
    /* bottom 盒子  y轴往上平移 -85px  x轴旋转90度 */
    transform: translateY(-85px) rotateX(90deg);
    /* background-color: greenyellow; */
}

.left {
    /* left 盒子  x轴往左平移85px   y轴旋转90度 */
    transform: translateX(85px) rotateY(90deg);
    /* background-color: blueviolet; */
}

.right {
    /* right 盒子  x轴往右平移85px   y轴旋转90度*/
    transform: translateX(-85px) rotateY(90deg);
}

.inside {
    transform: translateZ(85px);
}

.outside {
    transform: translateZ(-85px);
}
img {
    width: 100%;
    height: 100%;
}
</style>