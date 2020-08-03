<template>
    <div class="project-page">
        <TopBar :titleStr="titleStr" />
        <Details />
    </div>
</template>
<script>
import TopBar from "@/components/TitleBar";
import Details from "./Details";
export default {
    components: {
        TopBar,
        Details
    },
    data() {
        return {
            titleStr: {
                title: "项目经历",
                tip: "部分工作所经历的项目"
            }
        };
    }
};
</script>

<style lang="scss" scoped>
@keyframes bgmove {
    0% {
        background-position-y: 0px, 0%;
    }
    100% {
        background-position-y: -1085px, 0%;
    }
}
.project-page{
	position: relative;
}
.project-page::before{
	content: '';
	@include abs-stretch;
	background: url("../../assets/img/bg.png") $mainColor;
	animation: bgmove 40s infinite linear;
}
</style>