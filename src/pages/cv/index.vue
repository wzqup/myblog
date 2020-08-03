<template>
    <div class="cv-page">
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
                title: "我的简历",
                tip: "完整版PDF简历，请在右边下载"
            }
        };
    }
};
</script>