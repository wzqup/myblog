import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 当前播放列表
		songList:[],
		// 当前播放歌曲
		currentSong: {},
		// 是否在播放中
		playing: false,
		// 当前所属tab type
		currentTab:'',
		// 最新歌曲列表数据
		newSongs:[],
		// 上一首歌曲ID
		preSongId:'',
		// 是否显示歌词页面
		showLyrics:false,
		// 歌曲播放时间
		playtime:''
	},
	mutations: {
		setCurrentSong(state, song) {
			state.currentSong = song
		},
		setSongList(state,list){
			state.songList = list
		},
		setPlaying(state,playing) {
			state.playing = playing
		},
		setCurrentTab(state,tab){
			state.currentTab = tab
		},
		setNewSongs(state,songs){
			state.newSongs = songs
		},
		setPreSongId(state,Id){
			state.preSongId = Id
		},
		setShowLyrics(state,show){
			state.showLyrics = show
		},
		setPlaytime(state,time){
			state.playtime = time
		}
	},
	actions:{

	}
})