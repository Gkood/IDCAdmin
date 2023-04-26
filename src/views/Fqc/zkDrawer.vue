<template>
    <idc-drawer ref="idcDrawer"
                :size="300"
                @on-close="close">
        <div class="zkDrawer">
            <div class="z-t">{{$t('10298')}}：{{firstNumber}}~{{finalNumber}}</div>
            <el-form ref="form" label-width="80px" class="z-b scrollBar">
                <el-form-item v-for="(item,idx) in xxx"
                              :label="$t('10299')+item.value+':'"
                              :key="item.value">
                    <el-input ref="actqty" v-model="item.label"
                              @input="changeColor(item)"></el-input>
                    <el-color-picker v-model="item.color"
                                     disabled
                                     class="ml10"
                                     size="small"></el-color-picker>
                </el-form-item>
            </el-form>
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

    const xxx: any = ref([])
    const nowSite:any = ref();
    const firstNumber: any = ref();
    const finalNumber: any = ref();

    async function open(obj: any, first: any, final: any) {
        await self.$refs.idcDrawer.open();
        firstNumber.value = first;
        finalNumber.value = final;
        nowSite.value = obj.序号 - 1
        for (let i = 1; i < obj.检验量 + 1; i++) {
            xxx.value.push({value: i, label: '', color: ''})
        }
    }

    function changeColor(item: any) {
        if (parseInt(item.label) >= parseInt(firstNumber.value) && parseInt(item.label) <= parseInt(finalNumber.value)) {
            item.color = '#67C23A'
        } else {
            item.color = '#F56C6C'
        }
    }

    async function save() {
        let site = parseInt(nowSite.value) + 1;
        let detail = ''
        let number = 0
        for (let i = 0; i < xxx.value.length; i++) {
            detail = detail + "项目" + (i + 1).toString() + ":" + xxx.value[i].label + ";"
            if (xxx.value[i].color == "#F56C6C") {
                number = number + 1
            }
        }

        await emit('save', {nowSite:nowSite.value,number:number,site:site,detail:detail});
        await self.$refs.idcDrawer.close()
    }

    async function toCancel(){
        await self.$refs.idcDrawer.close()
    }

    async function close() {
        xxx.value = []
        self.$refs.form.resetFields();
    }

    defineExpose({
        save,
        open
    })

</script>

<style scoped
       lang="scss">
    .zkDrawer {
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
