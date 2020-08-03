<template>
    <div class="time-bar" :class="[selectPerson.blackOrwhite?'white':'black']">
        <div class="tx-box" @click="showSetup = true">
            <img class="tx" :src="selectPerson.txUrl" />
            <span class="str">{{selectPerson.name}}({{timeObj.overYears}}岁)</span>
        </div>
        <div class="top-box">
            <h2 @click="getSentence">{{oneSentence.hitokoto}}</h2>
            <p
                v-if="oneSentence.author"
                style="textAlign:center;marginTop:10px"
                class="author"
            >{{oneSentence.author + ' · ' + oneSentence.source}}</p>
            <div class="str-box">
                <p class="str">
                    你想活到{{selectPerson.maxAge}}岁
                    <span class="brack">人生</span>
                    已经{{timeObj.overYears}}年
                </p>
                <div class="pgbar">
                    <div
                        class="barMask"
                        :style="{width:Math.floor(timeObj.overYears/selectPerson.maxAge*100)+'%'}"
                    >{{Math.floor(timeObj.overYears/selectPerson.maxAge*100)}}%</div>
                </div>
                <p
                    class="str"
                >你可能已经吃过了{{timeObj.eat}}顿饭,度过了{{timeObj.weekEnd}}个愉快的周末,以及享受过{{timeObj.longDay}}个美妙的夜晚</p>
            </div>
        </div>
        <div class="bottom-box">
            <p class="str">今天已经过去了大约{{timeObj.cHours}}小时</p>
            <div class="pgbar">
                <div
                    class="barMask"
                    :style="{width:Math.floor(timeObj.cHours/24*100)+'%'}"
                >{{Math.floor(timeObj.cHours/24*100)}}%</div>
            </div>
            <!-- 0-6 -->
            <p class="str">本周已经过去了{{getDay}}天</p>
            <div class="pgbar">
                <div
                    class="barMask"
                    :style="{width:Math.floor((getDay+timeObj.cHours/24)/7*100)+'%'}"
                >{{Math.floor((getDay+timeObj.cHours/24)/7*100)}}%</div>
            </div>
            <p class="str">这个月已经过去了{{timeObj.cData-1}}天</p>
            <div class="pgbar">
                <div
                    class="barMask"
                    :style="{width:Math.floor((timeObj.cData+timeObj.cHours/24)/30*100)+'%'}"
                >{{Math.floor((timeObj.cData+timeObj.cHours/24)/31*100)}}%</div>
            </div>
            <p class="str">2020年已经过去了{{timeObj.cMonth}}个月</p>
            <div class="pgbar">
                <div
                    class="barMask"
                    :style="{width:Math.floor(timeObj.cMonth/12*100)+'%'}"
                >{{Math.floor(timeObj.cMonth/12*100)}}%</div>
            </div>
        </div>
        <!-- 设置 -->
        <div class="setup" v-show="showSetup">
            <i class="iconfont icon-close" @click="showSetup = false"></i>
            <h4>设置</h4>
            <div class="content">
                <el-card>
                    <div class="title" @click="dialogVisible = true">添加成员</div>
                    <div class="item" v-for="(person,index) in personList" :key="index">
                        <img class="tx" :src="person.txUrl" alt />
                        <div class="str-box">
                            <p>{{person.name}}</p>
                            <p>{{person.age}}</p>
                        </div>
                        <div
                            class="del"
                            :class="[person.id == selectPersonId ? 'xuanzhong':'trash']"
                            @click="delPerson(person.id)"
                            v-if="personList.length > 1"
                        >
                            <i
                                class="iconfont"
                                :class="[person.id == selectPersonId ? 'icon-xuanzhong':'icon-trash']"
                            ></i>
                        </div>
                    </div>
                    <el-dialog
                        title="添加成员"
                        :visible.sync="dialogVisible"
                        :modal-append-to-body="false"
                    >
                        <div class="addPerson">
                            <div class="addPerson-item">
                                <span>头像</span>
                                <div @click="rPic">
                                    <img :src="testUrl" />
                                </div>
                                <input
                                    type="file"
                                    ref="fileSelect"
                                    v-show="false"
                                    @change="getFile"
                                />
                            </div>
                            <div class="addPerson-item">
                                <span>昵称</span>
                                <div>
                                    <el-input
                                        placeholder="请输入昵称"
                                        :style="{width:'80%'}"
                                        v-model="addName"
                                    ></el-input>
                                </div>
                            </div>
                            <div class="addPerson-item">
                                <span>生日</span>
                                <div>
                                    <el-date-picker
                                        v-model="addAge"
                                        type="date"
                                        placeholder="选择日期"
                                        :style="{width:'80%'}"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addPerson">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-card>
                <el-card>
                    <div class="options-item">
                        <div class="one">
                            <span>选个人吧?</span>
                        </div>
                        <div>
                            <el-select
                                v-model="selectPersonId"
                                @change="selectPersonChange"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in personList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="options-item">
                        <div class="one">
                            <span>你打算活到多少岁呢?</span>
                        </div>
                        <div>
                            <el-input-number
                                v-model="selectPerson.maxAge"
                                :min="1"
                                :max="120"
                                @change="editPerson"
                            ></el-input-number>
                        </div>
                    </div>
                    <div class="options-item">
                        <div class="one">
                            <span>黑夜与光明?</span>
                        </div>
                        <div>
                            <el-switch
                                v-model="selectPerson.blackOrwhite"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="editPerson"
                            ></el-switch>
                        </div>
                    </div>
                    <div class="options-item">
                        <div class="one">
                            <span>第一天是周几?</span>
                        </div>
                        <div>
                            <el-select v-model="selectPerson.firstDay" placeholder="请选择">
                                <el-option
                                    v-for="item in firstDayList"
                                    :key="item.firstday"
                                    :label="item.name"
                                    :value="item.firstday"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
