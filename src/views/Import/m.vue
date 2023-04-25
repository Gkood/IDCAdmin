<template>
    <div>
        <vxe-table
                border
                resizable
                show-overflow
                ref="xTable"
                :loading="loading"
                :data="tableData"
                :edit-config="{trigger: 'manual', mode: 'row'}">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" :title="$t('10002')" :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-input v-model="row.name" type="text"></vxe-input>
                </template>
            </vxe-column>
            <vxe-column field="role" title="Role" :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-input v-model="row.role" type="text" placeholder="请输入昵称"></vxe-input>
                </template>
            </vxe-column>
            <vxe-column field="sex" title="Sex" :edit-render="{}">
                <template #default="{ row }">
                    <span>{{ formatSex(row.sex) }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.sex" transfer>
                        <vxe-option v-for="item in sexList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column title="操作" width="160">
                <template #default="{ row }">
                    <template v-if="$refs.xTable.isActiveByRow(row)">
                        <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
                        <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
                    </template>
                    <template v-else>
                        <vxe-button @click="editRowEvent(row)">编辑</vxe-button>
                    </template>
                </template>
            </vxe-column>
        </vxe-table>
    </div>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, reactive,watch, computed, onMounted, nextTick} from 'vue';
    import VXETable from 'vxe-table'
    import {idc} from '@/api'
    import m from 'moment';
    import {useSys} from '@/stores/sys';

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    //全局状态管理器
    const sys = ref(useSys())

    //组件参数
    const header: any = {show: true, title: '10208'}
    const footer: any = {show: true}

    const loading = ref(false)
    const tableData:any = ref([
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
    ])

    const sexList = ref([
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' }
    ])

    function formatSex (value) {
        if (value === '1') {
            return '男'
        }
        if (value === '0') {
            return '女'
        }
        return ''
    }

    function editRowEvent (row:any) {
        const $table = self.$refs.xTable
        $table.setActiveRow(row)
    }
    function saveRowEvent () {
        const $table = self.$refs.xTable
        $table.clearActived().then(() => {
            self.loading = true
            setTimeout(() => {
                self.loading = false
                VXETable.modal.message({ content: '保存成功！', status: 'success' })
            }, 300)
        })
    }
    function cancelRowEvent (row) {
        const $table = self.$refs.xTable
        $table.clearActived().then(() => {
            // 还原行数据
            $table.revertData(row)
        })
    }

</script>

<style scoped lang="scss">

</style>
