<template>
    <div class="music-list" v-loading="listLoading">
        <el-table
            :data="renderSongList"
            style="width: 100%"
            :show-header="!renderSongs"
        >
            <el-table-column prop="img" :width="100">
                <template slot-scope="scope">
                    <img
                        v-lazy="scope.row.img + `?param=120y120`"
                        :key="scope.row.img"
                        width="66px"
                        height="66px"
                        @click="
                            seletSong({ id: scope.row.id, index: scope.$index })
                        "
                        style="cursor: pointer"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="name"></el-table-column>
            <el-table-column
                prop="artists[0].name"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="duration"
                :formatter="formatTimeTable"
                align="center"
                header-align="right"
            >
                <template #header v-if="!renderSongs">
                    <ul class="music-type">
                        <li
                            v-for="item in musicType"
                            :key="item.type"
                            @click="tabChange(item.type)"
                            :class="{ active: item.type === type }"
                            style="cursor: pointer"
                        >
                            {{ item.title }}
                        </li>
                    </ul>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { musicRequest } from "@/utils/axios";
import { mapMutations, mapState } from "vuex";

export default {
    props: { renderSongs: Array },
    data() {
        return {
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
            //  列表loading
            listLoading: false,
            // 上一首歌曲
            oldSongId: null,
            // 当前渲染的歌曲列表
            renderSongList: [],
        };
    },
    computed: {
        ...mapState([
            "songList",
            "playing",
            "newSongs",
            "currentTab",
            "preSongId",
        ]),
        currentRenderSongs() {
            return this.renderSongs;
        },
        currentNewSongs() {
            return this.newSongs;
        },
    },
    watch: {
        // 监听传入数组是否发生变化(singerHot、search)
        currentRenderSongs(newSongsList) {
            this.renderSongList = newSongsList;
        },
        // 监听最新歌曲列表数组是否发生变化
        currentNewSongs(newSongsList) {
            this.renderSongList = newSongsList;
        },
        // 切换tab
        currentTab(newTab) {
            if (newTab === "new") {
                this.renderSongList = this.currentNewSongs; // 从store中取出已获取的最新歌曲的数据
            } else {
                this.renderSongList = this.currentRenderSongs;
            }
        },
    },
    async mounted() {
        // 第一次渲染时从接口或者传入的数组获取歌曲列表
        if (!this.renderSongs) {
            await this.getMusicList(this.type);
            this.renderSongList = this.newSongs;
        } else {
            this.renderSongList = this.renderSongs;
        }
    },
    methods: {
        // 歌曲分类
        async tabChange(type) {
            if (this.type !== type) {
                this.type = type;
                await this.getMusicList(type);
            }
        },
        // 获取最新歌曲列表
        async getMusicList(type) {
            this.listLoading = true;
            let { data } = await musicRequest(`top/song?type=${type}`);
            this.listLoading = false;
            let songs = data.map((song) => {
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
            // 设置渲染的歌曲
            this.setNewSongs(songs);
        },
        // 点击列表图片
        seletSong(songInfo) {
            if (this.songList.toString() === this.renderSongList.toString()) {
                // 相同播放列表
                let oldId = this.preSongId;
                // 非重复点击当前播放歌曲图片
                if (!oldId || oldId !== this.songList[songInfo.index].id) {
                    this.setCurrentSong(this.songList[songInfo.index]);
                    this.setPlaying(false);
                    this.setPreSongId(this.songList[songInfo.index].id);
                } else {
                    // 重复点击当前播放歌曲的图片
                    this.setPlaying(!this.playing);
                }
            } else {
                // 不同播放列表
                // 重置歌曲播放列表
                this.setSongList(this.renderSongList);
                // 切歌
                this.setCurrentSong(this.songList[songInfo.index]);
                // 修改播放状态
                this.setPlaying(false);
                // 记录当前播放歌曲id
                this.setPreSongId(this.songList[songInfo.index].id);
            }
        },
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
        // vuex
        ...mapMutations([
            "setCurrentSong",
            "setSongList",
            "setPlaying",
            "setNewSongs",
            "setPreSongId",
        ]),
    },
};
</script>

<style lang="scss">
</style>