// 新建一个成员类
class Person {
    constructor(
        id,
        name,
        age,
        txUrl,
        maxAge,
        blackOrwhite,
        firstDay,
        sense,
        dec,
        sentenceApi
    ) {
        // 基本信息
        this.id = id;
        this.name = name;
        this.age = age;
        this.txUrl = txUrl || "https://iph.href.lu/46x46";
        // 设置信息
        this.maxAge = maxAge || 80;
        this.blackOrwhite = blackOrwhite || 0;
        this.firstDay = firstDay || 1;
        this.sense = sense || 0;
    }
}

// 新建一个localStorage 操作类
class LocalStoragePlay {
    constructor(dataKey) {
        this.dataKey = dataKey;
    }
    // 读取数据
    read() {
        let data = localStorage.getItem(this.dataKey);
        return data ? JSON.parse(data) : null;
    }
    // 存储数据
    save(arr) {
        let data = JSON.stringify(arr);
        localStorage.setItem(this.dataKey, data);
    }
}
// 实例化
const ls = new LocalStoragePlay("personList");
const lsId = new LocalStoragePlay("selectId");

export default {
    data() {
        return {
            // 显示设置
            showSetup: false,
            // 添加成员弹框
            dialogVisible: false,
            addName: "",
            addAge: "",
            // 成员数组
            personList: [],
            // 当前选择成员
            selectPersonId: "",
            selectPerson: {},
            timeObj: {},
            // 第一天是周几
            firstDayList: [
                {
                    firstday: 0,
                    name: "周日"
                },
                {
                    firstday: 1,
                    name: "周一"
                }
            ],
            // 测试url
            testUrl: "https://iph.href.lu/60x60",
            // 一言 response
            oneSentence: {}
        };
    },
    created() {
        this.getSentence();
        if (ls.read() && ls.read().length) {
            // 读取本地已存储的数据
            this.personList = ls.read();
            // 本地是否存在ID
            if (lsId.read()) {
                this.selectPersonId = lsId.read();
            } else {
                this.selectPersonId = this.personList[0].id;
            }
        } else {
            // 默认数据
            let pereson = new Person(1, "魏大帅哥", "1993-09-09");
            this.personList.push(pereson);
            // 默认选择ID
            this.selectPersonId = 1;
        }

        this.selectPerson = this.personList.find(item => {
            return item.id == this.selectPersonId;
        });
    },
    methods: {
        // 新加成员
        addPerson() {
            let id;
            if (this.personList.length) {
                id = this.personList[this.personList.length - 1].id + 1;
            } else {
                id = 1;
            }
            const addPeople = new Person(
                id,
                this.addName,
                this.addAge,
                this.testUrl
            );
            // 添加到数组
            this.personList.push(addPeople);
            // 添加到本地
            ls.save(this.personList);
            // 重置数据
            this.dialogVisible = false;
            (this.addName = ""), (this.addAge = "");
        },
        // 选择设置人员
        selectPersonChange(value) {
            this.selectPerson = this.personList.find(item => {
                return item.id === value;
            });
            lsId.save(value);
        },
        // 设置人员数据
        editPerson() {
            // 替换旧数据
            let editIndex = this.personList.findIndex(item => {
                return item.id == this.selectPersonId;
            });
            // 更新personList
            this.personList[editIndex] = this.selectPerson;
            // 更新到ls
            ls.save(this.personList);
        },
        // 删除人员
        delPerson(id) {
            if (id === this.selectPersonId) return false;
            // 替换旧数据
            let delIndex = this.personList.findIndex(item => {
                return item.id == id;
            });
            // 更新personList
            this.personList.splice(delIndex, 1);
            // 更新到ls
            ls.save(this.personList);
            if (id == this.selectPersonId) {
                if (this.personList.length) {
                    this.selectPersonId = this.personList[0].id;
                } else {
                    this.selectPersonId = "";
                }
                lsId.save(this.personList[0].id);
            }
        },
        //更换头像
        rPic() {
            this.$refs.fileSelect.click();
        },
        getFile() {
            const inputFile = this.$refs.fileSelect.files[0];

            if (inputFile && inputFile.type.indexOf("image") > -1) {
                // 获取图片的本地地址
                let getUrl = null;
                if (window.createObjectURL != undefined) {
                    // basic
                    getUrl = window.createObjectURL(inputFile);
                } else if (window.URL != undefined) {
                    // mozilla(firefox)
                    getUrl = window.URL.createObjectURL(inputFile);
                } else if (window.webkitURL != undefined) {
                    // webkit or chrome
                    getUrl = window.webkitURL.createObjectURL(inputFile);
                }

                // 转成base64 保存到ls
                var image = new Image();
                image.src = getUrl;
                image.onload = () => {
                    this.testUrl = getBase64Image(image);
                };
            } else {
				alert('请选择图片！！！')
            }
        },
        // 获取句子
        getSentence() {
            let that = this;
            fetch("https://api.imjad.cn/hitokoto/?cat=d&encode=json")
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    that.oneSentence = myJson;
                });
        }
    },
    computed: {
        getDay() {
            let get;
            if (this.selectPerson.firstDay && !this.timeObj.cDay) {
                // 星期一
                get = 6;
            } else {
                get = this.timeObj.cDay - this.selectPerson.firstDay;
            }
            return get;
        }
    },
    watch: {
        selectPersonId() {
            if (this.personList.length) {
                this.selectPerson = this.personList.find(item => {
                    return item.id === this.selectPersonId;
                });
            }

            this.timeObj = computed(this.selectPerson.age);
        }
    }
};

