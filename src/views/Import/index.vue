<template>
    <Layout :header="header" :footer="footer">
        <div class="import">
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane :label="$t('10012')" name="0">
                    <div class="i-f-header">
                        <el-form ref="formF" :model="formImportF" inline>
                            <el-form-item :label="$t('10081')">
                                <el-select v-model="formImportF.dep_value"
                                           :placeholder="$t('10081')">
                                    <el-option v-for="item in deps"
                                               :key="item.value"
                                               :label="$t(item.label)"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('10005')">
                                <el-select v-model="formImportF.dep_date"
                                           :placeholder="$t('10005')">
                                    <el-option v-for="item in laterdeps"
                                               :key="item.value"
                                               :label="$t(item.label)"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="download">{{$t('10009')}}</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-upload
                                        class="upload-demo"
                                        name="file"
                                        drag
                                        accept=".XLS,.XLSX,.xlsx,.xls,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel"
                                        :action="uploadUrl"
                                        :disabled="!formImportF.dep_value"
                                        v-loading.fullscreen.lock="fullloading"
                                        :on-success="analysis">
                                    <el-button size="small" type="success" :disabled="!formImportF.dep_value">
                                        {{$t('10227')}}{{$t('10010')}}（{{$t('10228')}}）
                                    </el-button>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="i-f-body">
                        <vxe-table
                                border
                                ref="tableF"
                                height="100%"
                                :loading="loadingF"
                                :data="tableDataF">
                            <vxe-column field="customer" :title="$t('10221')"></vxe-column>
                            <vxe-column field="orderDate" :title="$t('10223')" width="60"></vxe-column>
                            <vxe-column field="work_order" :title="$t('10016')" width="60"></vxe-column>
                            <vxe-column field="part_number" :title="$t('10017')" width="60"></vxe-column>
                            <vxe-column field="one" :title="$t('10224')" width="60"></vxe-column>
                            <vxe-column field="one" :title="$t('10202')"></vxe-column>
                            <vxe-column field="name_specification" :title="$t('10019')"></vxe-column>
                            <vxe-column field="one" :title="$t('10020')"></vxe-column>
                            <vxe-column field="two" :title="$t('10021')" width="60"></vxe-column>
                            <vxe-column field="one" :title="$t('10022')" width="60"></vxe-column>
                            <vxe-column field="three" :title="$t('10023')"></vxe-column>
                            <vxe-column field="spare_parts" :title="$t('10225')"></vxe-column>
                            <vxe-column field="one" :title="$t('10024')" width="60"></vxe-column>
                            <vxe-column field="one" :title="$t('10025')" width="60"></vxe-column>
                            <vxe-column field="one" :title="$t('10026')"></vxe-column>
                            <vxe-column field="one" :title="$t('10027')" width="65"></vxe-column>
                            <vxe-column field="one" :title="$t('10028')" width="60"></vxe-column>
                            <vxe-column field="one" :title="$t('10029')"></vxe-column>
                            <vxe-column field="week_finash_amount" :title="$t('10030')"></vxe-column>
                            <vxe-column field="finash_rate" :title="$t('10031')"></vxe-column>
                            <vxe-colgroup :title="$t('10326')">
                                <vxe-colgroup :title="$t('10327')">
                                    <vxe-column field="one" :title="$t('10328')"></vxe-column>
                                    <vxe-column field="one" :title="$t('10329')"></vxe-column>
                                </vxe-colgroup>
                                <vxe-colgroup :title="m().weekday(1).format('YYYY/M/D')">
                                    <vxe-column field="one" :title="$t('10328')"></vxe-column>
                                    <vxe-column field="one" :title="$t('10329')"></vxe-column>
                                </vxe-colgroup>
                                <vxe-colgroup :title="m().weekday(2).format('YYYY/M/D')">
                                    <vxe-column field="one" :title="$t('10328')"></vxe-column>
                                    <vxe-column field="one" :title="$t('10329')"></vxe-column>
                                </vxe-colgroup>
                                <vxe-colgroup :title="m().weekday(3).format('YYYY/M/D')">
                                    <vxe-column field="one" :title="$t('10328')"></vxe-column>
                                    <vxe-column field="one" :title="$t('10329')"></vxe-column>
                                </vxe-colgroup>
                                <vxe-colgroup :title="m().weekday(4).format('YYYY/M/D')">
                                    <vxe-column field="one" :title="$t('10328')"></vxe-column>
                                    <vxe-column field="one" :title="$t('10329')"></vxe-column>
                                </vxe-colgroup>
                                <vxe-colgroup :title="m().weekday(5).format('YYYY/M/D')">
                                    <vxe-column field="one" :title="$t('10328')"></vxe-column>
                                    <vxe-column field="one" :title="$t('10329')"></vxe-column>
                                </vxe-colgroup>
                                <vxe-colgroup :title="m().weekday(6).format('YYYY/M/D')">
                                    <vxe-column field="one" :title="$t('10328')"></vxe-column>
                                    <vxe-column field="one" :title="$t('10329')"></vxe-column>
                                </vxe-colgroup>
                                <vxe-colgroup :title="m().weekday(7).format('YYYY/M/D')">
                                    <vxe-column field="one" :title="$t('10328')"></vxe-column>
                                    <vxe-column field="one" :title="$t('10329')"></vxe-column>
                                </vxe-colgroup>
                            </vxe-colgroup>
                        </vxe-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="$t('10013')" name="1">
                    <div class="i-s-header">
                        <el-form ref="formS" :model="formImportS" inline>
                            <el-form-item :label="$t('10034')"
                                          prop="date1"
                                          :rules="{
                                            required: true, message: '', trigger: 'change'
                                          }">
                                <el-date-picker
                                        v-model="formImportS.date1"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        :placeholder="$t('10173')"
                                        :picker-options="{
                                              disabledDate (time) {
                                                  let end = new Date(formImportS.date2).getTime();
                                                  return end?(time.getTime() > end):null
                                              }
                                            }">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item :label="$t('10035')"
                                          prop="date2"
                                          :rules="{
                                            required: true, message: '', trigger: 'change'
                                          }">
                                <el-date-picker
                                        v-model="formImportS.date2"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        :placeholder="$t('10174')"
                                        :picker-options="{
                                              disabledDate (time) {
                                                  let start = new Date(formImportS.date1).getTime() - 8.63e7;
                                                  return start?(time.getTime() < start):null
                                              }
                                            }">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item :label="$t('10036')">
                                <el-date-picker
                                        v-model="formImportS.date3"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        :placeholder="$t('10229')">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item :label="$t('10037')"
                                          prop="select"
                                          :rules="{
                                                required: true, message: '', trigger: 'change'
                                              }">
                                <el-select v-model="formImportS.select"
                                           :placeholder="$t('10175')">
                                    <el-option v-for="item in options"
                                               :key="item.value"
                                               :label="$t(item.label)"
                                               :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('10041')">
                                <el-input
                                        v-model="formImportS.inputgongdan"
                                        :placeholder="$t('10042')"
                                        clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchFor">{{$t('10043')}}</el-button>
                                <el-button type="success" @click='getAllOrder'>{{$t('10038')}}</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="i-s-body">
                        <vxe-table
                                border
                                ref="tableS"
                                height="100%"
                                keep-source
                                :scroll-y="{gt: 100}"
                                :loading="loadingS"
                                :data="tableDataS"
                                :edit-config="{trigger: 'manual', mode: 'row',autoClear:false}"
                                :row-class-name="rowClassNameS">
                            <vxe-column field="工单编号" width="100" :title="$t('10177')" :edit-render="{}" fixed="left">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.copy.工单编号copy" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="料件编号" width="100" :title="$t('10178')" :edit-render="{}" fixed="left">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.copy.料件编号copy" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="品名" min-width="100" :title="$t('10185')" :edit-render="{}" fixed="left">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.copy.品名copy" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="设备" width="100" :title="$t('10049')"></vxe-column>
                            <vxe-column field="工单数" width="90" :title="$t('10026')" :edit-render="{}">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.copy.工单数copy" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="已备料量" width="80" :title="$t('10025')" :edit-render="{}">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.copy.已备料量copy" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="本周计划数" width="80" :title="$t('10027')" :edit-render="{}">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.copy.本周计划数copy" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="完工日" width="80" :title="$t('10030')" :edit-render="{}">
                                <template #edit="{ row }">
                                    <el-date-picker
                                            v-model="row.copy.完工日copy"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            :clearable="false">
                                    </el-date-picker>
                                </template>
                            </vxe-column>
                            <vxe-column field="完工率" width="80" :title="$t('10230')" :edit-render="{}">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.copy.完工率copy" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column field="是否派工" width="80" :title="$t('10044')"></vxe-column>
                            <vxe-colgroup :title="$t('10032')">
                                <vxe-column v-for="(r,i) in array" :key="i"
                                            :field="r.field"
                                            :title="r.title"
                                            :formatter=formatter
                                            width="90">
                                </vxe-column>
                            </vxe-colgroup>
                            <vxe-column :title="$t('10231')"
                                        width="180"
                                        class-name="bgw"
                                        fixed="right">
                                <template #default="{ row }">
                                    <el-button-group>
                                        <el-button type="primary" size="mini"
                                                   @click="saveRowEvent(row)">{{$t('10015')}}
                                        </el-button>
                                        <el-button v-if="!$refs.tableS.isActiveByRow(row)" type="warning" size="mini"
                                                   @click="editRowEvent(row)">{{$t('10047')}}
                                        </el-button>
                                        <el-button v-if="$refs.tableS.isActiveByRow(row)" size="mini"
                                                   @click="cancelRowEvent(row)">{{$t('10048')}}
                                        </el-button>
                                        <el-popconfirm :title="$t('10015')+$t('10046')+'？'"
                                                       @confirm="delRowEvent(row)">
                                            <el-button type="danger"
                                                       size="mini"
                                                       slot="reference">{{$t('10046')}}
                                            </el-button>
                                        </el-popconfirm>
                                    </el-button-group>
                                </template>
                            </vxe-column>
                        </vxe-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </Layout>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, reactive, watch, computed, onMounted, nextTick} from 'vue';
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
    const header: any = {show: true, title: '10209',back:true}
    const footer: any = {show: false}

    //**导入模块
    const activeName = ref('0')
    const loadingF = ref(false)
    const formImportF: any = ref({
        dep_value: '',
        dep_date: ''
    })
    const laterdeps = ref([
        {value: "0", label: "10007"},
        {value: "1", label: "10008"}
    ])
    const fact = ref("嘉兴艾迪西暖通科技有限公司")
    const deps = ref([
        {value: "红冲科", label: '10196'},
        {value: "机加科", label: '10197'},
        {value: "总装科", label: '10198'},
    ])
    const fullloading = ref(false);
    const uploadUrl = ref(import.meta.env.VITE_PATH_8083 + '/capacity_arrange/uploadFile')

    //列表数据
    const tableDataF: any = ref([
        {
            customer: "...",
            orderDate: '...',
            work_order: "...",
            part_number: "...",
            name_specification: "...",
            spare_parts: "...",
            work_order_count: "...",
            arrange_amount: "...",
            week_amount: "...",
            week_finash_amount: "...",
            finash_rate: "...",
            one: '...',
            two: '...',
            three: '...'
        }])

    //下载模板
    function download() {
        window.location.href = 'http://192.168.80.52:8087/idc_moban/艾迪西-模板.xlsx'
    }

    //解析文件
    function analysis(file: any) {
        fullloading.value = true;
        if (formImportF.value.dep_date == '' || formImportF.value.dep_date == '1') {
            idc.importArrange_post({
                filename: file.state.name,
                fac: fact.value,
                dep: formImportF.value.dep_value,
            }).then(async (data: any) => {
                fullloading.value = false;
                if (data.state.code == "200") {
                    self.$notify({title: self.$t('10240'), message: self.$t('10234'), type: 'success'})
                } else {
                    self.$notify({title: self.$t('10241'), message: self.$t('10235'), type: 'danger'})
                }
            })
        } else {
            idc.importArrangeNow_post({
                filename: file.state.name,
                fac: fact.value,
                dep: formImportF.value.dep_value,
            }).then(async (data: any) => {
                fullloading.value = false;
                if (data.state.code == "200") {
                    self.$notify({title: self.$t('10240'), message: self.$t('10234'), type: 'success'})
                } else {
                    self.$notify({title: self.$t('10241'), message: self.$t('10235'), type: 'danger'})
                }
            })
        }
    }

    //**详情版本
    const loadingS = ref(false)
    const formImportS: any = ref({
        fac: 'idc001',
        date1: m().format('YYYY-MM-DD'),
        date2: m().format('YYYY-MM-DD'),
        date3: undefined,
        select: 'ALL',
        inputgongdan: undefined
    })
    const options: any = ref([
        {value: "ALL", label: "10038"},
        {value: "是", label: "10039"},
        {value: "否", label: "10040"},
    ])
    const isFinish: any = ref([
        {value: "是", label: "10039"},
        {value: "否", label: "10040"},
    ])
    const array: any = ref([
        {field: '每日排程.' + m().weekday(1).format('YYYY-MM-DD'), title: m().weekday(1).format('YYYY-MM-DD')},
        {field: '每日排程.' + m().weekday(2).format('YYYY-MM-DD'), title: m().weekday(2).format('YYYY-MM-DD')},
        {field: '每日排程.' + m().weekday(3).format('YYYY-MM-DD'), title: m().weekday(3).format('YYYY-MM-DD')},
        {field: '每日排程.' + m().weekday(4).format('YYYY-MM-DD'), title: m().weekday(4).format('YYYY-MM-DD')},
        {field: '每日排程.' + m().weekday(5).format('YYYY-MM-DD'), title: m().weekday(5).format('YYYY-MM-DD')},
        {field: '每日排程.' + m().weekday(6).format('YYYY-MM-DD'), title: m().weekday(6).format('YYYY-MM-DD')},
        {field: '每日排程.' + m().weekday(7).format('YYYY-MM-DD'), title: m().weekday(7).format('YYYY-MM-DD')}
    ])

    //列表数据
    const tableDataS: any = ref([])

    function rowClassNameS(row: any) {
        return row.row.是否派工 == "是" ? 'success-row' : 'normal-row';
    }

    const isSearchFor = ref(true);

    async function searchFor() {
        self.$refs.formS.validate((valid: boolean) => {
            if (valid) {
                loadingS.value = true;
                isSearchFor.value = true;
                idc.getWorkOrderList_post({
                    fac: formImportS.value.fac,
                    startTime: formImportS.value.date1,
                    endTime: formImportS.value.date2,
                    isArrange: formImportS.value.select
                }).then(async (data: any) => {
                    data.state.msg.map((res: any) => {
                        return res.每日排程 = JSON.parse(res.每日排程)
                    })
                    await filterGD(data.state.msg);
                    loadingS.value = false;
                })
            } else {
                return false;
            }
        });
    }

    //过滤工单数据
    async function filterGD(listCopy: any) {
        let ary1 = formImportS.value.inputgongdan ? listCopy.filter((param: any) => {
            return param.工单编号.match(new RegExp(formImportS.value.inputgongdan))
        }) : listCopy;
        let ary2 = formImportS.value.date3 ? ary1.filter((param: any) => {
            return param.每日排程[formImportS.value.date3]
        }) : ary1;
        tableDataS.value = ary2;
    }

    async function getAllOrder() {
        loadingS.value = true;
        isSearchFor.value = false;
        idc.getWorkOrderList_get().then(async (data: any) => {
            data.state.msg.map((res: any) => {
                return res.每日排程 = JSON.parse(res.每日排程)
            })
            tableDataS.value = data.state.msg;
            loadingS.value = false;
        })
    }

    function formatter(obj:any) {
        return obj.cellValue?obj.cellValue.replace(/[^0-9]/ig,""):obj.cellValue;
    }

    function editRowEvent(row: any) {
        if (row.是否派工 == "是") {
            self.$message({
                message: self.$t('10232'),
                type: 'warning'
            });
        } else {
            const $table = self.$refs.tableS
            $table.setActiveRow(row)
        }
    }

    function saveRowEvent(row: any) {
        const $table = self.$refs.tableS
        $table.clearActived().then(() => {
            idc.changeImport_post({
                order: row.copy.工单编号copy,
                viceProcess: row.副料号,
                process: row.copy.料件编号copy,
                materialName: row.copy.品名copy,
                specifications: row.规格,
                allData: row.copy.工单数copy,
                have: row.copy.已备料量copy,
                test: row.copy.本周计划数copy,
                finishData: row.copy.完工日copy,
                id: row.序号
            }).then(async (data: any) => {
                data.state.code == 200 ? self.$notify({
                    title: self.$t('10240'),
                    message: self.$t('10240'),
                    type: 'success'
                }) : alert(self.$t('10238'));

                isSearchFor.value ? await searchFor() : await getAllOrder();
            })
        })
    }

    function cancelRowEvent(row: any) {
        const $table = self.$refs.tableS
        $table.clearActived().then(() => {
            // 还原行数据
            $table.revertData(row)
        })
    }

    function delRowEvent(row: any) {
        if (row.是否派工 == "是") {
            self.$message({
                message: self.$t('10237'),
                type: 'warning'
            });
        } else {
            idc.delArrange_post({
                id: row.序号
            }).then(async (data: any) => {
                isSearchFor.value ? await searchFor() : await getAllOrder();
                data.state.code == 200 ? self.$notify({
                    title: self.$t('10240'),
                    message: self.$t('10239'),
                    type: 'success'
                }) : alert(self.$t('10238'));
            })
        }
    }

