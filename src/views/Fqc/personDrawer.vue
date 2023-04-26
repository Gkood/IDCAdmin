<template>
    <idc-drawer ref="idcDrawer"
                :size="600"
                @on-close="close">
        <div class="personDrawer">
            <div class="z-t">{{$t('10301')}}</div>
            <div class="z-b">
                 <span v-for="item in overall" :key="item.number" style="margin:10px">
                          <el-row>
                            <el-col :span="2">
                              {{item.z.j.z.key}}
                            </el-col>
                            <el-col :span="7">
                              {{item.z.j.z.label}}
                            </el-col>
                            <el-col :span="7">
                              {{item.z.j.z.value}}
                            </el-col>
                            <el-col :span="6">
                              <el-input v-model="item.z.j.z.number" style="width:80%" maxlength="20" show-word-limit
                                        @input="changeColorTwo(item)"></el-input>
                            </el-col>
                            <el-col :span="2">
                               <el-color-picker v-model="item.z.j.z.color" disabled size="small"></el-color-picker>
                            </el-col>
                          </el-row>
                </span>
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

    const overall: any = ref([])
    const firstNumber: any = ref();
    const finalNumber: any = ref();

    async function open(obj: any, first: any, final: any) {
        await self.$refs.idcDrawer.open();
        overall.value = obj;
        firstNumber.value = first;
        finalNumber.value = final;
    }

    function changeColorTwo(item: any) {
        if (parseInt(item.z.j.z.number) >= parseInt(firstNumber.value) && parseInt(item.z.j.z.number) <= parseInt(finalNumber.value)) {
            item.z.j.z.color = '#67C23A'
        } else {
            item.z.j.z.color = '#F56C6C'
        }
    }

    async function save() {
        await emit('save', {overall: overall.value});
        await self.$refs.idcDrawer.close()
    }

    async function toCancel() {
        await self.$refs.idcDrawer.close()
    }

    async function close() {
        overall.value = []
    }

    defineExpose({
        save,
        open
    })

</script>

<style scoped
       lang="scss">
    .personDrawer {
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

        .z-f {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
