<template>
    <div class="project-page">
        <TopBar :titleStr="titleStr"  :colorClass = "'three'" />
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
                title: "项目经验",
                tip: "部分工作所参与的项目(最近的四个)"
            }
        };
    }
};
</script>

<style lang="scss" scoped>
</style>