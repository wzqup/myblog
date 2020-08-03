<template>
    <div class="details-box">
        <div class="container">
            <div class="item" v-for="item in projectArr" :key="item.id">
                <div>
                    <a :href="item.url">
                        <img :src="item.imgUrl" />
                    </a>
                    <p :style="{marginTop : '10px'}">{{item.content}}</p>
                    <p v-if="item.ex.length">
                        传送门：
                        <a
                            v-for="cItem in item.ex"
                            :key="cItem.str"
                            :href="cItem.url"
                        >{{cItem.str}}</a>
                    </p>
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
                    ex: []
                },
                {
                    id: "2",
                    url: "https://v.sf-express.com/",
                    content: "顺丰月结服务平台&vue技术栈",
                    imgUrl:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592988664395&di=776cf9e112097aeccb4a7920a35c685e&imgtype=0&src=http%3A%2F%2Fimg3.qianzhan.com%2Fnews%2F201409%2F03%2F20140903-7ad3a3994afb0a7b_550x1300.jpg",
                    ex: []
                },
                {
                    id: "3",
                    url: "http://www.sinanonc.cn/",
                    content: "中科院苏州纳米所南昌研究院&官网&Jquery",
                    imgUrl:
                        "http://www.nczwkj.cn/public/uploads/20180522/3efc7cb0e554afa1e14611fde7edb56e.jpg",
                    ex: []
                },
                {
                    id: "4",
                    url: "http://www.yaocai.com",
                    content: "药材网&电商平台&Jquery",
                    imgUrl:
                        "http://www.nczwkj.cn/public/uploads/20180512/e232026a367ee178255778df2aebf11c.png",
                    ex: []
                }
            ]
        };
    }
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
	padding-bottom: 50px;
	position: relative;
    .container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        .item {
            width: 48%;
            height: 330px;
            border-radius: 5px;
            background-color: #1f2229;
            margin-bottom: 10px;
            padding: 10px;
            div {
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 270px;
                    border-radius: 5px;
                }
                p {
					font-size: 14px;
                    a {
                        margin-right: 10px;
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
            .item {
				width: 100%;
				margin: 20px auto;
            }
        }
    }
}

@media screen and (max-width: 750px) {
    .details-box {
        width: 375px;
        .container {
            .item {
				width: 100%;
            }
        }
    }
}
</style>