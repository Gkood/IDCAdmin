<template>
    <Layout :header="header" :footer="footer">
        <div :class="['reporWork',bgColor]">
            <div class="r-t">
                <el-tabs v-model="activeName" type="border-card" @tab-click="tabClick">
                    <el-tab-pane :label="$t('10127')" name="0">
                        <div class="tab1">
                            <vxe-table
                                    border
                                    ref="table1"
                                    :loading="loading1"
                                    :data="tableData1">
                                <vxe-column type="seq" width="50" :title="$t('10192')"></vxe-column>
                                <vxe-column field="工单编号" width="100" :title="$t('10191')"></vxe-column>
                                <vxe-column field="料件编号" width="100" :title="$t('10252')"></vxe-column>
                                <vxe-column field="工单量" :title="$t('10186')"></vxe-column>
                                <vxe-column field="已入库量" :title="$t('10253')"></vxe-column>
                                <vxe-column field="品名" :title="$t('10019')"></vxe-column>
                                <vxe-column field="设备编号" :title="$t('10254')"></vxe-column>
                                <vxe-column field="工号" :title="$t('10255')"></vxe-column>
                                <vxe-column field="本周计划数" :title="$t('10256')"></vxe-column>
                                <vxe-column field="本周剩余数" :title="$t('10257')"></vxe-column>
                                <vxe-column field="本周完工数" :title="$t('10258')"></vxe-column>
                                <vxe-column field="已报验量" :title="$t('10135')"></vxe-column>
                                <vxe-column field="本周报废品数" :title="$t('10139')"></vxe-column>
                                <vxe-column field="返工量" :title="$t('10136')"></vxe-column>
                            </vxe-table>
                            <!--图纸列表-->
                            <div class="t-dt">
                                <el-link type="primary"
                                         v-for="(item,i) in allUrls"
                                         :key="i"
                                         class="mr10"
                                         @click="drawings(item)">{{item.名称 }}
                                </el-link>
                            </div>
                            <!--图纸-->
                            <iframe :src="url" class="t-dp"></iframe>
                        </div>
                        <div class="r-box">
                            <el-form ref="RefFormbatch"
                                     :model="formBatch">
                                <el-form-item :label="$t('10254')">
                                    <el-input v-model="formBatch.MNR"
                                              autofocus
                                              @input="searchNumber">
                                        <el-button slot="append"
                                                   type="primary"
                                                   class="primaryBtn"
                                                   @click="batch">{{$t('10137')}}
                                        </el-button>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <el-scrollbar>
                                <div class="inspectionItem">
                                    <div v-for="(item,i) in selfData" :key="i" style="font-size:12px"
                                         :class="['work_judge_item',item.判断数字 == '1' ? 'judge_yes':'judge_no']">
                                        {{item.工序名称+item.检验项目+':'+item.默认测量值}}
                                        <el-input v-model="item.测量值" @input="judgeInput(item)"></el-input>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('10128')" name="1">
                        <vxe-table
                                border
                                ref="table2"
                                :loading="loading2"
                                :data="tableData2"
                                :row-class-name="rowClassName2">
                            <vxe-column field="工单号" :title="$t('10191')"></vxe-column>
                            <vxe-column field="料件编号" :title="$t('10017')"></vxe-column>
                            <vxe-column field="副料号" :title="$t('10202')"></vxe-column>
                            <vxe-column field="品名" :title="$t('10019')"></vxe-column>
                            <vxe-column field="规格" :title="$t('10020')"></vxe-column>
                            <vxe-column field="工序内容" :title="$t('10022')"></vxe-column>
                            <vxe-column field="本周计划数" :title="$t('10027')"></vxe-column>
                            <vxe-column field="备料量" :title="$t('10259')"></vxe-column>
                            <vxe-column field="图纸编号" :title="$t('10260')"></vxe-column>
                            <vxe-column :title="$t('10148')">
                                <template #default="{ row }">
                                    <el-button type="primary"
                                               size="mini"
                                               v-loading.fullscreen.lock="fullscreenLoading"
                                               @click="lookDrawing(row)">{{$t('10261')}}
                                    </el-button>
                                </template>
                            </vxe-column>
                        </vxe-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('10129')" name="2">
                        <vxe-table
                                border
                                ref="table3"
                                :loading="loading3"
                                :data="tableData3">
                            <vxe-column field="工单号" :title="$t('10191')"></vxe-column>
                            <vxe-column field="料件编号" :title="$t('10017')"></vxe-column>
                            <vxe-column field="副料号" :title="$t('10202')"></vxe-column>
                            <vxe-column field="品名" :title="$t('10019')"></vxe-column>
                            <vxe-column field="规格" :title="$t('10020')"></vxe-column>
                            <vxe-column field="人员" :title="$t('10262')"></vxe-column>
                            <vxe-column field="本周计划数" :title="$t('10027')"></vxe-column>
                        </vxe-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('10130')" name="3">
                        <vxe-table
                                border
                                ref="table4"
                                :loading="loading4"
                                :data="tableData4">
                            <vxe-column field="工单号" :title="$t('10191')"></vxe-column>
                            <vxe-column field="工序" :title="$t('10202')"></vxe-column>
                            <vxe-column field="料号" :title="$t('10017')"></vxe-column>
                            <vxe-column field="品名" :title="$t('10019')"></vxe-column>
                            <vxe-column field="规格" :title="$t('10020')"></vxe-column>
                            <vxe-column field="本周计划数" :title="$t('10027')"></vxe-column>
                            <vxe-column field="本周完工数" :title="$t('10263')"></vxe-column>
                            <vxe-column field="本周报废品数" :title="$t('10264')"></vxe-column>
                            <vxe-column field="人员" :title="$t('10262')"></vxe-column>
                            <vxe-column field="完工时间" :title="$t('10190')"></vxe-column>
                            <vxe-column :title="$t('10244')">
                                <template #edit="{ row }">
                                    <vxe-input v-model="row.报验量" type="text"></vxe-input>
                                </template>
                            </vxe-column>
                            <vxe-column :title="$t('10265')">
                                <template #default="{ row }">
                                    <el-button type="primary" size="mini"
                                               @click="comeToFqc(row)">{{$t('10142')}}
                                    </el-button>
                                </template>
                            </vxe-column>
                        </vxe-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('10131')" name="4">
                        <div v-for="item in form5" :key="item.id" class="form5">
                            <el-form ref="form" v-model="form5">
                                <el-form-item class="tit">
                                    <label>批次号:{{item.批次}}</label>
                                    <el-button type="primary"
                                               @click="submitComeBack(item)"
                                               v-loading.fullscreen.lock="fullscreenLoading">提交
                                    </el-button>
                                </el-form-item>
                                <el-form-item>
                                    <vxe-table border
                                               :data="item.数据">
                                        <vxe-column field="工单" :title="$t('10177')"></vxe-column>
                                        <vxe-column field="工序" :title="$t('10266')"></vxe-column>
                                        <vxe-column field="料号" :title="$t('10178')"></vxe-column>
                                        <vxe-column field="检验工序" :title="$t('10267')"></vxe-column>
                                        <vxe-column field="序号" :title="$t('10192')"></vxe-column>
                                        <vxe-column field="名称" :title="$t('10268')"></vxe-column>
                                        <vxe-column field="上限" :title="$t('10112')"></vxe-column>
                                        <vxe-column field="下限" :title="$t('10113')"></vxe-column>
                                        <vxe-column :title="$t('10114')">
                                            <template #edit="{ row }">
                                                <vxe-input v-model="row.实测值" @input="judgeComeBack(row)"></vxe-input>
                                            </template>
                                        </vxe-column>
                                        <vxe-column field="判断文字" :title="$t('10269')"></vxe-column>
                                    </vxe-table>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="r-b">
                <el-button type="primary"
                           icon="el-icon-upload2"
                           v-loading.fullscreen.lock="fullscreenLoading"
                           @click="completeOrder">{{$t('10141')}}
                </el-button>
                <el-button type="warning"
                           icon="el-icon-video-pause"
                           v-loading.fullscreen.lock="fullscreenLoading"
                           @click="interrupt">{{$t('10143')}}
                </el-button>
                <el-button type="info"
                           icon="el-icon-s-promotion"
                           @click='judgeCheck'>{{$t('10142')}}
                </el-button>
            </div>
            <change-workState ref="RefBatchOpen" @save="batchSave"></change-workState>
            <open-drawing ref="RefOpenDrawing"></open-drawing>
            <open-inspectionNumber ref="RefOpenInspectionNumber" @save="okInspection"></open-inspectionNumber>
            <open-orderInspection ref="RefOpenOrderInspection" @save="passCheck"></open-orderInspection>
        </div>
    </Layout>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick, onUnmounted} from 'vue';
    import {idc} from '@/api'
    import m from 'moment';
    import {useSys} from '@/stores/sys';
    import changeWorkState from './changeWorkState.vue'
    import openDrawing from './openDrawing.vue'
    import openInspectionNumber from './openInspectionNumber.vue'
    import openOrderInspection from './openOrderInspection.vue'

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    //全局状态管理器
    const sys = useSys()

    //组件参数
    const header: any = {show: true, title: '10242', timer: true,back:true}
    const footer: any = {show: false}

    //背景色
    const bgColor: any = ref('yellow') //yellow aliceblue red
    const activeName: any = ref(0)

    function tabClick(obj: any) {
        switch (obj.index) {
            case '0':

                break;
            case '1':
                getMessage()
                break;
            case '2':
                selectAgoOrder()
                break;
            case '3':
                selectHalf()
                break;
            case '4':
                getComeBackDate()
                break;
        }
    }

    //**员工报工
    const loading1 = ref(false)
    const tableData1: any = ref([])

    const formBatch: any = ref({
        MNR: '',
        ANR: '',
        ACTQTY: '',
        SCRAPQTY: ''
    })
    const selfData: any = ref([])
    const allUrls: any = ref([])
    const beforeNumber = ref('')
    const url = ref('')

    function searchNumber() {
        loading1.value = true;
        tableData1.value = [];
        idc.backreportm_post({
            field: formBatch.value.MNR
        }).then(async (data: any) => {
            loading1.value = false;
            if (data.length) {
                bgColor.value = 'aliceblue';
                formBatch.value.MNR = data[0].设备编号;
                formBatch.value.ANR = data[0].工单编号;
                tableData1.value = data;
                selectCheckOut();
                enterForDrawing()
                if (tableData1.value[0].副料号 && tableData1.value[0].副料号 != '-1') {
                    await beforeOrder();
                }
            } else {
                bgColor.value = 'yellow';
            }
        }).finally(() => {
            loading1.value = false;
        })
    }

    //得出检验项目
    function selectCheckOut() {
        idc.selectToInspection_post({
            material: tableData1.value[0].料件编号,
            pro: tableData1.value[0].副料号 || '',
            dep: tableData1.value[0].科室,
        }).then(async (data: any) => {
            selfData.value = data.state.msg
        })
    }

    //判断输入值
    function judgeInput(item: any) {
        if (item.判定上限值 == null && item.判定下限值 == null) {
            item.判断数字 = '1'
        } else if (item.测量值 <= item.判定上限值 && item.测量值 >= item.判定下限值) {
            item.判断数字 = '1'
        } else {
            item.判断数字 = '2'
        }
    }

    //登录出现图纸
    function enterForDrawing() {
        tableData1.value[0].副料号 = (tableData1.value[0].副料号 || '');
        idc.getpdfurl2_post({
            workno: tableData1.value[0].工单编号,
            materialno1: tableData1.value[0].料件编号,
            materialno2: tableData1.value[0].副料号
        }).then((data: any) => {
            allUrls.value = data.state.text
        })
    }

    function drawings(item: any) {
        url.value = item.url
    }

    //前置工序是否报足
    function beforeOrder() {
        let pro: string = (parseInt(tableData1.value[0].副料号) + 1).toString()
        idc.beforeOrderNumber_post({
            field: formBatch.value.ANR,
            pro: pro
        }).then((data: any) => {
            beforeNumber.value = data.state.msg[0].数量
        })
    }

    //批量
    function batch() {
        if (!formBatch.value.MNR) return self.$message({
            type: 'warning',
            message: self.$t('10249')
        })
        self.$refs.RefBatchOpen.open()
    }

    function batchSave(obj: any) {
        formBatch.value.ACTQTY = obj.ACTQTY;
        formBatch.value.SCRAPQTY = obj.SCRAPQTY || '0';

        if (parseInt(beforeNumber.value) < (parseInt(formBatch.value.ACTQTY) + parseInt(formBatch.value.SCRAPQTY) + parseInt(tableData1.value[0].本周完成量) + parseInt(tableData1.value[0].本周报废品数))) {
            return self.$message({
                type: 'warning',
                message: self.$t('10159')
            })
        }
        CC2();
    }

    function CC2() {
        fullscreenLoading.value = true
        idc.importworkno_post({
            field: formBatch.value.MNR,
            finishNo: formBatch.value.ACTQTY,
            ScrapNo: formBatch.value.SCRAPQTY
        }).then((data: any) => {
            if (data.state.code == 200) {
                fullscreenLoading.value = false;
                localdata.value = formBatch.value.MNR;
                //数据存本地
                Storagelocal();
                //提示成功信息
                self.$message({
                    message: self.$t('10251'),
                    type: 'success',
                    center: true
                });
                //刷新
                //sx();
                // idc.batch_post({
                //     order: formBatch.value.MNR,
                //     process: JSON.stringify(selfData.value)
                // }).then((res: any) => {
                //     fullscreenLoading.value = false;
                //     localdata.value = formBatch.value.MNR;
                //     if (res.state.code == 200) {
                //         //数据存本地
                //         Storagelocal();
                //         //提示成功信息
                //         self.$message({
                //             message: self.$t('10251'),
                //             type: 'success',
                //             center: true
                //         });
                //         //刷新
                //         sx();
                //     } else if (res.state.code == 10500) {
                //         self.$message.error(self.$t('10167') + ',' + res.state.msg + ',' + self.$t('10168'));
                //     }
                // })
            } else if (data.state.code == 10500) {
                fullscreenLoading.value = false;
                self.$message.error(self.$t('10167') + ',' + data.state.msg + ',' + self.$t('10168'));
            }
        })
    }

    //**排程看板
    const loading2 = ref(false)
    const tableData2: any = ref([])

    //查询图纸相关资料
    function getMessage() {
        loading2.value = true;
        idc.selectOrderDrawing_post({
            field: formBatch.value.MNR
        }).then((data: any) => {
            tableData2.value = data.state.msg;
            loading2.value = false;
        }).finally(() => {
            loading2.value = false;
        })
    }

    function lookDrawing(row: any) {
        self.$refs.RefOpenDrawing.open(row)
    }

    function rowClassName2(row: any) {
        return row.row.是否开工 == 1 ? 'success-row' : null;
    }

    //**本周历史记录
    const loading3 = ref(false)
    const tableData3: any = ref([])

    function selectAgoOrder() {
        loading3.value = true;
        idc.selectAgoOrder_post({
            field: formBatch.value.MNR
        }).then((data: any) => {
            tableData3.value = data.state.msg;
            loading3.value = false;
        }).finally(() => {
            loading3.value = false;
        })
    }

    //**已报工未报验
    const loading4 = ref(false)
    const tableData4: any = ref([])
    const inspectionNumber = ref()
    const wantToFqcOne = ref()
    const changeJudge = ref()

    //查询已报工未报验的单子
    function selectHalf() {
        loading4.value = true;
        idc.halfWork_post({
            field: formBatch.value.MNR
        }).then((data: any) => {
            tableData4.value = data.state.msg;
            loading4.value = false;
        }).finally(() => {
            loading4.value = false;
        })
    }

    //已经报工未报验,进行报验
    function comeToFqc(row: any) {
        if (row.报验量 == '') {
            return self.$message({
                message: self.$t('10154'),
                type: 'danger'
            })
        }

        inspectionNumber.value = row.报验量;
        wantToFqcOne.value = row;

        idc.checkSuite_post({
            field: row.工单号,
            number: inspectionNumber.value
        }).then((data: any) => {
            changeJudge.value = 2;
            if (data.state.msg == 1) {
                idc.already_post({
                    field: row.ID
                }).then((data: any) => {
                    createFQC()
                })
            } else {
                self.$message({
                    type: "warning",
                    message: self.$t('10156')
                })
            }
        }).finally(() => {

        })
    }

    function createFQC() {
        let data01, data02, data03, data04, data05, data06;
        if (changeJudge.value == 1) {
            data02 = "<Field name=\"qcf02\" value=" + '"' + formBatch.value.ANR + '"' + "/>"
            data04 = "<Field name=\"qcf06\" value=" + '"' + tableData1.value[0].本周完工数 + '"' + "/><Field name=\"qcf091\" value=" + '"' + tableData1.value[0].本周完工数 + '"' + "/><Field name=\"qcf41\" value=" + '"' + tableData1.value[0].本周完工数 + '"' + "/>"
            data05 = "<Field name=\"qcf13\" value=\"tiptop\"/><Field name=\"qcf22\" value=" + '"' + tableData1.value[0].本周完工数 + '"' + "/><Field name=\"qcfuser\" value=\"tiptop\"/>"
        } else if (changeJudge.value == 2) {
            data02 = "<Field name=\"qcf02\" value=" + '"' + wantToFqcOne.value.工单号 + '"' + "/>"
            data04 = "<Field name=\"qcf06\" value=" + '"' + wantToFqcOne.value.本周完工数 + '"' + "/><Field name=\"qcf091\" value=" + '"' + wantToFqcOne.value.本周完工数 + '"' + "/><Field name=\"qcf41\" value=" + '"' + wantToFqcOne.value.本周完工数 + '"' + "/>"
            data05 = "<Field name=\"qcf13\" value=\"tiptop\"/><Field name=\"qcf22\" value=" + '"' + wantToFqcOne.value.本周完工数 + '"' + "/><Field name=\"qcfuser\" value=\"tiptop\"/>"
        }

        data01 = "<Request><Access><Authentication user=\'tiptop\' password=\'\'/><Connection application=\'OMS\' source=\'192.168.10.31\'/> <Organization name=\'IDCNT10\'/> <Locale language=\'zh_cn\'/></Access><RequestContent>	<Document><RecordSet id=\"1\">   <Master name=\"aqct410\"><Record><Detail name=\"qcf_file\" node_id=\"1_1\"><Record>"
        data03 = "<Field name=\"qcf04\" value=" + '"' + m().format('YYYY-MM-DD') + '"' + "/><Field name=\"qcf041\" value=" + '"' + m().format('HH:mm:ss') + '"' + "/>"
        data06 = "<Field name=\"qcfplant\" value=\"IDCNT10\"/><Field name=\"qcfud04\" value=\"\"/></Record></Detail></Record></Master></RecordSet></Document></RequestContent></Request>"
        let datas = data01 + data02 + data03 + data04 + data05 + data06;
        idc.getErpApiNew_post({
            url: 'http://192.168.10.167/web/ws/r/aws_ttsrv2?WSDL',//'http://192.168.10.167/web/ws/r/aws_ttsrv2_toptest?WSDL',
            param: datas,
            func: 'SCM_CreateERPFQC'
        }).then((data: any) => {
            let parser = new DOMParser();
            let xmlObj = parser.parseFromString(data, "text/xml");
            let json: any = xmlObj.getElementsByTagName("Execution")[0]
            let jsons: any = json.childNodes[1].attributes;
            let code = jsons[0].nodeValue
            let FQC = jsons[2].nodeValue
            if (code == "0") {
                //发邮件
                createFqcToEmail(FQC);
                self.$message({
                    type: 'success',
                    message: self.$t('10169')
                })
            } else {
                fullscreenLoading.value = false;
                self.$message({
                    type: 'warning',
                    message: self.$t('10162')
                })
            }
        })
    }

    function createFqcToEmail(FQC: any) {
        let sub = 'FQC单生成通知'
        let body = ''
        if (changeJudge.value == 1) {
            body = 'FQC单号:' + FQC + ',料号:' + tableData1.value[0].料件编号 + ',品名:' + tableData1.value[0].品名 + ',规格:' + tableData1.value[0].规格 + ',报验量:' + inspectionNumber.value + '已于现场生成,请尽快检验'
            changeTableInspection(tableData1.value[0].ID, inspectionNumber.value, tableData1.value[0].已报验量)
        } else if (changeJudge.value == 2) {
            body = 'FQC单号:' + FQC + ',料号:' + wantToFqcOne.value.料号 + ',品名:' + wantToFqcOne.value.品名 + ',规格:' + wantToFqcOne.value.规格 + ',报验量:' + inspectionNumber.value + '已于现场生成,请尽快检验'
            changeTableInspection(wantToFqcOne.value.ID, inspectionNumber.value, wantToFqcOne.value.已报验量)
        }
        idc.sendmail_post({
            to: 'cheng.chen2@idcgroup.com.cn',
            cc: 'changwen.li@idcgroup.com.cn;yuanhang.ren@idcgroup.com.cn',
            subject: sub,
            body: body,
            sfile: '',
            strimage: ''
        }).then((data: any) => {
            fullscreenLoading.value = false;
            sx();
        })
    }

    const loopSx: any = ref(null)

    //报工后刷新
    function sx() {
        loopSx.value = setTimeout(function () {
            location.reload()
        }, 3000)
    }

    function changeTableInspection(a: any, b: any, c: any) {
        idc.changeInspection_post({
            field: a,
            now: b,
            ago: c
        })
    }

    //**返工产品报工
    const loading5 = ref(false)
    const form5: any = ref([]);

    function getComeBackDate() {
        loading5.value = true
        idc.backDate_post({
            field: formBatch.value.MNR
        }).then((data: any) => {
            form5.value = data.state.msg;
            loading5.value = false
        }).finally(() => {
            loading5.value = false
        })
    }

    //判断返工再次输入的数据
    function judgeComeBack(row: any) {
        if (row.实测值 >= row.下限 && row.实测值 <= row.上限) {
            row.判断文字 = '良'
            row.判断数字 = 1
        } else {
            row.判断文字 = '劣'
            row.判断数字 = 2
        }
    }

    //返工数据提交
    function submitComeBack(item: any) {
        let batch = item.批次[0]
        let data = item.数据
        let ary = data.filter((res: any) => res.实测值 == "")
        if (ary.length) return self.$message({
            message: self.$t('10247'),
            type: 'warning'
        })

        fullscreenLoading.value = true;

        idc.comeBackWork_post({
            order: batch,
            process: JSON.stringify(data)
        }).then(async (data: any) => {
            if (data.state.code == 200) {
                self.$message({
                    type: 'success',
                    message: self.$t('10117')
                })
                sx();
            }
        })
    }

    //**底部按钮
    const fullscreenLoading = ref(false);
    const bigBatch = ref();
    const localdata: any = ref();

    //将场地空闲出来
    function freeSite() {
        idc.changeToFree_post({
            field: formBatch.value.MNR
        })
    }

    //将状态改为已报未验
    function judgeFQC() {
        idc.changeThree_post({
            field: tableData1.value[0].ID
        }).then(async (data: any) => {
            fullscreenLoading.value = false;
            self.$ref.RefOpenInspectionNumber.open(tableData1);
        })
    }

    //检查是否可以报验
    async function okInspection(obj: any) {
        fullscreenLoading.value = true;
        //检查ERP中料有没有发足
        idc.checkSuite_post({
            field: formBatch.value.ANR,
            number: obj.inspectionNumber
        }).then(async (data: any) => {
            if (data.state.msg == 1) {
                //mes改为已报且验
                idc.already_post({
                    field: tableData1.value[0].ID
                }).then(async (data: any) => {
                    //生成FQC单子
                    createFQC()
                })
            } else {
                self.$message({
                    type: "warning",
                    message: self.$t('10156')
                })
                fullscreenLoading.value = false;
                sx()
            }
        })
    }

    //将报工数据存在本地
    function Storagelocal() {
        //判断本地有无数据
        let localdatas = {
            number: localdata.value,
            recodetime: m().format('YYYY-MM-DD')
        }
        localStorage.setItem("localdatas", JSON.stringify(localdatas))
        getstoragelocal();
    }

    function getstoragelocal() {
        let getlocalStorage: any = localStorage.getItem("localdatas");
        let datas = JSON.parse(getlocalStorage)
        formBatch.value.MNR = (datas ? datas.number : '');
        getAllDate();
    }

    //获得所有数据
    function getAllDate() {
        idc.backreportm_post({
            field: formBatch.value.MNR
        }).then(async (data: any) => {
            if (data.length) {
                formBatch.value.MNR = data[0].设备编号;
                formBatch.value.ANR = data[0].工单编号;
                tableData1.value = data;
                selectCheckOut()
                //图纸
                enterForDrawing()
                beforeOrder()
            }
        })
    }

    //完工
    function completeOrder() {
        fullscreenLoading.value = true;

        idc.finishOrder_post({
            field: formBatch.value.MNR
        }).then(async (data: any) => {
            changeJudge.value = 1;
            if (data.state.code == 10000) {
                self.$message({
                    type: 'warning',
                    message: data.state.msg
                })
                fullscreenLoading.value = false
            } else if (data.state.code == 200) {
                freeSite()
                bigBatch.value = data.state.bigBatch
                if (tableData1.value[0].是否完工 == '是') {
                    judgeFQC()
                } else {
                    self.$message({
                        type: 'success',
                        message: self.$t('10161')
                    })
                    sx();
                }
            }
        }).finally(() => {
            fullscreenLoading.value = false;
        })

    }

    //中断
    function interrupt() {
        fullscreenLoading.value = true;

        idc.updateworkno_post({
            field: formBatch.value.MNR
        }).then(async (data: any) => {
            fullscreenLoading.value = false;
            localdata.value = formBatch.value.MNR;
            if (data.state.code == 200) {
                freeSite()
                self.$message({
                    message: self.$t('10157'),
                    type: "warning"
                })
                //数据存本地
                Storagelocal();
                //刷新
                sx();
            } else {
                self.$message.error(self.$t('10158'))
            }

        }).finally(() => {
            fullscreenLoading.value = false;
        })
    }

    //报验
    function judgeCheck() {
        if (!tableData1.value.length || tableData1.value[0].是否完工 == null) return self.$message({
            type: 'danger',
            message: self.$t('10153')
        })

        self.$refs.RefOpenOrderInspection.open(tableData1);
    }

    const loopShuaxin: any = ref(null)

    //检查数量是否能报验
    function passCheck(obj: any) {
        fullscreenLoading.value = true;

        idc.checkSuite_post({
            field: formBatch.value.MNR,
            number: obj.inspectionNumber
        }).then(async (data: any) => {
            if (data.state.msg == 1) {
                //生成FQC单子
                createFQC()
            } else {
                self.$message({
                    type: "warning",
                    message: self.$t('10156')
                })
                fullscreenLoading.value = false;
                sx()
            }

        }).finally(() => {
            fullscreenLoading.value = false;
        })
    }

    //页面自动刷新
    function shuaxin() {
        loopShuaxin.value = setInterval(function () {
            location.reload()
        }, 1800000)
    }

    onMounted(() => {
        getstoragelocal();
        //页面自动刷新
        shuaxin();
    })

    onUnmounted(() => {
        clearTimeout(loopSx.value);
        loopSx.value = null;
        clearInterval(loopShuaxin.value)
        loopShuaxin.value = null;
    })
