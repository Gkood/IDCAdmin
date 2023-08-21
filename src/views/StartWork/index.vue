<template>
    <Layout :header="header" :footer="footer">
        <div class="startWork">
            <div :class="['op',sys.language]">
                <div class="op-form">
                    <el-form ref="RefFormSearch"
                             :model="formSearch">
                        <el-form-item :label="$t('10212')+'：'"
                                      prop="workId"
                                      :rules="{required: true, message: $t('10101'), trigger: 'blur'}">
                            <el-input ref="employeeNum"
                                      v-model="formSearch.workId"
                                      autofocus
                                      @input="searchNumber">
                                <el-button slot="append"
                                           type="success"
                                           class="successBtn"
                                           @click="successBtn">{{$t('10015')}}
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('10087')+'：'">
                            <label :class="['xm',formSearch.name=='查无此工号'?'danger':'primary'] ">{{formSearch.name}}</label>
                        </el-form-item>
                        <el-form-item :label="$t('10093')+'：'"
                                      prop="site"
                                      :rules="{required: true, message: $t('10105'), trigger: 'blur'}">
                            <el-input v-model="formSearch.site"
                                      ref="site"
                                      @input="gongDan"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('10213')+'：'"
                                      prop="chooseOrder"
                                      :rules="{required: true, message: $t('10214'), trigger: 'change'}">
                            <el-select v-model="formSearch.chooseOrder"
                                       :placeholder="$t('10214')"
                                       @change="handleSelect">
                                <el-option v-for="item in nowOrder"
                                           :key="item.序号"
                                           :label="item.工单编号"
                                           :value="item.工单编号"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="Navicatstartwork"
                                       type="primary"
                                       class="sw">{{$t('10088')}}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div :class="['list',sys.language]">
                <el-table :data="tableData"
                          ref="myTable"
                          border
                          height="calc(100% - 50px)">
                    <el-table-column
                            prop="工单编号"
                            :label="$t('10016')"></el-table-column>
                    <el-table-column
                            prop="料件编号"
                            :label="$t('10017')"></el-table-column>
                    <el-table-column
                            prop="料件名"
                            :label="$t('10216')"
                            min-width="100"></el-table-column>
                    <el-table-column
                            prop="本周计划数"
                            :label="$t('10027')"
                            width="120"></el-table-column>
                    <el-table-column
                            prop="排产量"
                            :label="$t('10217')"
                            width="100"></el-table-column>
                    <el-table-column
                            prop="每日排产量"
                            :label="$t('10218')"
                            width="120"></el-table-column>
                </el-table>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick} from 'vue';
    import {idc} from '@/api'
    import m from 'moment';
    import {useSys} from '@/stores/sys';

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    //全局状态管理器
    const sys = useSys()

    //组件参数
    const header: any = {show: true, title: '10208',back:true}
    const footer: any = {show: true}

    //**表单
    const formSearch: any = ref({
        workId: '',
        name: '',
        site: '',
        chooseOrder: '',
    })

    //查询员工工号
    function searchNumber() {
        idc.getNameById_post({workId: formSearch.value.workId}).then(async (data: any) => {
            if (data.state.msg.length) {
                formSearch.value.name = data.state.msg[0].name
                if (formSearch.value.site == '') {
                    self.$refs.site.focus();
                } else {
                    gongDan()
                }
            } else {
                formSearch.value.name = self.$t('10219');
            }
        })
    }

    //确认
    function successBtn() {
        if (!formSearch.value.workId || !formSearch.value.site) {
            return alert('无需操作此步')
        }
        searchNumber();
    }

    //当前工单
    const nowOrder: any = ref([])

    //获取工单
    function gongDan() {
        idc.getWorkOrderDetail_post({
            workId: formSearch.value.workId,
            machId: formSearch.value.site
        }).then(async (data: any) => {
            nowOrder.value = data.state.msg;
            getSiteState();
        })
    }

    //场地当前状态
    const selectResult = ref();

    //查询场地当前状态
    function getSiteState() {
        idc.selectPlace_post({
            field: formSearch.value.site
        }).then(async (data: any) => {
            selectResult.value = data.state.msg[0];
        })
    }

    //选择工单
    async function handleSelect(item: any) {
        tableData.value = nowOrder.value.filter((res: any) => res.工单编号 == item)
        currentxx.value = tableData.value[0];
        await theDailyPlanNumber();
        await getYHId();
    }

    const theDailyProjectNumber: any = ref();

    //获取当日的排程量
    async function theDailyPlanNumber() {
        let js = currentxx.value.每日排程;
        if (js == "" || js == null) {
            let everyweekNumber = currentxx.value.本周计划数;
            theDailyProjectNumber.value = Math.ceil(everyweekNumber / 7);
        } else {
            var json = JSON.parse(js);
            var jsons = json[m().format('YYYY-MM-DD')]
            if (jsons == undefined) {
                theDailyProjectNumber.value = 0
            } else {
                theDailyProjectNumber.value = JSON.parse(jsons)
            }
        }
        if (theDailyProjectNumber.value == undefined) {
            currentxx.value.每日 = 0
        } else {
            currentxx.value.每日 = theDailyProjectNumber.value
        }
    }

    const yhId: any = ref();
    const dep: any = ref();
    const orIf: any = ref();

    //活动研华场地id和判断工单是否缺少料
    async function getYHId() {
        idc.postOrder_post({
            site: formSearch.value.site,
            order: currentxx.value.工单编号
        }).then(async (data: any) => {
            yhId.value = data.state.msg[0].研华场地
            dep.value = data.state.msg[0].科室
            orIf.value = data.state.or
        })
    }

    //开工
    function Navicatstartwork() {
        self.$refs.RefFormSearch.validate((valid: boolean) => {
            if (valid) {
                if (selectResult.value.state == 1) {
                    return self.$message({
                        type: 'warning',
                        message: self.$t('10100')
                    })
                }
                idc.startWork_post({
                    oid: currentxx.value.序号,
                    orderNumber: currentxx.value.工单编号,
                    orderProcess: currentxx.value.副料号
                }).then(async (data: any) => {
                    await Storagelocal();
                    if (dep.value == '机加科') {
                        //开工向研华传参
                        await testPost();
                    }
                    await changeSiteState();
                    self.$message({
                        message: "开工成功！",
                        type: "success",
                        center: true,
                    });
                    currentxx.value = {};
                    formSearch.value.chooseOrder = "";
                    self.$refs.employeeNum.focus();
                })
            } else {
                return false;
            }
        });
    }

    //存储本地开工数据
    async function Storagelocal() {
        let siteToState = {
            xx: formSearch.value.workId,
            number: formSearch.value.site,
            recodetime: m().format('YYYY-MM-DD')
        }
        localStorage.setItem("siteToState", JSON.stringify(siteToState))
    }

    //获取本地开工数据
    function getstoragelocal() {
        let getlocalStorage: any = localStorage.getItem("siteToState");
        if (getlocalStorage) {
            let datas = JSON.parse(getlocalStorage)
            formSearch.value.site = datas.number;
            formSearch.value.workNumber = datas.xx
        }
    }

    //开工向研华传参
    async function testPost() {
        let newArr: any = [
            {"mach_no": yhId.value, "tag": "WorkOrder_NO", "type": "string", "value": currentxx.value.工单编号},
            {"mach_no": yhId.value, "tag": "standard_quantity", "type": "number", "value": currentxx.value.每日},
            {"mach_no": yhId.value, "tag": "qianliao", "type": "number", "value": orIf.value}
        ]
        idc.editDataCustomized_post({
            oid: currentxx.value.序号,
            orderNumber: currentxx.value.工单编号,
            orderProcess: currentxx.value.副料号
        })
    }

    //改变当前场地的状态
    async function changeSiteState() {
        idc.changeToWork_post({
            field: formSearch.value.site
        })
    }

    //**列表数据
    const tableData: any = ref([])
    const currentxx: any = ref({})

    onMounted(() => {
        getstoragelocal()
    })
