<template>
    <idc-open title="10148"
              ref="idcOpen"
              width="80%"
              hideSave>
        <div class="openDrawing">
            <div class="t-dt">
                <el-link type="primary"
                         v-for="(item,i) in allUrl"
                         :key="i"
                         class="mr10"
                         @click="drawing(item)">{{item.名称 }}
                </el-link>
            </div>
            <iframe :src="urls" class="t-dp"></iframe>
        </div>
    </idc-open>
</template>

<script setup lang="ts">
    /**
     * 基础弹窗组件
     */
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick} from 'vue';
    import {idc} from "@/api";

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;
    const allUrl:any = ref([])
    const urls = ref('');

    async function pdf(row:any) {
        idc.getpdfurl2upload_post({
            workno: row.工单号,
            materialno1: row.料件编号,
            materialno2: row.副料号
        }).then((data: any) => {
            allUrl.value = data.state.text
        })
    }

    function drawing(item:any){
        urls.value = item.url
    }

    async function open(row:any) {
        await self.$refs.idcOpen.open()
        await pdf(row);
    }

    defineExpose({
        open
    })

</script>

<style scoped
       lang="scss">
    .openDrawing{
        width: 100%;
        height: 376px;
        display: flex;
        flex-direction: column;
        .t-dt{
            height: 32px;
            font-size: 20px;
            text-align: center;
        }
        .t-dp{
            width: 100%;
            flex: 1;
            border: 0;
        }

    }
</style>
