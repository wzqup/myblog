<template>
    <div class="hotsinger-page">
        <!-- 热门歌手列表 -->
        <div class="singer-wrap">
            <div
                class="singer"
                v-for="singer in singers"
                :key="singer.id"
                @click="getSingerHotSongs(singer.id)"
            >
                <img :src="singer.picUrl + `?param=200y200`" alt="" />
                <p>{{ singer.name }}</p>
            </div>
        </div>
        <!-- 歌手信息和歌曲 -->
        <transition name="up">
            <div class="singer-detailed" v-show="showSongs">
                <div class="back" @click="back">
                    <i class="el-icon-back"></i>
                </div>
                <div class="singerInfo-wrap">
                    <div class="singerImg">
                        <img
                            :src="singerInfo.picUrl + `?param=200y200`"
                            :alt="singerInfo.name"
                        />
                    </div>
                    <div class="singerInfo">
                        <h2>{{ singerInfo.name }}</h2>
                        <p>{{ singerInfo.briefDesc }}</p>
                    </div>
                </div>
                <div class="hotsongs">
                    <h3>热门歌曲 👍 </h3>
                    <List :listType="'singerHot'" :renderSongs= "singerHotSongs"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { musicRequest } from "@/utils/axios";
import List from "./musicList";

export default {
    components: {
        List,
    },
    data() {
        return {
            singers: [],
            showSongs: false,
            singerImg: "",
			singerInfo: {},
			singerHotSongs: []
        };
    },
    created() {
        this.getHotSinger();
	},
    methods: {
        async getHotSinger() {
            let { artists } = await musicRequest(
                `/top/artists?offset=0&limit=32`
            );
            this.singers = artists;
        },
        async getSingerHotSongs(id) {
            // 获取该歌手热门歌曲
            let { artist, hotSongs } = await musicRequest(`/artists?id=${id}`);
            this.singerInfo = artist;
            this.singerImg = artist.img1v1Url;
            this.singerHotSongs = hotSongs.map((song) => {
                const {
                    id,
                    name,
                    ar:artists,
                    dt:duration,
                    mvid,
                    al: { picUrl, name: albumName },
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
			// 显示
            this.showSongs = true;
        },
        back() {
            this.showSongs = false;
        },
    },
};
</script>

<style lang="scss">
@import "./cssaa.scss";
</style>