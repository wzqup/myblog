<template>
    <div class="lyrics-page">
        <!-- 旋转图部分 -->
        <div class="left-play-bar" :class="playing ? 'playing' : 'paused'">
            <img src="../../../../assets/image/play-bar.png" class="play-bar" />
            <img
                src="../../../../assets/image/play-bar-support.png"
                class="play-bar-support"
            />
            <div class="play-img-wrap">
                <img
                    :src="currentSong.img + `?param=250y250`"
                    alt=""
                    class="music-img"
                />
            </div>
        </div>
        <!-- 歌词部分 -->
        <div class="right-lyric-wrap">
            <p class="songname">{{ currentSong.name }}</p>
            <p class="artist">歌手 : {{ currentSong.artists[0].name }}</p>
            <div class="lyrics-wrap" ref="lyricsListDOM" :class="hideScollBar" @mouseenter="mouseenterH" @mouseleave="mouseleaveH">
                <ul>
                    <li
                        v-for="(item, index) in lyrics"
                        :key="index"
                        class="lyrics-item"
                        :class="getActiveClass(index)"
                        :time="item.time"
                        ref="lyricsItem"
                    >
                        {{ item.content }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { musicRequest } from "@/utils/axios";
import { mapState } from "vuex";
export default {
    data() {
        return {
            lyrics: [],
            currentLyricsIndex: 0,
            itemHeight: 0,
            mouseEnter: false,
            hideScollBar: "hide",
        };
    },
    computed: {
        ...mapState(["currentSong", "playing", "playtime"]),
    },
    watch: {
        playtime(newtime, oldtime) {
            // 当前播放时间
            let time = newtime;
            // 下一条歌词
            let nextLyric = this.lyrics[this.currentLyricsIndex + 1];
            // 找到下一个歌词的index
            if (nextLyric) {
                let nextIndex =
                    this.lyrics.findIndex((item) => {
                        return item.time >= newtime;
                    }) - 1;
                this.currentLyricsIndex = nextIndex;
            }
            // 获取当前滚动的位置
            if (!this.mouseEnter) {
                this.$refs.lyricsListDOM.scrollTop =
                    this.currentLyricsIndex * this.itemHeight -
                    4 * this.itemHeight;
            }
        },
        currentSong(newSong, oldSong) {
            if (newSong) {
                this.getLyrics(this.currentSong.id);
                this.$refs.lyricsListDOM.scrollTop = 0;
            }
        },
    },
    async mounted() {
        // 获取歌词
        await this.getLyrics(this.currentSong.id);
        // 获取每句歌词的高度
        this.$nextTick(() => {
            this.itemHeight = this.$refs.lyricsItem[5].scrollHeight;
        });
    },
    methods: {
        // 鼠标移入歌词页面
        mouseenterH() {
            this.mouseEnter = true;
            this.hideScollBar = "";
        },
        mouseleaveH() {
            this.mouseEnter = false;
            this.hideScollBar = "hide";
        },
        // 获取高亮歌词
        getActiveClass(index) {
            if (index === this.currentLyricsIndex) {
                return "active";
            } else {
                return "";
            }
        },
        // 解析歌词
        lyricParser(lrc) {
            // 分割组字符串为数组
            let lyrics = lrc.split("\n");
            const lrcObj = [];
            // 遍历 处理
            for (let i = 0; i < lyrics.length; i++) {
                // 解码
                const lyric = decodeURIComponent(lyrics[i]);

                // 获取时间部分字符串
                const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
                const timeRegExpArr = lyric.match(timeReg);
                if (!timeRegExpArr) continue;

                // 去除字符串中的时间部分
                const content = lyric.replace(timeReg, "");

                // 将时间部分转化为秒
                const t = timeRegExpArr[0]; // [00:02.848]
                const min = Number(String(t.match(/\[\d*/i)).slice(1));
                const sec = Number(String(t.match(/:\d*/i)).slice(1));
                const time = min * 60 + sec;
                if (content !== "") {
                    lrcObj.push({ time: time, content });
                }
            }
            return lrcObj;
        },
        // -------- 接口 ---------
        async getLyrics(songId) {
            let { lrc } = await musicRequest.get(`/lyric?id=${songId}`);
            this.lyrics = this.lyricParser(lrc.lyric);
        },
    },
};
</script>

<style lang="scss">
@keyframes rotateMove {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.lyrics-page {
    @include abs-stretch;
    bottom: 60px;
    background-color: #252525;
    color: #fff;
    .left-play-bar {
        width: 400px;
        height: 100%;
        position: relative;
        overflow: hidden;
        display: inline-block;
        .play-bar-support {
            width: 40px;
            height: 40px;
            position: absolute;
            top: -18px;
            left: 9px;
            z-index: 3;
        }
        .play-bar {
            position: absolute;
            top: 0;
            left: 20px;
            width: 136px;
            z-index: 2;
            transform: rotate(-16deg);
            transform-origin: left top;
            transition: all 0.8s;
        }
        .play-img-wrap {
            width: 360px;
            height: 360px;
            background-color: #000;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            position: absolute;
            top: 120px;
            left: 50%;
            margin-left: -180px;
            z-index: 1;
            border-radius: 100%;
            box-shadow: 0px 0px 0px 16px #2a2a2a;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: rotateMove 10s infinite linear;
            .music-img {
                width: 250px;
                border-radius: 100%;
            }
        }
        &.paused {
            .play-bar {
                transform: rotate(-32deg);
            }
            .play-img-wrap {
                animation-play-state: paused;
            }
        }
    }
    .right-lyric-wrap {
        float: right;
        width: 390px;
        height: 100%;
        padding-left: 20px;
        padding-top: 20px;
        .songname {
            font-size: 30px;
            margin-bottom: 10px;
        }
        .artist {
            font-size: 16px;
        }
        .lyrics-wrap {
            width: 360px;
            height: 400px;
            margin-top: 16px;
            overflow: auto;
            &.hide::-webkit-scrollbar {
                display: none;
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgb(238, 255, 0);
                border-radius: 6px;
            }
            &::-webkit-scrollbar-track {
                background-color: #555;
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 6px;
            }
            .lyrics-item {
                color: chocolate;
                padding: 10px 0;
                opacity: 0.5;
                &.active {
                    color: coral;
                    font-size: 20px;
                    opacity: 1;
                }
            }
        }
    }
}
</style>