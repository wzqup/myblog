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
                tip: ""
            }
        };
    }
};
</script>