</script>

<style scoped lang="scss">
    .reporWork {
        width: 100%;
        height: 100%;

        &.yellow {
            background-color: yellow;

            ::v-deep .el-tabs {
                .el-tabs__item {
                    &.is-active {
                        background-color: yellow !important;
                    }
                }
            }

            ::v-deep .vxe-table {

                .vxe-table--header-wrapper {
                    background-color: yellow;
                }

                .vxe-table--body-wrapper {
                    background-color: yellow;
                }
            }
        }

        &.aliceblue {
            background-color: aliceblue;

            ::v-deep .el-tabs {
                .el-tabs__item {
                    &.is-active {
                        background-color: aliceblue !important;
                    }
                }
            }

            ::v-deep .vxe-table {

                .vxe-table--header-wrapper {
                    background-color: aliceblue;
                }

                .vxe-table--body-wrapper {
                    background-color: aliceblue;
                }
            }
        }

        &.red {
            background-color: $danger;

            ::v-deep .el-tabs {
                .el-tabs__item {
                    &.is-active {
                        background-color: $danger !important;
                    }
                }
            }

            ::v-deep .vxe-table {

                .vxe-table--header-wrapper {
                    background-color: $danger;
                }

                .vxe-table--body-wrapper {
                    background-color: $danger;
                }
            }
        }

        ::v-deep .vxe-table {
            color: $grey-dark;

            .vxe-header--row {
                .vxe-header--column {
                    line-height: 14px;
                    padding: 1px 0;
                    background-image: linear-gradient($grey-dark, $grey-dark), linear-gradient($grey-dark, $grey-dark);

                    .vxe-cell {
                        padding: 0 1px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }

            .vxe-body--column {
                padding: 1px 0 !important;
                background-image: linear-gradient($grey-dark, $grey-dark), linear-gradient($grey-dark, $grey-dark);

                .vxe-cell {
                    padding: 0 2px;

                    .el-button {
                        width: 100%;
                    }
                }

                &.bgw {
                    background-color: $white;
                }
            }

            .vxe-table--header-border-line, .vxe-table--border-line {
                border-color: $grey-dark;
            }

            .vxe-table--header-wrapper {
                color: $grey-dark;
            }
        }

        ::v-deep .el-tabs {
            .el-tabs__item {
                &.is-active {
                    border-right-color: $grey-dark;
                    border-left-color: $grey-dark
                }
            }
        }

        .r-t {
            height: calc(100% - 50px);

            ::v-deep .el-tabs {
                height: 100%;
                border-top: 0;
                background-color: transparent;

                .el-tabs__content {
                    height: calc(100% - 50px);
                    padding: 10px;
                    overflow-y: auto;
                    .el-tab-pane{
                        height: 100%;
                        .tab1{
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            .t-dt{
                                height: 32px;
                                font-size: 20px;
                                text-align: center;
                            }
                            .t-dp{
                                width: calc(100% - 262px);
                                flex: 1;
                                border: 0;
                            }
                        }
                    }
                }

                &.el-tabs--border-card {
                    box-shadow: none;
                    border-width: 1px 0 0 0;
                    background-color: transparent;
                }

                .el-tabs__header {
                    border-bottom-color: $grey-dark;
                    background-color: transparent;
                }

                .el-tabs__nav {
                    width: 100%;

                    .el-tabs__item {
                        &:nth-of-type(1) {
                            width: calc(18% + 1px);
                        }

                        &:nth-of-type(2) {
                            width: calc(16% + 2px);
                        }

                        &:nth-of-type(3) {
                            width: calc(22% + 1px);
                        }

                        &:nth-of-type(4) {
                            width: calc(22% + 1px);
                        }

                        &:nth-of-type(5) {
                            width: calc(22% + 1px);
                        }

                        height: 100%;
                        color: $grey-dark;
                        background-color: transparent;
                        white-space: normal;
                        text-align: center;
                        padding: 0;
                    }
                }

                .form5 {
                    .tit {
                        border: 1px solid $grey-dark;
                        border-bottom: 0;
                        margin-bottom: 0;

                        label {
                            padding: 0 10px;
                        }

                        .el-button {
                            float: right;
                        }
                    }
                }
            }

            .r-box {
                width: 260px;
                height: 53.8%;
                background-color: $white;
                border: 1px solid $grey-dark;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .3);
                position: fixed;
                right: 0;
                bottom: 50px;
                padding: 5px;
                z-index: 99;

                ::v-deep .el-form {
                    .el-input {
                        width: 180px;
                    }

                    .el-input-group__append {
                        padding: 0 20px;
                    }

                    .el-button {
                        height: 35px;
                        padding: 6px;
                        border-radius: 0 4px 4px 0;
                    }
                }

                .inspectionItem {
                    padding: 10px;

                    .work_judge_item {
                        &.judge_yes {
                            background-color: #f0f9eb;
                            border-color: #e1f3d8;
                            color: #67c23a;
                        }

                        &.judge_no {
                            background-color: #f0f9eb;
                            border-color: #e1f3d8;
                            color: red
                        }
                    }
                }
            }
        }

        .r-b {
            width: 100%;
            height: 50px;
            background-color: $bg;
            border-top: 1px solid $bd;
            display: flex;

            ::v-deep .el-button {
                flex: 1;
                margin: 0;
                border-radius: 0;
            }
        }
    }
</style>
