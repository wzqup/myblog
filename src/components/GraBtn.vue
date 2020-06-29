<template>
    <div class="gra-btn gra-btn-border">
        <span><slot></slot></span>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.gra-btn-border{
	padding: 3px;
}
.gra-btn{
    box-sizing: border-box;
    text-align: center;
    color: white;
	font-weight: 700;
	margin-right: 15px;
	cursor: pointer;
    @include bgColor;
    border-radius: 6px;
    z-index: 2;
    &:hover {
        @include bgAnm;
    }
    span {
		display: block;
        background: #131417;
        border-radius: 6px;
		box-sizing: border-box;
		padding: 8px 12px;
		font-size: 16px;
		letter-spacing: 4px;
    }
}
</style>