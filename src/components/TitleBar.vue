<template>
    <div class="titleBar">
        <div class="content" :class="colorC">
            <div class="left">
                <h3>{{title}}</h3>
                <p>{{smTitle}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
		titleStr: Object,
		colorClass: String
    },
    data() {
        return {
            title: this.titleStr.title,
			smTitle: this.titleStr.tip || "",
			colorC: this.colorClass || "one"
        };
    },
};
</script>

<style lang="scss">
.titleBar {
    width: 100%;
    height: 280px;
    @include flex-center;
    position: relative;
    z-index: 999;
    .content {
        position: relative;
        @include content(1150px, 182px, transparent, 0px);
        box-sizing: border-box;
        h3 {
            font-size: 56px;
            color: #fff;
        }
        p {
            font-size: 16px;
            color: #9b9dad;
            margin-top: 10px;
        }
        &.one {
            border-bottom: 4px solid #0ebeff;
        }
        &.two {
            border-bottom: 4px solid #ae63e4;
        }
        &.three {
           border-bottom: 4px solid #ffdd40;
        }
    }
}
@media screen and (max-width: 1024px) and(min-width: 414px) {
    .titleBar {
        .content {
            color: red;
            @include content(750px, 182px, transparent, 0px);
        }
    }
}
@media screen and (max-width: 414px) {
    .titleBar {
        .content {
            @include content(300px, 182px, transparent, 0px);
        }
    }
}
</style>