<template>
    <idc-open ref="idcOpen"
              saveText="10245"
              hideClose
              @on-save="save"
              @on-close="close">
        <el-form ref="form"
                 :model="formData">
            <el-form-item :label="$t('10244')"
                          prop="inspectionNumber"
                          :rules="{required: true, message: $t('10155'), trigger: 'blur'}">
                <el-input ref="inspectionNumber"
                          v-model="formData.inspectionNumber"
                          :placeholder="$t('10154')"></el-input>
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
        inspectionNumber: ''
    })

    const tableData1:any = ref();

    async function open(obj:any) {
        tableData1.value = obj;
        await self.$refs.idcOpen.open()
        await self.$refs.inspectionNumber.focus();
    }

    async function save() {
        self.$refs.form.validate(async (valid:any) => {
            if (valid) {
                if (parseInt(formData.value.inspectionNumber) > (tableData1.value[0].本周完工数 - tableData1.value[0].已报验量)) {
                    return self.$message({
                        message: self.$t('10246'),
                        type: 'danger'
                    })
                }
                await emit('save', formData.value);
                await self.$refs.idcOpen.close()
            } else {
                return false;
            }
        });
    }

    async function close() {
        formData.value = {
            inspectionNumber: '',
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
