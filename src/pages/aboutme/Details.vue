<template>
    <div class="details-box">
        <div class="container">
            <div class="item" v-for = "item in strObj" :key = 'item.id'>
                <div class="imgBox">
                    <img :src= "item.imgUrl" alt />
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
	data(){
		return {
			strObj:[
				{	
					id:'1',
					title:'梦想摆渡人',
					imgUrl:'http://xuanwen.wang/public/images/photo-team-1.jpg',
					content:'深圳中心，我亲手将至少4000人送进软件行业的大门，实现他们月薪过万的理想，做他们的梦想摆渡人！如果你也曾和他们一样迷茫，欢迎联系我，我将和你一起乘风破浪！'
				},
				{
					id:'2',
					imgUrl:'http://xuanwen.wang/public/images/photo-team-2.jpg',
					title:'前端工程师',
					content:'资深前端工程师，16年开始学习前端开发，17年入职第一家公司，从一个初级实习生开始，历经万般险阻，其中辛酸只有自知。幸运的是，学到了很多，进步了很多，积累了大量的开发经验，成为一个真正合格的“前端攻城狮”!'
				},
				{
					id:'3',
					title:'摄影师',
					imgUrl:'http://xuanwen.wang/public/images/photo-team-3.jpg',
					content:'现居深圳，闲暇时光喜欢拿着相机瞎拍，拍拍好看的风景、拍拍妹子、拍拍发现的美好事物。纯粹属于自娱自乐型，从没有打算将摄影发展成我的职业，仅仅当做是1个业余爱好。'
				}
			]
		}
	}
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1025px) {
    // 屏幕大于992px小于1200px时的样式
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
                border: 1px #ccc solid;
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
}
@media screen and (max-width: 1024px) and(min-width: 375px) {
    // 屏幕大于992px小于1200px时的样式
    .details-box {
        @include content(375px, auto, transparent, 0px);
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 20px;
        .container {
            .item {
                width: 100%;
                height: 586px;
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
}
@media screen and (max-width: 375px) {
    // 屏幕大于992px小于1200px时的样式
    .details-box {
        @include content(300px, auto, transparent, 0px);
        .container {
            .item {
                width: 100%;
                height: 486px;
                .imgBox {
                    width: 100%;
                    height: 200px;
                    @include flex-center;
                    img {
                        @include round(127px);
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
}
</style>