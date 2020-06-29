/* eslint-disable */
// 基准大小
const baseSize = 14
// 设置 rem 函数
function setRem() {
	const maxFontSize = 16
	const minFontSize = 12
	const html = document.getElementsByTagName('html')[0]
	const width = html.clientWidth
	let size = baseSize * (width / 1920)
	size = Math.min(maxFontSize, size)
	size = Math.max(minFontSize, size)
	html.style.fontSize = size + 'px'
	htmlFontSize = size
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
	setRem()
};