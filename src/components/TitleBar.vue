<template>
    <div class="titleBar">
        <div class="content">
            <div class="left">
                <h3>{{title}}</h3>
                <p>{{smTitle}}</p>
            </div>
            <div class="right">
                <div class="cv" v-show="showDown">
                    <p>完整版简历</p>
                    <a href="http://qeh59wtc2.bkt.clouddn.com/%E9%AD%8F%E5%BF%97%E5%BC%BA_Web%E5%89%8D%E7%AB%AF_3%E5%B9%B4.pdf" target="_blank">下载</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleStr: Object
    },
    data() {
        return {
            title: this.titleStr.title,
            smTitle: this.titleStr.tip || "",
            showDown: false
        };
    },
    mounted() {
        this.showDown = document.title == "我的简历";
    }
};
</script>

<style lang="scss">
.titleBar {
    width: 100%;
    height: 280px;
    @include flex-center;
    .content {
        position: relative;
        @include content(1150px, 182px, transparent, 0px);
        box-sizing: border-box;
        border-bottom: 3px solid #ae63e4;
        h3 {
            font-size: 56px;
            color: #fff;
        }
        p {
            font-size: 16px;
            color: #9b9dad;
            margin-top: 10px;
        }
        .right {
            position: absolute;
            right: 0px;
            top: 180px;
            .cv {
                border: 3px #ae63e4 solid;
                border-top: none;
                padding: 10px;
                animation: rubberBand 1s 2;
                a {
                    display: block;
                    text-align: center;
                    color: #2fb45a;
                    margin-top: 10px;
                }
                p:first-child {
                    font-weight: 700;
                    color: #2fb45a;
                }
                .item {
                    display: flex;
                    justify-content: space-between;
                    span {
                        color: #fff;
                        font-size: 10px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1024px) and(min-width: 414px) {
    .titleBar {
        .content {
            color: red;
            @include content(750px, 182px, transparent, 0px);
        }
    }
}
@media screen and (max-width: 414px) {
    .titleBar {
        .content {
            @include content(300px, 182px, transparent, 0px);
        }
    }
}
</style>