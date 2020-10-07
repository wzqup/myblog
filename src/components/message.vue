<template>
    <div class="mydialog" v-show="closed">
        <div class="content">
            <i class="el-icon-warning-outline"></i>
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: "",
            closed: false,
        };
    },
    methods: {
        startTimer() {
            this.timer = setTimeout(() => {
                if (this.closed) {
                    this.close();
                }
            }, 3000);
        },
        close() {
            this.closed = false;
        },
    },
    mounted() {
        // 开始计时
        this.startTimer();
    },
};
</script>

<style lang="scss">
@keyframes toastMove {
    0% {
        top: 10%;
        opacity: 0;
    }
    100% {
        top: 16%;
        opacity: 1;
    }
}
.mydialog {
    padding: 16px;
    position: absolute;
    top: 16%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    border: 2px solid #0a19a6;
    font-size: 16px;
    opacity: 1;
    i {
        color: rgb(255, 0, 0);
        margin-right: 10px;
    }
	.content{
		color: #333;
	}
    animation: toastMove 1s;
}
</style>