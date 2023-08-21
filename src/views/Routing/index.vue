<template>
    <Layout :header="header"
            :footer="footer"
            @on-back="back">
        <div class="routing">
            <div :class="['op','scrollBar',isExpand?'isExpand':null]">
                <div class="op-form">
                    <el-form ref="RefFormSearch"
                             :model="formSearch"
                             label-width="80px">
                        <el-form-item :label="$t('10303')">
                            <el-input v-model="formSearch.selectSite"
                                      :placeholder="$t('10312')"
                                      @keyup.enter.native="wantToSelectSite"></el-input>
                        </el-form-item>
                        <el-form-item label-width="40px">
                            <el-button @click="wantToSelectSite" type="primary">{{$t('10304')}}</el-button>
                            <el-button @click="getSite" type="info">{{$t('10048')}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="op-tab">
                    <el-tabs type="card"
                             stretch
                             v-loading="orderLoad">
                        <el-tab-pane :label="$t('10056')+'（'+site.length+'）'" name="0">
                            <div class="op-tab-list">
                                <div v-for="item in site"
                                     :key="item.设备"
                                     :class="['op-tab-items',item.是否生产 ==1?'success':'primary',item.设备==orderDetail.设备?'cur':null]"
                                     @click="siteDetail(item)">
                                    {{item.科室 +':' +item.设备}}
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="list">
                <div class="l-bg" v-if="!showMain">
                    <img src="../../assets/bg.png">
                </div>
                <div class="l-info" v-else>
                    <div class="l-i-h">
                        <div class="l-i-h-l" :title="$t('10293')" @click="expand"><i
                                :class="isExpand?'el-icon-s-unfold':'el-icon-s-fold'"></i></div>
                        <div class="l-i-h-c">{{$t('10278')}}</div>
                    </div>
                    <div class="l-i-b">
                        <div class="l-i-b-t">
                            <el-descriptions size="mini">
                                <el-descriptions-item :label="$t('10177')">{{orderDetail.工单}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10266')">{{orderDetail.工序}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10178')">{{orderDetail.料号}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10020')">{{orderDetail.规格}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10019')">{{orderDetail.品名}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10027')">{{orderDetail.本周计划数}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10306')">{{orderDetail.当前完工量}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10303')">{{orderDetail.设备}}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                        <div class="l-i-b-b">
                            <vxe-table
                                    border
                                    ref="table"
                                    height="100%"
                                    :auto-resize="false"
                                    :scroll-y="{gt: 100}"
                                    :loading="loading"
                                    :data="inspectionOne"
                                    keep-source
                                    :edit-config="{trigger: 'click', mode: 'row', showStatus:true}">
                                <vxe-column field="工序名称" width="50" :title="$t('10109')"></vxe-column>
                                <vxe-column field="检验项目" :title="$t('10110')"></vxe-column>
                                <vxe-column field="测量工具" :title="$t('10111')"></vxe-column>
                                <vxe-column field="判定上限值" :title="$t('10112')"></vxe-column>
                                <vxe-column field="判定下限值" :title="$t('10113')"></vxe-column>
                                <vxe-column field="测量值" :title="$t('10114')" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.测量值" type="text" @input='judgeYesNo(row)'></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="判断文字" :title="$t('10116')"></vxe-column>
                            </vxe-table>
                        </div>
                        <div class="l-i-b-f">
                            <el-button type="primary" @click="judgeToSubmit">{{$t('10245')}}</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <submit-open ref="RefSubmitOpen" @save="submitSave"></submit-open>
        </div>
    </Layout>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, onUnmounted, nextTick} from 'vue';
    import {idc} from '@/api'
    import m from 'moment';
    import {useSys} from '@/stores/sys';
    import submitOpen from './submitOpen.vue'

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    //全局状态管理器
    const sys = useSys()

    //组件参数
    const header: any = {show: true, title: '10098',back:true}
    const footer: any = {show: true}

    function back() {
        self.$router.go(-1);
    }

    //**表单
    const formSearch: any = ref({
        selectSite: ""
    })

    //查询
    function getSite() {
        orderLoad.value = true;
        idc.inspectionSite_post().then((data: any) => {
            site.value = data;
            orderLoad.value = false;
        }).finally(() => {
            orderLoad.value = false;
        })
    }

    //过滤
    function wantToSelectSite() {
        let ary1 = (site.value.length ? site.value.filter((param: any) => {
            return param.设备.match(new RegExp(formSearch.value.selectSite))
        }) : site.value);
        site.value = ary1;
    }

    //**工单列表
    //加载
    const orderLoad = ref(false);
    const site: any = ref([])

    function siteDetail(x: any) {
        showMain.value = true;
        loading.value = true;
        idc.inspectionOrder_post({
            field: x.设备
        }).then((data: any) => {
            orderDetail.value = data.state.msg[0]
            getCheckOutDate(x.科室)
            loading.value = false;
        }).finally(() => {
            loading.value = false;
        })
    }

    function getCheckOutDate(y: any) {
        let material = orderDetail.value.料号
        let process = (orderDetail.value.工序 == 'None' ? '' : orderDetail.value.工序)
        idc.selectToInspection_6820_post({
            material: material,
            pro: process,
            dep: y
        }).then((data: any) => {
            inspectionOne.value = data.state.msg
        })
    }

    //**工单详情
    const showMain = ref(false)
    const orderDetail: any = ref({})
    const loading = ref(false);
    const inspectionOne: any = ref([])
    const isExpand = ref(false)

    function expand() {
        isExpand.value = !isExpand.value;
    }

    //判断品质
    function judgeYesNo(row: any) {
        if (row.判定下限值 == null && row.判定上限值 == null) {
            row.判断数字 = 1
            row.判断文字 = '记录'
        } else if (row.测量值 >= row.判定下限值 && row.测量值 <= row.判定上限值) {
            row.判断数字 = 1
            row.判断文字 = '合格'
        } else {
            row.判断数字 = 2
            row.判断文字 = '不合格'
        }
    }

    //判断是否好坏
    function judgeToSubmit() {
        let submitText: string = '';
        if (inspectionOne.value == "") {
            return self.$message.warning(self.$t('10120'))
        }
        for (let i = 0; i < inspectionOne.value.length; i++) {
            if (inspectionOne.value[i].判断数字 == '') {
                return self.$message.warning(self.$t('10119'))
            } else if (inspectionOne.value[i].判断数字 == 2) {
                submitText = self.$t('10310')
                break;
            } else {
                submitText = self.$t('10311')
            }
        }
        self.$refs.RefSubmitOpen.open({submitText: submitText})
    }

    function submitSave(obj: any) {
        let judge = 1
        for (let i = 0; i < inspectionOne.value.length; i++) {
            if (inspectionOne.value[i].判断数字 == 2) {
                judge = 2
                break
            }
        }

        idc.testByOther_post({
            order: orderDetail.value.工单,
            process: orderDetail.value.工序,
            material: orderDetail.value.料号,
            specifications: orderDetail.value.规格,
            name: orderDetail.value.品名,
            equipment: orderDetail.value.设备,
            detail: JSON.stringify(inspectionOne.value),
            judge: judge,
            batch: obj.batch
        }).then((data: any) => {
            if (data.state.code == 200) {
                self.$message({
                    type: 'success',
                    message: self.$t('10117')
                })
            } else {
                self.$message({
                    type: 'warning',
                    message: self.$t('10118')
                })
            }
        })
    }

    onMounted(async () => {
        getSite();
    })

    onUnmounted(() => {

    })
</script>

<style scoped lang="scss">
    .routing {
        width: 100%;
        height: 100%;
        display: flex;

        .op {
            width: 18vw !important;
            min-width: 280px;
            height: 100%;
            border-right: 1px solid $bd;
            transition-duration: .2s;

            &.isExpand {
                width: 0 !important;
                min-width: 0 !important;
            }

            > p {
                text-align: center;
                padding: 8px 0;
                border-bottom: 1px solid $bd;
                background-color: $bg;
                font-weight: bold;
            }

            .op-form {
                height: 100px;
                display: flex;
                flex-direction: row;
                padding: 10px;

                ::v-deep .el-form-item {
                    margin-bottom: 2px;

                    .el-form-item__content {
                        .el-input {
                            width: 140px;
                        }
                    }

                    .el-form-item__error {
                        display: none;
                    }
                }
            }

            .op-tab {
                height: calc(100% - 150px);
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
                            color: #409eff;
                        }

                        &.success {
                            background-color: $success;
                            border: 1px solid $white;
                            color: $white;
                        }
                    }
                }
            }
        }

        ::v-deep .vxe-table {
            .vxe-header--row {
                .vxe-header--column {
                    line-height: 14px;
                    padding: 1px 0;

                    .vxe-cell {
                        padding: 0 1px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }

            .vxe-body--column {
                line-height: 12px;
                padding: 1px 0 !important;

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

        .list {
            width: 100%;
            height: 100%;
            flex: 1;

            .l-bg {
                width: calc(100% - 10px);
                height: calc(100% - 10px);
                overflow: hidden;
                margin: 5px 0 0 5px;

                > img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: 0.5s;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.02);
                    }
                }
            }

            .l-info {
                width: 100%;
                height: 100%;

                .l-i-h {
                    width: 100%;
                    height: 41px;
                    border-bottom: 1px solid $bd;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .l-i-h-l {
                        width: 50px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        border-right: 1px solid $bd;
                        font-size: 20px;
                    }

                    .l-i-h-c {
                        flex: 1;
                        text-align: center;
                    }
                }

                .l-i-b {
                    width: 100%;
                    height: calc(100% - 41px);
                    display: flex;
                    flex-direction: column;

                    .l-i-b-t {
                        width: 100%;
                        min-height: 120px;
                        padding: 10px;
                    }

                    .l-i-b-b {
                        width: 100%;
                        height: calc(100% - 180px);
                        flex: 1;

                        .btn {
                            width: 100%;
                            height: 100%;
                            border-radius: 0;
                        }
                    }

                    .l-i-b-f {
                        width: 100%;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }
</style>