</script>

<style scoped lang="scss">
    .startWork {
        width: 100%;
        height: 100%;
        display: flex;

        .op {
            width: 220px;
            height: 100%;
            border-right: 1px solid $bd;
            &.vi{
                .op-form{
                    ::v-deep .el-form-item {
                        .el-form-item__label{
                            font-size: 16px;
                        }
                    }
                }
            }

            &.es{
                width: 252px;
                .op-form {
                    ::v-deep .el-form-item {
                        .el-form-item__label {
                            font-size: 13px;
                        }
                    }
                }
            }

            .op-form {
                height: 100%;
                display: flex;
                justify-items: center;
                padding: 10px;

                ::v-deep .el-form-item {

                    .el-form-item__label {
                        font-size: 18px;
                        font-weight: bold;
                    }

                    .el-form-item__content {
                        .sw {
                            width: 100%;
                        }

                        .el-input-group__append {
                            border-color: $success;
                        }

                        .successBtn {
                            height: 35px;
                            border-radius: 0 4px 4px 0;
                        }

                        .el-select {
                            width: 100%;
                        }

                        .xm {
                            width: 100%;
                            display: block;
                            font-size: 16px;
                        }
                    }
                }
            }

            .op-tab {
                height: 100%;
                flex: 1;

                ::v-deep .el-loading-spinner {
                    top: 80px !important;
                }

                ::v-deep .el-tabs {
                    height: 100%;

                    .el-tabs__header {
                        margin-bottom: 0;
                    }
                }

                .op-tab-list {
                    padding: 10px;
                    height: 100%;

                    .op-tab-items {
                        padding: 8px 10px;
                        text-align: center;
                        cursor: pointer;

                        &.cur {
                            padding: 5px 7px;
                            border: 4px solid $warning !important;
                        }

                        &.primary {
                            background-color: #ecf5ff;
                            border: 1px solid #d9ecff;
                            color: #333;
                        }

                        &.success {
                            background-color: $success;
                            border: 1px solid $white;
                            color: $white;
                        }

                        &.warning {
                            background-color: #ecf5ff;
                            border: 1px solid #d9ecff;
                            color: #409eff;
                        }

                        &.error {
                            background-color: #8f99a3;
                            border: 1px solid #000;
                            color: #000;
                        }
                    }
                }
            }
        }

        .list {
            width: calc(100% - 220px);
            flex: 1;
            &.es{
                width: calc(100% - 252px);
            }
        }
    }
</style>
