<template>
    <div class="music-page">
        <div class="nav">
            <div class="tab">
                <span
                    :class="tabActive === 'new' ? 'active' : ''"
                    @click="changeCate('new')"
                    >最新歌曲</span
                >
                <span
                    :class="tabActive === 'hot' ? 'active' : ''"
                    @click="changeCate('hot')"
                    >热门歌手</span
                >
                <span
                    :class="tabActive === 'search' ? 'active' : ''"
                    v-show="seachHotSongs.length"
                    @click="changeCate('search')"
                    >搜索结果</span
                >
            </div>
            <div class="seach">
                <input
                    type="text"
                    placeholder="搜索"
                    @focus="showHot"
                    @blur="hideHot"
                    @keyup="userEnter"
                    v-model="searchKeyWord"
                />
                <i class="el-icon-search"></i>
            </div>
            <div class="hot" v-show="seachHot" ref="hotSearch">
                <div class="hotSeach">
                    <div class="boxtitle">
                        热搜榜<span>{{ hotSearchContent }}</span>
                    </div>
                    <div class="hotitem-wrap">
                        <div
                            class="item"
                            v-for="(hotitem, index) in searchHotDetail"
                            :key="hotitem.score"
                            @click="clickHotSearch(hotitem.searchWord)"
                            @mouseenter="hoverSearchKeyWord(hotitem.content)"
                            @mouseleave="checkInHot = false"
                        >
                            <span :alt="hotitem.content">{{
                                index + 1 + "." + hotitem.searchWord
                            }}</span>
                            <i
                                class="iconImg"
                                :class="
                                    hotitem.iconType === 5 ? 'iconType5' : ''
                                "
                                v-if="hotitem.iconUrl"
                                ><img :src="hotitem.iconUrl"
                            /></i>
                        </div>
                    </div>
                </div>
                <div class="searchWord">
                    <p
                        class="wordItem"
                        v-for="item in keyword"
                        :key="item.keyword"
                        @click="clickHotSearch(item.keyword)"
                        @mouseenter="checkInHot = true"
                        @mouseleave="checkInHot = false"
                    >
                        {{ item.keyword }}
                    </p>
                </div>
            </div>
        </div>
        <!-- 歌曲列表 -->
        <div class="viewBox" ref="musicListView">
            <MusicList v-show="tabActive === 'new'"></MusicList>
            <HotSinger v-show="tabActive === 'hot'"></HotSinger>
            <MusicList
                :renderSongs="seachHotSongs"
                v-show="tabActive === 'search'"
            ></MusicList>
        </div>
        <!-- 底部操作栏 -->
        <div class="footer" :class="showLyrics ? 'blackBgc' : ''">
            <AudioBar></AudioBar>
        </div>
        <keep-alive>
            <LyricsPage v-if="showLyrics"></LyricsPage>
        </keep-alive>
    </div>
</template>

