<template>
    <div :class="['layout',footer.show?null:'nofooter']">
        <Header v-if="header.show" :header="header"/>
        <div class="layout-body">
            <div class="l-back" v-if="tool.show">
                <el-button icon="el-icon-back" v-if="tool.backShow" @click="back">{{$t('10060')}}</el-button>
                <div class="l-tool">
                    <Department v-if="tool.department.data.length" :department="tool.department"></Department>
                </div>
            </div>
            <div class="l-main">
                <slot></slot>
            </div>
        </div>
        <Footer v-if="footer.show"/>
    </div>
</template>

<script setup lang="ts">
    import Header from '@/layout/Header.vue'
    import Footer from '@/layout/Footer.vue'
    import Department from '@/layout/Department.vue'

    const props = defineProps({
        header: {
            type: Object,
            required: false,
            default: () => ({
                show: false,
                title: '',
                timer: false
            })
        },
        footer: {
            type: Object,
            required: false,
            default: () => ({
                show: false
            })
        },
        tool: {
            type: Object,
            required: false,
            default: () => ({
                show: false,
                backShow: true,
                department: {
                    data:[],
                    localField: ''
                }
            })
        }
    })

    const emit = defineEmits(['on-back'])

    function back() {
        emit('on-back')
    }
</script>

<style scoped lang="scss">
    .layout {
        width: 100%;
        height: 100%;

        &.nofooter {
            .layout-body {
                height: calc(100% - 50px);

                .l-main {

                }
            }
        }

        .layout-body {
            height: calc(100% - 95px);
            display: flex;
            flex-direction: column;

            .l-back {
                width: 100%;
                height: 36px;
                border-bottom: 1px solid $bd;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-right: 10px;

                .el-button {
                    border-radius: 0;
                    border: 0;
                }
            }

            .l-main {
                width: 100%;
                height: calc(100% - 36px);
                flex: 1;
            }
        }
    }
</style>
