<template>
    <div class="titleBar">
        <div class="content">
			<div class="left">
				<h3>{{title}}</h3>
				<p>{{smTitle}}</p>
			</div>
			<div class="right">
			</div>
		</div>
    </div>
</template>

<script>
export default {
	props:{
		titleStr:Object
	},
	data(){
		return {
			title:this.titleStr.title,
			smTitle:this.titleStr.tip || ''
		}
	}
};
</script>

<style lang="scss">
.titleBar {
    width: 100%;
    height: 280px;
    background-image: url("../assets/img/hbi.webp");
    background-color: #000;
	box-shadow: 0 2px 5px #000;
	@include flex-center;
    .content {
		@include content(1150px,182px,transparent,0px);
		box-sizing: border-box;
		border-bottom: 3px solid #ae63e4;
		h3{
			font-size: 56px;
			color: #fff;
		}
		p {
			font-size: 16px;
			color: #9b9dad;
			margin-top: 10px;
		}
    }
}
</style>