</script>

<style scoped lang="scss">
    .import {
        height: 100%;

        ::v-deep .el-tabs {
            height: 100%;

            &.el-tabs--border-card {
                box-shadow: none;
                border-width: 1px 0 0 0;
            }

            .el-tabs__content {
                height: calc(100% - 39px);

                .el-tab-pane {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
            }
        }

        ::v-deep .vxe-table {
            .vxe-header--row {
                .vxe-header--column {
                    /*line-height: 14px;*/
                    /*padding: 1px 0;*/

                    .vxe-cell {
                        padding: 0 1px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }

            .vxe-body--column {
                /*line-height: 12px;*/
                /*padding: 1px 0 !important;*/

                .vxe-cell {
                    padding: 0 2px;
                }

                &.bgw {
                    background-color: $white;
                }
            }

            .el-date-editor {
                width: 100%;

                .el-input__inner {
                    padding: 0;
                    height: 28px;
                    line-height: 28px;
                }

                .el-input__prefix {
                    display: none;
                }
            }

            .el-input {
                width: 100%;

                .el-input__inner {
                    padding: 0;
                    height: 28px;
                    line-height: 28px;
                }

                .el-select__caret {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }

        .i-f-header {
            max-height: 85px;

            ::v-deep .el-form {
                .el-select {
                    width: 150px;
                }

                .el-upload {
                    .el-upload-dragger {
                        width: 100%;
                        height: 36px;
                        display: flex;
                        justify-items: center;
                    }
                }

                .el-form-item {
                    margin-bottom: 6px;
                }
            }
        }

        .i-f-body {
            flex: 1;
            min-height: 200px;
        }

        .i-s-header {
            max-height: 85px;

            ::v-deep .el-form {
                .el-select {
                    width: 150px;
                }

                .el-upload {
                    .el-upload-dragger {
                        width: 100%;
                        height: 36px;
                        display: flex;
                        justify-items: center;
                    }
                }

                .el-form-item {
                    margin-bottom: 6px;
                }

                .el-form-item__error {
                    display: none;
                }
            }
        }

        .i-s-body {
            flex: 1;
            min-height: 200px;

            ::v-deep .vxe-table {
                .normal-row {
                    background: #a0cbf7;
                }

                .success-row {
                    background: $success;
                    color: $white;
                }

                .el-button-group {
                    display: flex;

                    .el-button {
                        flex: 1;
                        padding: 10px 5px;
                    }
                }
            }
        }
    }
</style>
