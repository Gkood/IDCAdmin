<template>
    <el-drawer
            v-if="modalShow"
            :visible.sync="modalShow"
            v-bind="$attrs"
            v-on="$listeners"
            :title="$t(title)"
            :with-header="false"
            :size="size"
            :modal-append-to-body="false"
            :show-close="false"
            @close="close">
        <slot></slot>
    </el-drawer>
</template>

<script setup lang="ts">
    /**
     * 基础抽屉组件
     */
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick} from 'vue';
    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    const props = defineProps({
        title: {
            type: String,
            required: false,
            default: ''
        },
        size: {
            type: [Number,String],
            required: false,
            default: ''
        }
    })

    const emit = defineEmits(['on-close'])

    const modalShow = ref(false);

    async function close() {
        await emit('on-close')
        modalShow.value = false;
    }

    async function open() {
        modalShow.value = true;
    }

    defineExpose({
        open,
        close
    })

</script>

<style scoped
       lang="scss">
    ::v-deep .el-dialog {
        .el-dialog__header {
            padding: 0 20px;
            height: 36px;
            border-bottom: 1px solid $bd;
            display: flex;
            align-items: center;

            .el-dialog__title {
                color: $grey-dark;
                font-size: 14px;
            }

            .el-dialog__headerbtn {
                top: 12px;
            }
        }

        .el-dialog__body {
            padding: 20px;
        }

        .el-dialog__footer {
            padding: 10px 20px;
            text-align: right;
            box-sizing: border-box;
        }

    }
</style>