function computed(birthday) {
	
    // 现在
    let currentData = new Date();
    let cYear = currentData.getFullYear(); // xxxx
    let cMonth = currentData.getMonth(); // 0-11
    let cData = currentData.getDate(); // 1-31
    let cDay = currentData.getDay(); // 0-6
    let cHours = currentData.getHours();

    // 获取设置生日的年月日
    let timeArr = birthday.split("-");
    let personYear = Number(timeArr[0]);
    let personMonth = Number(timeArr[1]);
    let personDate = Number(timeArr[2]);

    // 生日至今多少天
    let long = currentData.getTime() - new Date(birthday).getTime();
    let longDay = Math.floor(long / 1000 / 60 / 60 / 24);

    // 有多少个周末
    let weekEnd = Math.floor(longDay / 7);

    // 吃了多少顿饭
    let eat = Math.floor(longDay) * 3;

    // 生日至今时间段
    let startTime = timeArr; // [1993,8,3]
    let currentTime = currentData.toLocaleDateString().split("/"); // [2020,7,8]

    // 生日至今多少年
    let overYears = cYear - personYear;

    return { overYears, cMonth, cData, cDay, cHours, longDay, weekEnd, eat };
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}
</script>

<style lang="scss" scoped>
div {
    box-sizing: border-box;
}
.black.time-bar {
    background-color: #131417;
    .str {
        color: #eeeeee;
    }
    .top-box {
        border-top: 1px solid rebeccapurple;
        border-bottom: 1px solid rebeccapurple;
        h2 {
            color: #eeeeee;
        }
        .author {
            color: #eee;
        }
    }
    .tx-box {
        background-color: #131417;
        color: #eeeeee;
    }
    .setup {
        & > i {
            color: #eeeeee;
        }
        background-color: #131417;
        h4 {
            color: #eeeeee;
        }
        .el-card {
            background-color: #131417;
            color: #eeeeee;
        }
    }
    .setup .content .el-card .item:hover {
        background-color: #666;
        transition: all 0.5s;
    }
}
.time-bar {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    background-color: #fff;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    .str {
        color: #666;
    }
    .pgbar {
        width: 100%;
        height: 18px;
        margin: 18px 0px;
        border-radius: 9px;
        background-color: #e4e8f1;
        .barMask {
            content: "";
            display: block;
            width: 50%;
            height: 18px;
            border-radius: 9px;
            background-image: linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.15) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.15) 50%,
                rgba(255, 255, 255, 0.15) 75%,
                transparent 75%,
                transparent
            );
            background-size: 40px 40px;
            background-color: #ff4949;
            text-align: right;
            padding-right: 10px;
            line-height: 18px;
            box-sizing: border-box;
            animation: timeBar 2s linear infinite;
        }
    }
    .top-box {
        width: 100%;
        height: 252px;
        border-top: 1px solid #dedfe6;
        border-bottom: 1px solid #dedfe6;
        margin-top: 24px;
        position: relative;
        z-index: 1;
        h2 {
            color: #303133;
            margin-top: 44px;
            font-size: 24px;
            text-align: center;
        }
		.author {
			color: #303133;
		}
        .str-box {
            position: absolute;
            left: 0;
            bottom: 20px;
        }
    }
    .myStyle {
        position: absolute;
        top: 5px;
        right: 20px;
    }
    .bottom-box {
        width: 100%;
        box-sizing: border-box;
        padding-top: 20px;
    }
    .str-box {
        width: 100%;
    }
    .tx-box {
        background-color: #fff;
        height: 54px;
        position: absolute;
        top: 16px;
        left: 42px;
        color: #afafb0;
        padding: 10px;
        z-index: 2;
        @include flex-center;
        .tx {
            @include round(54px);
            margin-right: 10px;
        }
    }
    .setup > i {
        position: absolute;
        top: 10px;
        right: 16px;
        color: #000;
        font-size: 26px;
        &:hover {
            transform: rotate(540deg);
            transition: all 0.5s linear;
        }
    }
    .setup {
        @include abs-stretch;
        z-index: 9;
        padding: 20px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        h4 {
            font-size: 20px;
            color: #333;
            display: block;
            width: 100%;
            height: 40px;
        }
        .content {
            flex: 1;
            display: flex;
            justify-content: space-between;
            padding-top: 20px;
            .el-card {
                flex: 10;
                .title {
                    margin-bottom: 15px;
                    cursor: pointer;
                    color: #409eff;
                }
                .item {
                    display: flex;
                    height: 71px;
                    align-items: center;
                    border-bottom: 1px solid #ebeef5;
                    position: relative;
                    &:hover {
                        background-color: #f5f7fa;
                        transition: all 0.5s;
                    }
                    .tx {
                        @include round(46px);
                        margin-left: 10px;
                        margin-right: 10px;
                    }
                    .str-box {
                        flex: 1;
                        box-sizing: border-box;
                        padding-top: 20px;
                        p {
                            margin-bottom: 6px;
                        }
                    }
                    .del {
                        width: 32px;
                        height: 32px;
                        border-radius: 16px;
                        position: absolute;
                        top: 50%;
                        margin-top: -16px;
                        right: 20px;
                        cursor: pointer;
                        background-color: #f78989;
                        display: flex;
                        @include flex-center;
                        &.xuanzhong {
                            background-color: #b3e19d;
                            cursor: not-allowed;
                            i {
                                font-size: 20px;
                            }
                        }
                        i {
                            font-size: 16px;
                            color: #fff;
                        }
                    }
                }
                .options-item {
                    text-align: center;
                    display: flex;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    div {
                        flex: 1;
                        text-align: left;
                    }
                    .one {
                        display: flex;
                        justify-content: flex-end;
                        align-self: center;
                    }
                    .el-cascader,
                    .el-input-number {
                        width: 145px;
                        height: 40px;
                    }

                    span {
                        margin-right: 12px;
                    }
                }
                .el-dialog__wrapper {
                    position: absolute;
                }
                .el-card__body {
                    .v-modal {
                        position: absolute;
                    }
                }
                .addPerson {
                    width: 100%;
                    .addPerson-item {
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;
                        margin-bottom: 22px;
                        span {
                            padding: 0 20px;
                        }
                        div {
                            flex: 1;
                            text-align: center;
                        }
                        img {
                            width: 60px;
                            height: 60px;
                        }
                    }
                }
            }
            .el-card:nth-of-type(1) {
                flex: 7;
                margin-right: 12px;
            }
        }
    }
}
</style>