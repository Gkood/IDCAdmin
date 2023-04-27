<template>
    <idc-open title="10204"
              ref="idcOpen"
              @on-save="save"
              @on-close="close">
        <el-form ref="form"
                 :model="formData">
            <el-form-item :label="$t('10309')">
                <el-input ref="batch"
                          v-model="formData.batch"></el-input>
            </el-form-item>
        </el-form>
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

    const emit = defineEmits(['save'])

    const formData: any = ref({
        batch: ''
    })

    const submitText = ref('')

    async function open(obj:any) {
        await self.$refs.idcOpen.open()
        await self.$refs.batch.focus();
        submitText.value = obj.submitText
    }

    function selectName(obj:any){
        idc.nameSelect_post({
            field: obj
        }).then((data: any) => {
            formData.value.personName = data.state.msg[0].name
        })
    }

    async function save() {
        await emit('save', formData.value);
        await self.$refs.idcOpen.close()
    }

    async function close() {
        formData.value = {
            personNumber: ''
        }
        self.$refs.form.resetFields();
    }

    defineExpose({
        save,
        open
    })

</script>

<style scoped
       lang="scss">

</style>
