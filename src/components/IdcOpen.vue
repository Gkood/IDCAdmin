<template>
    <el-dialog
            v-if="modalShow"
            :visible.sync="modalShow"
            v-bind="$attrs"
            v-on="$listeners"
            :width="width"
            :title="$t(title)"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            @close="close">
        <slot></slot>
        <div slot="footer"
             v-if="!hideFoot"
             class="dialog-footer">
            <slot name="footer"></slot>
            <el-button type="primary"
                       v-show="hideSave!='true'&&hideSave!=1"
                       @click="save">{{ $t(saveText) }}
            </el-button>
            <el-button v-show="hideClose!='true'&&hideClose!=1"
                       class="close-btn"
                       @click="close">{{ $t(closeText) }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
    /**
     * 基础弹窗组件
     */
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick} from 'vue';
    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    const props = defineProps({
        saveText: {
            type: String,
            required: false,
            default: '10015'
        },
        closeText: {
            type: String,
            required: false,
            default: '10048'
        },
        hideSave: {
            type: Boolean,
            required: false,
            default: false
        },
        hideClose: {
            type: Boolean,
            required: false,
            default: false
        },
        hideFoot: {
            type: Boolean,
            required: false,
            default: false
        },
        width: {
            type: String,
            required: false,
            default: '400px'
        },
        title: {
            type: String,
            required: false,
            default: '10204'
        }
    })

    const emit = defineEmits(['on-save', 'on-close'])

    const modalShow = ref(false);

    async function save() {
        emit('on-save')
    }

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
