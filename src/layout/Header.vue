<template>
    <div class="header">
        <div class="h-l">
            <div v-if="header.timer" class="mr10">{{time}}</div>
        </div>
        <div class="h-c">
            <img src="../assets/logo.png" height="32">
            <label class="title">{{$t(header.title)}}</label>
        </div>
        <div class="h-r">
            <LangSelect/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick, onUnmounted} from 'vue';
    import m from 'moment';
    import LangSelect from '@/layout/LangSelect.vue'
    const props = defineProps({
        header: {
            type: Object,
            required: false,
            default: () => ({
                show: false,
                title: '',
                timer:false
            })
        }
    })

    const time:any = ref(m().format('YYYY-MM-DD HH:mm:ss'));
    const loopTime:any = ref(null)

    function loop() {
        loopTime.value = setInterval(()=>{
            time.value = m().format('YYYY-MM-DD HH:mm:ss')
        },500)
    }

    onMounted(() => {
        loop();
    })

    onUnmounted(() => {
        clearInterval(loopTime.value);
        loopTime.value = null;
    })


</script>

<style scoped lang="scss">
    .header{
        width: 100%;
        padding: 6px 20px;
        background-color: $bg;
        border-bottom: 1px solid $bd;
        display: flex;
        align-items: center;
        justify-content: center;
        .h-l{
            flex: 1;
            font-size: 16px;
        }

        .h-c{
            display: flex;
            align-items: center;
            justify-content: center;
            .title{
                font-size: 20px;
                font-weight: bold;
                margin-left: 20px;
                letter-spacing: 5px;
            }
        }

        .h-r{
            flex: 1;
            text-align: right;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
        }
    }
</style>
