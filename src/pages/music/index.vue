<template>
    <div class="music-page">
        <div class="nav">
            <div class="tab">
                <span :class="tabActive === 'new' ? 'active' : ''" @click="changeCate('new')">最新歌曲</span>
                <span :class="tabActive === 'hot' ? 'active' : ''" @click="changeCate('hot')">最热歌曲</span>
            </div>
            <div class="seach">
                <input type="text" placeholder="搜索" @focus="showHot" @blur="hideHot" />
                <i></i>
            </div>
            <div class="hot" v-show="seachHot"></div>
        </div>
        <div class="viewBox">
            <div class="music-list">
                <!-- 歌曲列表 -->
                <el-table :data="songs" style="width: 100%">
                    <el-table-column prop="img" :width="100">
                        <template slot-scope="scope">
                            <img
                                :src="scope.row.img"
                                width="66px"
                                height="66px"
                                @click="selectMusic(scope.row.id)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name"></el-table-column>
                    <el-table-column prop="artists[0].name" align="center"></el-table-column>
                    <el-table-column prop="duration" align="center" header-align="right">
                        <template #header>
                            <ul class="music-type">
                                <li
                                    v-for="item in musicType"
                                    :key="item.type"
                                    @click="tabChange(item.type)"
                                    :class="{'active' : item.type === type}"
                                >{{item.title}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="footer">
            <!-- 播放器 -->
            <!-- 左侧 -->
            <div class="audioBar">
                <div class="songs">
                    <div class="img-wrap" v-show="currentSong.name">
                        <img :src="currentSong.img" />
                    </div>
                    <div class="str" v-show="currentSong.name">
                        <p>{{currentSong.name}}</p>
                        <p>{{this.formatTime(currentMusicTime)}}/{{this.formatTime(currentSong.duration/1000)}}</p>
                    </div>
                </div>
                <div class="control">
                    <div class="btn-wrap">
                        <div class="pre">
                            <i class="iconfont icon-back"></i>
                        </div>
                        <div class="play" @click="playOrpause">
                            <i class="iconfont" :class="playing ? 'icon-iconstop':'icon-bofang'"></i>
                        </div>
                        <div class="next">
                            <i class="iconfont icon-shangyiqu"></i>
                        </div>
                    </div>
                    <audio
                        ref="audio"
                        @canplay="ready"
                        @ended="end"
                        @timeupdate="updateTime"
                        :src="musicUrl"
                    ></audio>
                </div>
                <div class="mode">
                    <!-- <audio ref="audio" controls :src="musicUrl"></audio> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { musicRequest } from "@/utils/axios";
export default {
    data() {
        return {
            seachHot: false,
            tabActive: "new",
            songs: [],
            // 当前播放歌曲
            currentIndex: 0,
            currentSong: {},
            musicUrl: "",
            currentMusicTime: 0,
            // 最新歌曲类别
            musicType: [
                { title: "全部", type: 0 },
                { title: "华语", type: 7 },
                { title: "欧美", type: 96 },
                { title: "日本", type: 8 },
                { title: "韩国", type: 16 },
            ],
            // 当前选择类别
            type: 0,
            // 是否正在播放
            playing: false,
        };
    },
    async created() {
        // 获取歌曲列表
        await this.getMusicList(this.type);
    },
    mounted() {
        // console.log(this.audio);
    },
    methods: {
        showHot() {
            this.seachHot = true;
        },
        hideHot() {
            this.seachHot = false;
        },
        changeCate(cate) {
            this.tabActive = cate;
            let str = cate === "new" ? "最新歌曲" : "最热歌曲";
            this.test = str;
        },
        async selectMusic(musicId) {
            // 获取歌曲路径
            let music = await this.getMusicURL(musicId);
            // 切换当前歌曲
            if (music) {
                this.currentSong = this.songs.find((item) => {
                    return item.id === musicId;
                });
                // 播放歌曲
				this.play();
				this.playing = true;
            }
        },
        // 播放器事件
        ready() {
            // 加载动画结束...
        },
        end() {
            console.log("播放结束");
        },
        updateTime(e) {
            this.currentMusicTime = e.target.currentTime;
        },
        play() {
            // 启动加载动画...
            this.audio.play();
        },
        pause() {
            this.audio.pause();
        },
        // 自定义控件事件
        playOrpause() {
			if(this.currentSong.name){
				this.playing = !this.playing;
			} else {
				confirm('请先选择歌曲!!')
			}
            
        },
        // 歌曲分类
        tabChange(type) {
            if (this.type !== type) {
                this.type = type;
                this.getMusicList(type);
            }
        },
        // 获取歌曲url
        async getMusicURL(id) {
            let { data } = await musicRequest(`/song/url?id=${id}`);
            let musicUrl = data[0].url;
            if (musicUrl) {
                this.musicUrl = musicUrl;
                return true;
            } else {
                confirm("该歌曲无法播放,换一首试试吧!");
                return false;
            }
        },
        // 获取最新歌曲列表
        async getMusicList(type) {
            let { data } = await musicRequest(`top/song?type=${type}`);
            this.songs = data.map((song) => {
                const {
                    id,
                    name,
                    artists,
                    duration,
                    mvid,
                    album: { picUrl, name: albumName },
                } = song;
                return {
                    id,
                    name,
                    artists,
                    duration,
                    albumName,
                    img: picUrl,
                    mvId: mvid,
                };
            });
        },
        // 加0
        pad(num, n = 2) {
            let len = num.toString().length;
            while (len < n) {
                num = "0" + num;
                len++;
            }
            return num;
        },
        // 时间格式
        formatTime(interval) {
            interval = interval | 0; // 浮点数赋值给变量不足1的会自动去掉
            const minute = this.pad((interval / 60) | 0);
            const second = this.pad(interval % 60);
            return `${minute}:${second}`;
        },
    },
    computed: {
        audio() {
            return this.$refs.audio;
        },
    },
    watch: {
        currentSong(newSong, oldSong) {
            console.log("更新歌曲");
        },
        playing(newPlaying, oldPlaying) {
			newPlaying ? this.play() : this.pause();
        },
    },
};
</script>

<style lang="scss">
.music-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #ccc;
    .nav {
        position: relative;
        .seach {
            width: 200px;
            height: 30px;
            position: absolute;
            top: 50%;
            right: 10px;
            margin-top: -15px;

            input {
                width: 100%;
                height: 100%;
                border-radius: 6px;
                border: 1px #ccc solid;
                box-sizing: border-box;
                outline: none;
                padding-left: 26px;
            }
        }
        .hot {
            width: 200px;
            min-height: 200px;
            border: 1px red solid;
            border-radius: 0 0 6px 6px;
            position: absolute;
            right: 10px;
            top: 100%;
        }
        .tab {
            height: 36px;
            position: absolute;
            top: 50%;
            left: 10px;
            margin-top: -18px;
            span {
                line-height: 36px;
                margin-right: 10px;
                padding-bottom: 5px;
                transition: color 0.5s;
                &.active {
                    border-bottom: 2px solid springgreen;
                    color: #fff;
                }
            }
        }
    }
    .viewBox {
        display: flex;
        flex-direction: column;
        .music-list {
            flex: 9;
            background-color: green;
            overflow-y: auto;
        }
        .music-type {
            float: right;
            li {
                float: left;
                margin-right: 6px;
                &.active {
                    color: coral;
                }
            }
        }
    }
    .footer {
        background-color: rgba(0, 0, 0, 0.3);
        .audioBar {
            width: 100%;
            height: 100%;
            // background-color: #fff;
            display: flex;
            .songs {
                flex: 1;
                // background-color: red;
                position: relative;
                display: flex;
                align-items: center;
                .img-wrap {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    position: relative;
                    img {
                        width: 100%;
                    }
                    &::before {
                        content: "";
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        top: 0;
                        right: 0;
                        background: rgba(0, 0, 0, 0.5);
                    }
                }
            }
            .control {
                flex: 1;
                // background-color: blue;
                display: flex;
                justify-content: center;
                align-items: center;
                .btn-wrap {
                    width: 158px;
                    height: 60px;
                    // background-color: #ccc;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .pre {
                        @include round(30px);
                    }
                    .play {
                        @include round(40px);
                        margin: 0 6px;
                    }
                    .next {
                        @include round(30px);
                    }
                    .pre,
                    .play,
                    .next {
                        @include flex-center;
                        i {
                            font-size: 20px;
                        }
                    }
                }
            }
            .mode {
                flex: 1;
                // background-color: green;
            }
        }
    }
    .nav,
    .footer {
        flex: 1;
        padding: 6px;
        background-color: slateblue;
    }
    .viewBox {
        flex: 8;
    }
}
</style>