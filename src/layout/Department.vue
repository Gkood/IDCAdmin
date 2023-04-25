<template>
    <div class="l-department">
        <div class="l-c mr10">
            <label class="mr10">{{$t('10179')}}</label>
            <el-select v-model="weizhi"
                       :placeholder="$t('10175')"
                       :disabled="isLock"
                       @change="storagelocal">
                <el-option
                        v-for="item in options_weizhi"
                        :key="item.value"
                        :label="$t(item.label)"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="l-r">
            <el-switch
                    v-model="isLock"
                    :active-text="$t('10063')"
                    :inactive-text="$t('10062')"
                    active-color="red">
            </el-switch>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {onMounted, reactive, ref, toRefs} from 'vue';
    import i18n from '../lang'
    import {useSys} from '@/stores/sys';

    const props = defineProps({
        department:{
            type: Object,
            required: true,
            default: {
                data:[],
                localField:''
            }
        }
    })

    const sys = useSys()
    const weizhi = ref()
    const isLock = ref(true)

    //科室选项
    const options_weizhi: any = props.department.data
    //选择科室
    function storagelocal() {
        localStorage.setItem(props.department.localField, weizhi.value);
    }
    //读取本地科室
    function getLocal() {
        weizhi.value = localStorage.getItem(props.department.localField);
    }

    onMounted(()=>{
        getLocal();
    })

</script>

<style scoped lang="scss">
    .l-department {
        display: flex;
        flex-direction: row;
        .l-c {

        }
        .l-r{
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>

