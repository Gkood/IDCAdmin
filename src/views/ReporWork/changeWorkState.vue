<template>
    <idc-open title="10243"
              ref="idcOpen"
              @on-save="save"
              @on-close="close">
        <el-form ref="form"
                 :model="formData">
            <el-form-item :label="$t('10138')">
                <el-input ref="actqty" v-model="formData.ACTQTY"></el-input>
            </el-form-item>
            <el-form-item :label="$t('10139')">
                <el-input v-model="formData.SCRAPQTY"></el-input>
            </el-form-item>
        </el-form>
    </idc-open>
</template>

<script setup lang="ts">
    /**
     * 基础弹窗组件
     */
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick} from 'vue';

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    const emit = defineEmits(['save'])

    const formData: any = ref({
        ACTQTY: '',
        SCRAPQTY: ''
    })

    async function open() {
        await self.$refs.idcOpen.open()
        await self.$refs.actqty.focus();
    }

    async function save() {
        await emit('save', formData.value);
        await self.$refs.idcOpen.close()
    }

    async function close() {
        formData.value = {
            ACTQTY: '',
            SCRAPQTY: ''
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
