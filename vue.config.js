const path = require('path');

module.exports = {
	publicPath: './',
	productionSourceMap: false,
	css: {
		loaderOptions: {
			sass: {
				prependData: `
			  @import "@/style/variables.scss";
			  @import "@/style/mixin.scss";
			`,
			},
		},
	},
	configureWebpack: {
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.esm.js'
			}
		}
	}
}