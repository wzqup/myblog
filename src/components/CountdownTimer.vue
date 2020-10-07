<template>
    <div class="countdown-page">
        <h1>New Years Eve </h1>
        <div class="countdown-container">
            <div class="countdown-el days-c">
                <p class="big-text">{{days}}</p>
                <span>days</span>
            </div>
            <div class="countdown-el hours-c">
                <p class="big-text">{{hours}}</p>
                <span>hours</span>
            </div>
            <div class="countdown-el mins-c">
                <p class="big-text">{{mins}}</p>
                <span>mins</span>
            </div>
            <div class="countdown-el seconds-c">
                <p class="big-text">{{seconds}}</p>
                <span>seconds</span>
            </div>
        </div>
        <p class="tips">尚未完成，敬请期待😄</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            days: 0,
            hours: 0,
            mins: 0,
            seconds: 0,
        };
    },
    created() {
        this.countdown();
        this.timer = setInterval(this.countdown, 1000);
    },
    methods: {
        countdown() {
            const newYearsDate = new Date("1 Jan 2021");
            const currentDate = new Date();

            const totalSeconds = (newYearsDate - currentDate) / 1000;

            const days = Math.floor(totalSeconds / 3600 / 24);
            const hours = Math.floor(totalSeconds / 3600) % 24;
            const mins = Math.floor(totalSeconds / 60) % 60;
            const seconds = Math.floor(totalSeconds) % 60;

            this.days = days;
            this.hours = this.formatTime(hours);
            this.mins = this.formatTime(mins);
            this.seconds = this.formatTime(seconds);
        },
        formatTime(time) {
            return time < 10 ? `0${time}` : time;
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>
<style lang="scss">
.countdown-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    font-family: "Poppins", sans-serif;
    margin: 0;
    h1 {
        font-weight: normal;
        font-size: 4rem;
        margin-top: 5rem;
    }
	.tips{
		margin-top: 50px;
		font-size: 30px;
		color: #ff2d51;
	}
}

.countdown-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.big-text {
    font-weight: bold;
    font-size: 6rem;
    line-height: 1;
    margin: 1rem 2rem;
}

.countdown-el {
    text-align: center;
}

.countdown-el span {
    font-size: 1.3rem;
}
</style>