<template>
    <idc-open title="10204"
              ref="idcOpen"
              @on-save="save"
              @on-close="close">
        <el-form ref="form"
                 :model="formData">
            <el-form-item :label="$t('10295')">
                <el-input ref="personNumber"
                          v-model="formData.personNumber"
                          @input="selectName"></el-input>
            </el-form-item>
            <el-form-item :label="$t('10296')">
                <el-input v-model="formData.personName" disabled></el-input>
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
        personNumber: '',
        personName: ''
    })

    async function open() {
        await self.$refs.idcOpen.open()
        await self.$refs.personNumber.focus();
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
            personNumber: '',
            personName: ''
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
