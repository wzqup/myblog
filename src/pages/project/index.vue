<template>
    <div>
        <TopBar :titleStr = "titleStr"/>
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