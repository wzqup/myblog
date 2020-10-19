<template>
    <div class="audioBar">
        <!-- 歌曲信息 -->
        <div class="songs"  v-show="showControl">
            <div
                class="img-wrap"
                v-show="currentSong.name"
                v-loading="leftLoading"
                element-loading-background="rgba(0, 0, 0, 0.2)"
            >
                <img :src="currentSong.img+`?param=120y120`"/>
            </div>
			<div class="showLyricsIcon" @click="showLyricHandle">
				<div class="top"><i :class="`el-icon-arrow-${showLyrics ? 'down':'up'}`"></i></div>
				<div class="bottom"><i :class="`el-icon-arrow-${showLyrics ? 'up':'down'}`"></i></div>
			</div>
            <div class="str" v-show="currentSong.name">
                <p>{{ currentSong.name }}</p>
                <p>
                    {{ this.formatTime(currentMusicTime) }}/{{
                        this.formatTime(currentSong.duration / 1000)
                    }}
                </p>
            </div>
        </div>
        <!-- 控制器 -->
        <div class="control" v-show="showControl">
            <div class="btn-wrap">
                <div class="pre" @click="prev">
                    <i class="iconfont icon-back"></i>
                </div>
                <div class="play" @click="playOrpause('hanlde')">
                    <i
                        class="iconfont"
                        :class="playing ? 'icon-iconstop' : 'icon-bofang'"
                    ></i>
                </div>
                <div class="next" @click="next">
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
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { musicRequest } from "@/utils/axios";

export default {
    /**
     * 需要从vuex中获取的数据
     * 当前歌曲信息 --> currentSong
     */
    data() {
        return {
            // 左下侧图标loading
            leftLoading: false,
            // 已播放时间
            currentMusicTime: "00",
            // 歌曲路径
            musicUrl: "",
            // 歌曲是否可以播放
            songReady: false,
            // 显示控制器
            showControl: false,
        };
    },
    computed: {
        audio() {
            return this.$refs.audio;
        },
        ...mapState(["currentSong", "playing", "songList","preSongId","showLyrics"]),
    },
    watch: {
        // 监听当前歌曲是否发生变化 若变化 更新url 并播放
        currentSong(newSong) {
            if (newSong) {
                this.getMusicURL(newSong.id);
                this.showControl = true;
            }
        },
        playing(newPlaying, oldPlaying) {
            newPlaying ? this.play() : this.pause();
        },
    },
    methods: {
		// 显示歌词
		showLyricHandle(){
			if (this.leftLoading) return;
			this.setShowLyrics(!this.showLyrics);
			// this.$emit('showLyric',true)
		},
        // 播放器事件
        ready() {
            // 加载动画结束...
            this.leftLoading = false;
            this.songsReady = true;
            // 播放
            this.setPlaying(true);
        },
        end() {
            this.next();
        },
        updateTime(e) {
			this.currentMusicTime = e.target.currentTime;
			this.setPlaytime(this.currentMusicTime);
        },
        play() {
            if (this.musicUrl == "") {
                return this.$msg({ text: "该歌曲无法播放,换一首试试吧!", el:this.$el});
            }
            if (this.songsReady) {
                this.audio.play();
            } else {
                this.$msg({ text: "别点那么着急嘛,给我点时间加载." ,el:this.$el});
			}
        },
        pause() {
            this.audio.pause();
        },
        // 自定义控件事件
        playOrpause(tag) {
            this.setPlaying(!this.playing);
        },
        next() {
            // 获取当前歌曲在播放列表中的位置
            let index = this.getIndex();
            // 如果还有下一首 设置为列表的下一首
            if (index < this.songList.length - 1) {
                this.setCurrentSong(this.songList[index + 1]);
                this.setPlaying(false);
            } else {
                return this.$msg({ text: "人家也是有底线的呢" ,el:this.$el});
            }
        },
        prev() {
            // 获取当前歌曲在播放列表中的位置
            let index = this.getIndex();
            // 如果还有下一首 设置为列表的下一首
            if (index > 0) {
                this.setCurrentSong(this.songList[index - 1]);
                this.setPlaying(false);
            } else {
                return this.$msg({ text: "已经是第一首了呢!" ,el:this.$el});
            }
        },
        // 获取当前歌曲的index
        getIndex() {
            return this.songList.findIndex(
                (song) => song.id === this.currentSong.id
            );
        },
        // 通过ID 获取当前播放歌曲
        async getMusicURL(id) {
            let { data } = await musicRequest(`/song/url?id=${id}`);
			let musicUrl = data[0].url;
			if (!musicUrl) {
				                // 清空播放路径
                this.musicUrl = "";
                this.$msg({
					text: "该歌曲无法播放,换一首试试吧!",
					el:this.$el
                });
			}
            if (musicUrl != this.musicUrl) {
				this.musicUrl = musicUrl;
				// 加载动画
				this.leftLoading = true;
				this.songsReady = false;
            } else {
				this.$msg({text:'和正在播放的歌曲是同一首,以为您切换到当前列表继续播放!',el:this.$el})
				this.setPlaying(!this.playing);
			}

        },
        ...mapMutations(["setPlaying", "setCurrentSong","setShowLyrics","setPlaytime"]),
        // 时间格式
        formatTime(interval) {
            interval = interval | 0; // 浮点数赋值给变量不足1的会自动去掉
            const minute = this.pad((interval / 60) | 0);
            const second = this.pad(interval % 60);
            return `${minute}:${second}`;
        },
        formatTimeTable(row, column, cellValue, index) {
            return this.formatTime(cellValue / 1000);
        },
        pad(num, n = 2) {
            let len = num.toString().length;
            while (len < n) {
                num = "0" + num;
                len++;
            }
            return num;
        },
    },
};
</script>

<style lang="scss">
</style>