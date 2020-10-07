<template>
    <div>
        <TopBar :titleStr="titleStr" :colorClass = "'two'" />
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
                title: "关于我",
                tip: "",
            },
        };
    }
};
</script>