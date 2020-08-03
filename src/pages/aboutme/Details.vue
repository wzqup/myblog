<template>
    <div class="details-box">
        <div class="container">
            <div class="item" v-for="item in strObj" :key="item.id">
                <div class="imgBox">
                    <img :src="item.imgUrl" alt />
                </div>
                <div class="str">
                    <h4>{{item.title}}</h4>
                    <p>{{item.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            strObj: [
                {
                    id: "1",
                    title: "梦想摆渡人",
                    imgUrl:
                        "http://xuanwen.wang/public/images/photo-team-1.jpg",
                    content:
                        "我是南昌工程学院应用电子技术专业2015级毕业生,在阿里巴巴渠道商江西聚友网络科技有限公司进行实习,期间接触到前端开发,感觉非常适合我,于是开启web前端开发之旅。"
                },
                {
                    id: "2",
                    imgUrl:
                        "http://xuanwen.wang/public/images/photo-team-2.jpg",
                    title: "前端工程师",
                    content:
                        "17年入职第一家以前端开发为岗位的公司，从一个初级实习生开始，历经万般险阻，其中辛酸只有自知。幸运的是，学到了很多，进步了很多，积累了大量的开发经验，成为一个真正合格的“前端攻城狮”!"
                },
                {
                    id: "3",
                    title: "我的爱好",
                    imgUrl:
                        "http://xuanwen.wang/public/images/photo-team-3.jpg",
                    content:
                        "闲暇时光喜欢看电影、玩游戏或者到处走走,拿着相机拍拍好看的风景、发现的美好事物。很喜欢的一句话--如果终其一生都畏手畏脚那将会很无趣，不怀疑自己，不畏惧失败才是我们该有的样子"
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.details-box {
    @include content(1150px, auto, transparent, 0px);
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 20px;
    .container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        .item {
            width: 330px;
            height: 586px;
            // border: 1px #ccc solid;
            .imgBox {
                width: 100%;
                height: 300px;
                @include flex-center;
                img {
                    @include round(227px);
                }
            }
            .str {
                padding: 0 30px;
                h4 {
                    color: #fff;
                    font-size: 36px;
                    font-weight: 400;
                    line-height: 40px;
                    text-align: center;
                }
                p {
                    font-size: 16px;
                    text-indent: 32px;
                    line-height: 26px;
                    margin-top: 20px;
                }
            }
        }
    }
}
@media screen and (max-width: 1023px) and(min-width: 375px) {
    .details-box {
        @include content(375px, auto, transparent, 0px);
        .container {
            .item {
                width: 100%;
                height: auto;
                border: none;
                margin-bottom: 10px;
            }
        }
    }
}
@media screen and (max-width: 375px) {
    .details-box {
        @include content(300px, auto, transparent, 0px);
        .container {
            .item {
                width: 100%;
                height: auto;
                border: none;
            }
        }
    }
}
</style>