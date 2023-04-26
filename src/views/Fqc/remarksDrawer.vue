<template>
    <idc-drawer ref="idcDrawer"
                :size="300"
                @on-close="close">
        <div class="remarksDrawer">
            <div class="z-t">{{$t('10029')}}</div>
            <div class="z-b">
                <el-input
                        type="textarea"
                        :rows="10"
                        :placeholder="$t('10300')"
                        v-model="textarea">
                </el-input>
            </div>
            <div class="z-f">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="info" @click="toCancel">取消</el-button>
            </div>
        </div>
    </idc-drawer>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick} from 'vue';
    import {idc} from "@/api";

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    const emit = defineEmits(['save'])

    const textarea = ref('')

    async function open(obj: any) {
        await self.$refs.idcDrawer.open();
    }

    async function save() {
        await emit('save',{textarea:textarea.value});
        await self.$refs.idcDrawer.close()
    }

    async function toCancel(){
        await self.$refs.idcDrawer.close()
    }

    async function close() {
        textarea.value = '';
    }

    defineExpose({
        save,
        open
    })

</script>

<style scoped
       lang="scss">
    .remarksDrawer {
        height: 100%;
        padding: 10px;
        .z-t {
            font-size: 30px;
            font-weight: bold;
            text-align: center;
        }

        .z-b {
            height: calc(100% - 100px);

            ::v-deep .el-form-item {

                .el-form-item__content {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .el-input {
                        width: 160px;
                    }

                    .el-color-picker__mask {
                        background-color: transparent;
                    }
                }
            }
        }
        .z-f{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
