<template>
    <Layout :header="header"
            :footer="footer"
            :tool="hTool"
            @on-back="back"
            @on-sel-wz="onSelWz">
        <div class="fqc">
            <div :class="['op','scrollBar',isExpand?'isExpand':null]">
                <div class="op-form">
                    <el-form ref="RefFormSearch"
                             :model="formSearch"
                             label-width="110px">
                        <el-form-item label-width="70px">
                            <el-switch
                                    v-model="formSearch.changeText"
                                    :active-text="$t('10123')"
                                    :inactive-text="$t('10122')">
                            </el-switch>
                        </el-form-item>
                        <el-form-item :label="$t('10276')">
                            <el-input v-model="formSearch.order"
                                      :placeholder="$t('10312')"
                                      @keyup.enter.native="selectFqcOrder"></el-input>
                        </el-form-item>
                        <el-form-item label-width="40px">
                            <el-button @click="selectFqcOrder" type="primary">{{$t('10043')}}</el-button>
                            <el-button @click="reset" type="info">{{$t('10124')}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="op-tab">
                    <el-tabs type="card"
                             stretch
                             v-loading="orderLoad">
                        <el-tab-pane :label="$t('10056')+'（'+fqcNumber.length+'）'" name="0">
                            <div class="op-tab-list">
                                <div v-for="item in fqcNumber"
                                     :key="item.序号"
                                     :class="['op-tab-items','primary',item.FQC单号==nowForm.FQC单号?'cur':null]"
                                     @click="intoDrawing(item)">
                                    {{ $t('10279')+": " + item.FQC单号 }}
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
                                <el-descriptions-item :label="$t('10276')">{{nowForm.FQC单号}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10017')">{{nowForm.料件编号}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10019')">{{nowForm.品名}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10020')">{{nowForm.规格}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10191')">{{nowForm.工单号码}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10280')">{{nowForm.制造部门}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10281')">{{nowForm.送验量}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10282')">{{nowForm.检验依据}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10276')"></el-descriptions-item>
                                <el-descriptions-item :label="$t('10283')">{{nowForm.报验人员}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10284')">{{nowForm.检验场地}}</el-descriptions-item>
                                <el-descriptions-item :label="$t('10285')">{{nowForm.报验时间}}</el-descriptions-item>
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
                                    :data="listBody"
                                    keep-source
                                    :edit-config="{trigger: 'click', mode: 'row', showStatus:true}">
                                <vxe-column field="序号" width="50" :title="$t('10286')"></vxe-column>
                                <vxe-column field="检验项目说明" :title="$t('10287')"></vxe-column>
                                <vxe-column field="特殊说明" :title="$t('10288')"></vxe-column>
                                <vxe-column field="AQL" title="AQL"></vxe-column>
                                <vxe-column field="Ac" title="Ac"></vxe-column>
                                <vxe-column field="Re" title="Re"></vxe-column>
                                <vxe-column field="检验量" :title="$t('10289')"></vxe-column>
                                <vxe-column field="缺点数" :title="$t('10290')" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-input v-model="row.缺点数" type="text"></vxe-input>
                                    </template>
                                </vxe-column>
                                <vxe-column field="检验结果备注" :title="$t('10291')" :edit-render="{}">
                                    <template #edit="{ row }">
                                        <vxe-select v-model="row.检验结果备注" placeholder="">
                                            <vxe-option v-for="item in options"
                                                        :key="item.value"
                                                        :value="item.value"
                                                        :label="item.label"></vxe-option>
                                        </vxe-select>
                                    </template>
                                </vxe-column>
                                <vxe-column v-if="showBody==0" :title="$t('10292')"
                                            fixed="right">
                                    <template #default="{ row }">
                                        <el-button type="primary" size="mini" class="btn"
                                                   @click="od(row)">{{$t('10293')}}
                                        </el-button>
                                    </template>
                                </vxe-column>
                            </vxe-table>
                        </div>
                        <div class="l-i-b-f">
                            <el-button type="warning"
                                       @click="odds()"
                                       v-if="showBody==1">{{$t('10294')}}
                            </el-button>
                            <el-button type="primary" @click="submit()">{{$t('10245')}}</el-button>
                            <el-button type="info" @click="remarks()">{{$t('10029')}}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <zk-drawer ref="RefZkDrawer" @save="toSave"></zk-drawer>
        <remarks-drawer ref="RefRemarksDrawer" @save="remarkSave"></remarks-drawer>
        <person-drawer ref="RefPersonDrawer" @save="personSave"></person-drawer>
        <submit-open  ref="RefSubmitOpen" @save="submitSave"></submit-open>
    </Layout>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, onUnmounted, nextTick} from 'vue';
    import {idc} from '@/api'
    import m from 'moment';
    import {useSys} from '@/stores/sys';
    import zkDrawer from './zkDrawer.vue'
    import remarksDrawer from './remarksDrawer.vue'
    import personDrawer from './personDrawer.vue'
    import submitOpen from './submitOpen.vue'

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    //全局状态管理器
    const sys = useSys()

    //组件参数
    const header: any = {show: true, title: '10274',back:true}
    const footer: any = {show: true}
    const hTool: any = {
        show: true,
        department: {
            data: [
                {label: '机加一科', value: 'J52210'},
                {label: '机加二科', value: 'J52221'},
                {label: '机加三科', value: 'J52230'},
                {label: '内销机加', value: 'J52222'},
                {label: '组装一科（1组）', value: 'J52511'},
                {label: '组装一科（2组）', value: 'J52512'}
            ],
            localField: 'FQClocal'
        }
    }

    function back() {
        self.$router.go(-1);
    }

    function onSelWz(obj: any) {
        department.value = obj;
        getFqcOrder();
    }

    //**表单
    const formSearch: any = ref({
        changeText: true,
        order: "",
    })
    //指定工单
    const inputGongdan = ref('');

    //获取工单
    function getFqcOrder() {
        orderLoad.value = true;
        idc.fqcSelect_post({
            field: department.value
        }).then((data: any) => {
            fqcNumber.value = data;
            orderLoad.value = false;
        }).finally(() => {
            orderLoad.value = false;
        })
    }

    //查询
    function selectFqcOrder() {
        let ary1 = (fqcNumber.value.length ? fqcNumber.value.filter((param: any) => {
            return param.FQC单号.match(new RegExp(formSearch.value.order))
        }) : fqcNumber.value);
        fqcNumber.value = ary1;
    }

    function reset() {
        formSearch.value.order = '';
        nowForm.value = '';
        showMain.value = false;
        getFqcOrder();
    }

    //**工单列表
    //加载
    const orderLoad = ref(false);
    const fqcNumber: any = ref([])
    const showBody = ref(0);

    function intoDrawing(item: any) {
        loading.value = true;
        showMain.value = true
        nowForm.value = item;
        showBody.value = (formSearch.value.changeText ? 0 : 1)
        idc.getFqcListBody_post({
            field: item.FQC单号
        }).then((data: any) => {
            if (data.state.code == 200) {
                listBody.value = data.state.msg
            }
            loading.value = false;
        }).finally(() => {
            loading.value = false;
        })
    }

    //**工单详情
    const showMain = ref(false)
    const nowForm: any = ref({})
    const department: any = ref('');
    const isExpand = ref(false)

    function expand() {
        isExpand.value = !isExpand.value;
    }

    async function getLocalStore() {
        department.value = localStorage.getItem("FQClocal");
    }

    const loading = ref(false);
    const listBody: any = ref([
        {
            序号: '0',
            检验项目说明: '法兰孔径',
            特殊说明: '12-Φ28±0.5',
            AQL: '1.00',
            Ac: '0',
            Re: '1',
            检验量: '3',
            缺点数: 0,
            检验结果备注: '',
        }
    ])
    const options: any = ref([
        {value: 'Φ', label: 'Φ'},
        {value: '±', label: '±'},
        {value: 'φ', label: 'φ'}
    ])
    const firstNumber: any = ref('25');
    const finalNumber: any = ref('50');
    const note = ref('');

    function od(obj: any) {
        self.$refs.RefZkDrawer.open(obj, firstNumber.value, finalNumber.value)
    }

    const overall: any = ref()

    const personDetail = ref(false)

    function odds() {
        let item = new Array()
        let number = new Array()
        let a = 0
        let items = new Array()
        for (let i = 0; i < listBody.value.length; i++) {
            //item.push({key:this.listBody[i].序号,label:this.listBody[i].检验项目说明,value:this.listBody[i].特殊说明,number:'',color:''})
            number.push(listBody.value[i].检验量)
        }
        for (let q = 0; q < number.length; q++) {
            if (a < number[q]) {
                a = number[q]
            }
        }
        for (let j = 0; j < number.length; j++) {
            for (let z = 0; z < number[j]; z++) {
                item.push({
                    key: j,
                    j: {
                        key: z,
                        z: {
                            key: listBody.value[j].序号,
                            label: listBody.value[j].检验项目说明,
                            value: listBody.value[j].特殊说明,
                            number: '',
                            color: ''
                        }
                    }
                })
            }
        }
        for (let u = 0; u < a; u++) {
            for (let y = 0; y < item.length; y++) {
                if (item[y].j.key == u) {
                    items.push({number: y, z: item[y]})
                }
            }
        }
        overall.value = items
        personDetail.value = true
        self.$refs.RefPersonDrawer.open(overall.value, firstNumber.value, finalNumber.value)
    }

    function submit() {
        self.$refs.RefSubmitOpen.open()
    }

    function remarks() {
        self.$refs.RefRemarksDrawer.open()
    }

    function toSave(obj: any) {
        obj.nowSite >= 0 ? (listBody.value[obj.nowSite].缺点数 = obj.number) : null;
        idc.saveDetail_post({
            fqc: nowForm.value.FQC单号,
            order: nowForm.value.工单号码,
            material: nowForm.value.料件编号,
            item: obj.site,
            dep: nowForm.value.制造部门,
            detail: obj.detail
        })
    }

    function remarkSave(obj: any) {
        note.value = obj.textarea
    }

    function personSave(obj: any){
        let num = 0;
        for (let j = 0; j < listBody.value.length; j++) {
            for (let i = 0; i < obj.overall.length; i++) {
                if (j == obj.overall[i].z.key && obj.overall[i].z.j.z.color == "#F56C6C") {
                    num = num + 1;
                }
            }
            listBody.value[j].缺点数 = num
            num = 0
        }
    }

    function submitSave(obj: any) {
        idc.saveFQCRecord_post({
            a: nowForm.value.FQC单号,
            b: nowForm.value.工单号码,
            c: obj.personNumber
        })
        submitFQC(obj);
    }

    function submitFQC(obj:any) {
        const loading = self.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
        });
        let datas = ""
        let data01 = "<Request><Access><Authentication user=\"tiptop\" password=\"\"/><Connection application=\"OMS\"source=\"192.168.10.31\"/> <Organization name=\"IDCNT10\"/> <Locale language=\"zh_cn\"/></Access><RequestContent><Document><RecordSet id=\"1\"><Master name=\"qcf_file\"><Record><Field name=\"qcf01\" value=" + '"' + nowForm.value.FQC单号 + '"' + "/>" + "<Field name=\"qcf02\" value=" + '"' + nowForm.value.工单号码 + '"' + "/>" + "<Field name=\"qcf13\" value=" + '"' + obj.personNumber + '"' + "/>" + "<Field name=\"qcf09\" value=\"1\"/>" + "<Field name=\"qao06z\" value=" + '"' + note.value + '"' + "/>" + " <Detail name=\"qcg_file\" node_id=\"1_1\">"
        let data02 = "</Detail></Record></Master></RecordSet></Document></RequestContent></Request>"
        let data03 = ""
        for (let i = 0; i < listBody.value.length; i++) {
            if (listBody.value[i].特殊说明 == null) {
                listBody.value[i].特殊说明 = ''
            }
            data03 = data03 + "<Record><Field name=\"qcg03\" value=" + '"' + listBody.value[i].序号 + '"' + "/><Field name=\"qcg04\" value=" + '"' + listBody.value[i].检验项目 + '"' + "/><Field name=\"qcg07\" value=" + '"' + listBody.value[i].缺点数 + '"' + "/><Field name=\"qcgud03\" value=" + '"' + listBody.value[i].检验结果备注 + '"' + "/><Field name=\"qao06\" value=\"\"/></Record>"
        }
        datas = data01 + data03 + data02
        idc.getErpApiNew_post({
            url: 'http://192.168.10.167/web/ws/r/aws_ttsrv2_toptest?WSDL',
            param: datas,
            func: 'FqcConfirm'
        }).then((data:any)=>{
            let parser:any = new DOMParser();
            let xmlObj:any = parser.parseFromString(data, "text/xml");
            let json:any = xmlObj.getElementsByTagName("Execution")[0]
            let jsons:any = json.childNodes[1].attributes;
            let code:any = jsons[0].nodeValue
            let FQC:any = jsons[2].nodeValue
            if (code == "0") {
                self.$message({
                    type: 'success',
                    message: FQC
                })
            } else {
                self.$message({
                    type: 'warning',
                    message: FQC
                })
            }
            loading.close();
            sx()
        })
    }

    const loopSx: any = ref(null)

    //报工后刷新
    function sx() {
        loopSx.value = setTimeout(function () {
            location.reload()
        }, 3000)
    }

    onMounted(async () => {
        await getLocalStore();
        await getFqcOrder();
    })

    onUnmounted(() => {
        clearTimeout(loopSx.value);
        loopSx.value = null;
    })
</script>

<style scoped lang="scss">
    .fqc {
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
                height: 150px;
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
