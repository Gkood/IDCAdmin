<template>
    <div :class="['layout',footer.show?null:'nofooter']">
        <Header v-if="header.show" :header="header"/>
        <div class="layout-body">
            <slot></slot>
        </div>
        <Footer v-if="footer.show"/>
    </div>
</template>

<script setup lang="ts">
    import Header from '@/layout/Header.vue'
    import Footer from '@/layout/Footer.vue'

    const props = defineProps({
        header: {
            type: Object,
            required: false,
            default: () => ({
                show: false,
                title: '',
                timer:false
            })
        },
        footer: {
            type: Object,
            required: false,
            default: () => ({
                show: false
            })
        }
    })
</script>

<style scoped lang="scss">
    .layout {
        width: 100%;
        height: 100vh;
        max-height: calc(100vh - 95px);
        &.nofooter{
            max-height: calc(100vh - 50px);
        }

        .layout-body {
            height: 100%;
        }
    }
</style>
