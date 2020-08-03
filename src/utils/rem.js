export const remBase = 16 // 默认1rem = 16px;

let htmlFontSize
;(function () {
	const calc = function () {
		const maxFontSize = 18
		const minFontSize = 12
		// 视口宽度
		const html = document.getElementsByTagName('html')[0]
		const width = html.clientWidth
		// 相对于设计图 rem 大小
		let size = remBase * (width / 1920) // 1920 设计图大小
		// 限制rem最小值和最大值
		size = Math.min(maxFontSize, size)
		size = Math.max(minFontSize, size)
		html.style.fontSize = size + 'px'
		htmlFontSize = size
	}
	calc()
	window.addEventListener('resize', calc);
})()