<script>
import MusicList from "./components/musicList";
import AudioBar from "./components/audioBar";
import HotSinger from "./components/hotSinger";
import LyricsPage from "./components/lyricsPage";
import { musicRequest } from "@/utils/axios";
import { checkIn } from "@/utils/helper";
import { mapMutations, mapState } from "vuex";
export default {
    components: {
        MusicList,
        AudioBar,
        HotSinger,
        LyricsPage,
    },
    data() {
        return {
            seachHot: false,
            tabActive: "new",
            searchHotDetail: [],
            searchKeyWord: "",
            checkInHot: false,
            seachHotSongs: [],
            keyword: [],
            hotSearchContent: "",
        };
    },
    computed: {
        ...mapState(["showLyrics"]),
    },
    created() {
        // 设置默认tab状态
        this.setCurrentTab("new");
        // 重置歌词页显示状态
        this.setShowLyrics(false);
    },
    methods: {
        // 鼠标悬浮热搜榜
        hoverSearchKeyWord(content) {
            this.checkInHot = true;
            this.hotSearchContent = content;
        },
        async showHot() {
            // 调接口 获取热搜
            const { data } = await this.getHotSearch();
            this.searchHotDetail = data;
            // 显示热搜
            this.seachHot = true;
        },
        hideHot(e) {
            if (!this.checkInHot) this.seachHot = false;
        },
        changeCate(cate) {
            this.tabActive = cate;
            this.setCurrentTab(cate);
        },
        async userEnter() {
            // 获取当前字符串
            let userEnter = this.searchKeyWord;
            if (userEnter) {
                const {
                    result: { allMatch: word },
                } = await this.getSearchWord(userEnter);
                this.keyword = word;
            } else {
                this.keyword = [];
                this.seachHotSongs = [];
                this.tabActive = "new";
                this.setCurrentTab("new");
                this.hotSearchContent = "";
            }
        },
        async clickHotSearch(searchWord) {
            this.keyword = [];
            this.searchKeyWord = searchWord;
            // 获取搜索数据
            const {
                result: { songs: data },
            } = await this.getSearchSong(searchWord);

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
                    img: artists[0].img1v1Url,
                    mvId: mvid,
                };
            });
            // 修改状态
            this.seachHotSongs = songs;
            this.seachHot = false;
            this.tabActive = "search";
        },
        // 歌词
        // showLyricView(show){
        // 	console.log("showLyicView");
        // 	console.log(show);
        // 	this.showLyrics = show;
        // },
        //--------------------- 接口 -----------------------
        // 获取搜索歌曲数据
        getSearchSong(searchWord) {
            return musicRequest(`/search?keywords=${searchWord}`);
        },
        // 获取热搜榜
        getHotSearch() {
            return musicRequest("search/hot/detail");
        },
        // 获取搜索建议
        getSearchWord(keyword) {
            return musicRequest(
                `/search/suggest?keywords=${keyword}&type=mobile`
            );
        },
        ...mapMutations(["setCurrentTab", "setShowLyrics"]),
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
    position: relative;
    .nav {
        position: relative;
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
                cursor: pointer;
                &.active {
                    border-bottom: 2px solid springgreen;
                    color: #fff;
                }
            }
        }
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
            i {
                position: absolute;
                top: 9px;
                left: 8px;
                font-size: 14px;
            }
        }
        .hot {
            width: 100%;
            min-height: 200px;
            border-radius: 0 0 6px 6px;
            position: absolute;
            left: 0;
            top: 100%;
            z-index: 666;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 10px;
            display: flex;
            .hotSeach {
                width: 580px;
                .boxtitle {
                    font-size: 16px;
                    font-weight: bold;
                    padding-bottom: 6px;
                    border-bottom: 1px solid #ccc;
                    span {
                        margin-left: 10px;
                        font-size: 12px;
                        color: springgreen;
                    }
                }
                .hotitem-wrap {
                    width: 100%;
                    margin-top: 6px;
                    overflow: hidden;
                    background: url($baseUrl + "/ez.png") no-repeat 346px 81px;
                    background-size: 300px;
                    .item {
                        float: left;
                        margin-bottom: 8px;
                        height: 18px;
                        width: 50%;
                        &:hover {
                            cursor: pointer;
                            color: springgreen;
                            &::after {
                                content: "👈";
                                margin-left: 6px;
                            }
                        }
                        .iconImg {
                            width: 36px;
                            height: 18px;
                            display: inline-block;
                            margin-left: 6px;
                            vertical-align: middle;
                            &.iconType5 {
                                width: 12px;
                                height: 14px;
                            }
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .searchWord {
                flex: 1;
                padding: 0 6px 6px 6px;
                .wordItem {
                    margin-bottom: 10px;
                    &:hover {
                        color: springgreen;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .viewBox {
        display: flex;
        flex-direction: column;
        .music-list {
            flex: 9;
            background-color: #fff;
            overflow: auto;
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
            display: flex;
            .songs {
                flex: 1;
                position: relative;
                display: flex;
                align-items: center;
                .img-wrap {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    img {
                        width: 100%;
                    }
                }
                .showLyricsIcon {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    background-color: rgba(0, 0, 0, 0.5);
                    text-align: center;
                    div {
                        width: 100%;
                        height: 50%;
                        line-height: 25px;
                        color: #fff;
                        font-size: 26px;
                    }
                }
            }
            .control {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                .btn-wrap {
                    width: 158px;
                    height: 60px;
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
            }
        }
    }
    .nav,
    .footer {
        height: 60px;
        padding: 6px;
        background-color: slateblue;
        &.blackBgc {
            background-color: #252525;
        }
    }
    .viewBox {
        height: 480px;
    }
}
</style>