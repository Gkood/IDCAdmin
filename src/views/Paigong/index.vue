<template>
    <Layout :header="header" :footer="footer">
        <div class="paigong">
            <div class="op scrollBar">
                <p>{{$t('10033')}}</p>
                <div class="op-form">
                    <el-form ref="RefFormSearch"
                             :model="formSearch"
                             label-width="100%">
                        <el-form-item :label="$t('10171')"
                                      prop="startTime"
                                      :rules="{
                                        required: formSearch.endTime ? true : false, message: '', trigger: 'change'
                                      }">
                            <el-date-picker v-model="formSearch.startTime"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            :picker-options="{
                                              disabledDate (time) {
                                                  let end = new Date(formSearch.endTime).getTime();
                                                  return end?(time.getTime() > end):null
                                              }
                                            }"
                                            :placeholder="$t('10173')"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="$t('10172')"
                                      prop="endTime"
                                      :rules="{
                                        required: formSearch.startTime ? true : false, message: '', trigger: 'change'
                                      }">
                            <el-date-picker v-model="formSearch.endTime"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            :picker-options="{
                                              disabledDate (time) {
                                                  let start = new Date(formSearch.startTime).getTime() - 8.63e7;
                                                  return start?(time.getTime() < start):null
                                              }
                                            }"
                                            :placeholder="$t('10174')"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="$t('10037')"
                                      prop="isArrange">
                            <el-select v-model="formSearch.isArrange"
                                       :placeholder="$t('10175')">
                                <el-option v-for="(res,i) in selectAry"
                                           :key="i"
                                           :label="$t(res.label)"
                                           :value="res.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('10041')">
                            <el-input v-model="inputGongdan"
                                      :placeholder="$t('10042')"
                                      @keyup.enter.native="searchFor"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('10055')">
                            <el-input v-model="inputMaterial"
                                      :placeholder="$t('10176')"
                                      @keyup.enter.native="searchFor"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="searchFor" type="primary">{{$t('10043')}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="op-tab">
                    <el-tabs v-model="activeName"
                             type="card"
                             stretch
                             v-loading="orderLoad"
                             @tab-click="tabSwitch">
                        <el-tab-pane :label="$t('10056')+'（'+newOrder.length+'）'" name="0">
                            <div class="op-tab-list">
                                <div v-for="o in newOrder"
                                     :key="o.序号"
                                     :class="['op-tab-items',o.是否派工 == '是' ?'success':(o.当前状态=='0'?'warning':'primary'),o.序号==currentWB.序号?'cur':null]"
                                     @click="getWorkBill(o)">
                                    <i class="el-icon-data-analysis"></i>
                                    {{ $t('10177')+":" + o.工单编号 +" " + $t('10178') +':'+o.料件编号 }}
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('10170')+'（'+oldOrder.length+'）'" name="1">
                            <div class="op-tab-list">
                                <div v-for="o in oldOrder"
                                     :key="o.序号"
                                     :class="['op-tab-items','error',o.序号==currentWB.序号?'cur':null]"
                                     @click="getOldBill(o)">
                                    <i class="el-icon-data-analysis"></i>
                                    {{ $t('10177')+ o.工单编号 + (o.副料号||'') }}
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="list">
                <div class="l-bg" v-if="!isGetBill">
                    <img src="../../assets/bg.png">
                </div>
                <div class="l-info" v-else>
                    <div class="l-i-h">
                        <el-button class="l-i-h-l"
                                   icon="el-icon-back"
                                   @click="goBack">{{$t('10060')}}
                        </el-button>
                        <div class="l-i-h-c">
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
                        <div class="l-i-h-r">
                            <el-switch
                                    v-model="isLock"
                                    :active-text="$t('10063')"
                                    :inactive-text="$t('10062')"
                                    active-color="red">
                            </el-switch>
                        </div>
                    </div>
                    <div class="l-i-tip">
                        <el-alert
                                :title="$t(tag.name)"
                                :type="tag.type"
                                center
                                show-icon>
                        </el-alert>
                    </div>
                    <div class="l-i-b">
                        <el-tabs v-model="listName" type="border-card">
                            <el-tab-pane :label="$t('10180')"
                                         name="first"
                                         class="tab-first scrollBar">
                                <div class="tab-first-l">
                                    <el-form ref="form" :model="workers" label-position="top">
                                        <el-form-item :label="$t('10016')+'：'" class="labelBold">
                                            {{workers.工单编号}}
                                        </el-form-item>
                                        <el-form-item :label="$t('10181')+'：'" class="labelBold">
                                            {{workers.副料号}}
                                        </el-form-item>
                                        <el-form-item :label="$t('10067')+'：'" class="labelRed">
                                            <el-autocomplete
                                                    v-model="workers.area"
                                                    :fetch-suggestions="areaSearch"
                                                    :placeholder="$t('10105')"
                                                    :disabled="currentWB.是否派工 == '是'">
                                                <i> </i>
                                                <template slot-scope="{ item }">
                                                    <label class="name primary">{{ item.value }}</label>
                                                    <label class="addr" :title="item.address">({{ item.address
                                                        }})</label>
                                                </template>
                                            </el-autocomplete>
                                        </el-form-item>
                                        <el-form-item :label="$t('10066')+'：'" class="labelRed">
                                            <el-autocomplete
                                                    v-model="workers.person"
                                                    :fetch-suggestions="personSrarch"
                                                    :placeholder="$t('10079')"
                                                    @select="personSelect"
                                                    :disabled="currentWB.是否派工 == '是'">
                                                <template slot-scope="{ item }">
                                                    <label class="name primary">{{ item.value }}</label>
                                                    <label class="addr"
                                                           :title="item.name+' '+item.department">
                                                        ({{item.name }} {{ item.department }})</label>
                                                </template>
                                            </el-autocomplete>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="warning" @click='produceProcess'>{{$t('10182')}}
                                            </el-button>
                                        </el-form-item>
                                        <el-form-item v-if="!isOldBill&&currentWB.是否派工 == '否'">
                                            <!--指派和取消指派按钮-->
                                            <el-button
                                                    type="primary"
                                                    @click="dispatch">{{$t('10183')}}
                                            </el-button>
                                        </el-form-item>
                                        <el-form-item v-if="!isOldBill&&currentWB.是否派工 == '是'">
                                            <!--指派和取消指派按钮-->
                                            <el-button
                                                    type="danger"
                                                    @click="cancelDispatch">{{$t('10184')}}
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <div class="tab-first-r">
                                    <div><label>{{$t('10068')}}：</label>{{ currentWB.工厂 }}</div>
                                    <div><label>{{$t('10178')}}：</label>{{ currentWB.料件编号 }}</div>
                                    <div><label>{{$t('10185')}}：</label>{{ currentWB.品名 }}</div>
                                    <div><label>{{$t('10186')}}：</label>{{ currentWB.工单数 }}</div>
                                    <div><label>{{$t('10187')}}：</label>{{ currentWB.设备 }}</div>
                                    <div><label>{{$t('10027')}}：</label>{{ currentWB.本周计划数 }}</div>
                                    <div><label>{{$t('10188')}}：</label>{{everydaynumbers}}{{ average }}</div>
                                    <div><label>{{$t('10189')}}：</label>{{ currentWB.创建时间 }}</div>
                                    <div><label>{{$t('10190')}}：</label>{{ currentWB.完工日 }}</div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane :label="$t('10069')"
                                         name="second"
                                         class="tab-second">
                                <el-descriptions>
                                    <el-descriptions-item :label="$t('10191')">
                                        <el-tag>{{currentWB.工单编号}}</el-tag>
                                    </el-descriptions-item>
                                    <el-descriptions-item :label="$t('10070')">
                                        <el-tag>{{currentWB.料件编号}}</el-tag>
                                    </el-descriptions-item>
                                    <el-descriptions-item :label="$t('10071')">
                                        <el-tag>{{currentWB.工单数}}</el-tag>
                                    </el-descriptions-item>
                                </el-descriptions>
                                <el-table :data="tableData"
                                          ref="myTable"
                                          border
                                          height="calc(100% - 50px)"
                                          :row-class-name="tableRowClassName">
                                    <el-table-column
                                            type="index"
                                            :label="$t('10192')"
                                            width="80"
                                            fixed></el-table-column>
                                    <el-table-column
                                            prop="料号"
                                            :label="$t('10178')"
                                            min-width="120"
                                            fixed></el-table-column>
                                    <el-table-column
                                            prop="品名"
                                            :label="$t('10019')"
                                            min-width="200"></el-table-column>
                                    <el-table-column
                                            prop="规格"
                                            :label="$t('10020')"
                                            min-width="100"></el-table-column>
                                    <el-table-column
                                            prop="单位用量"
                                            :label="$t('10072')"
                                            min-width="80"></el-table-column>
                                    <el-table-column
                                            prop="已发数量"
                                            :label="$t('10073')"
                                            min-width="80"></el-table-column>
                                    <el-table-column
                                            prop="应发数量"
                                            :label="$t('10074')"
                                            min-width="80"></el-table-column>
                                    <el-table-column
                                            prop="库存量"
                                            :label="$t('10075')"
                                            min-width="80"></el-table-column>
                                    <el-table-column
                                            prop="在制量"
                                            :label="$t('10076')"
                                            min-width="80"></el-table-column>
                                    <el-table-column
                                            prop="受订量"
                                            :label="$t('10077')"
                                            min-width="80"></el-table-column>
                                    <el-table-column
                                            prop="IQC量"
                                            :label="$t('10193')"
                                            min-width="80"></el-table-column>
                                </el-table>

                            </el-tab-pane>
                            <el-tab-pane :label="$t('10078')"
                                         name="third"
                                         class="tab-third"
                                         disabled>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, onUnmounted, nextTick} from 'vue';
    import {idc} from '@/api'
    import m from 'moment';
    import {useSys} from '@/stores/sys';

    //**基础参数
    //this
    const self = (getCurrentInstance() as any).proxy;

    //全局状态管理器
    const sys = useSys()

    //组件参数
    const header: any = {show: true, title: '10195'}
    const footer: any = {show: true}

    //**工单列表
    //加载
    const orderLoad = ref(false);
    //表单
    const formSearch: any = ref({
        fac: "idc001",
        startTime: undefined,
        endTime: undefined,
        isArrange: undefined,
    })
    //指定工单
    const inputGongdan = ref('');
    //指定设备
    const inputMaterial = ref('');
    //是否指派
    const selectAry = ref([
        {value: "ALL", label: '10038'},
        {value: "是", label: '10039'},
        {value: "否", label: '10040'},
    ])

    //查询工单列表
    async function searchFor() {
        self.$refs.RefFormSearch.validate((valid: boolean) => {
            if (valid) {
                orderLoad.value = true;
                formSearch.value.startTime = (formSearch.value.startTime || undefined);
                formSearch.value.endTime = (formSearch.value.endTime || undefined);
                if (!formSearch.value.startTime && !formSearch.value.endTime) {
                    //去除时间范围查询全部
                    idc.getWorkOrderList_get({fac: formSearch.value.fac}).then(async (data: any) => {
                        if (!inputGongdan.value && !inputMaterial.value) {
                            newOrder.value = weizhi.value ? data.state.msg.filter((param: any) => {
                                return param.科室.match(new RegExp(weizhi.value))
                            }) : data.state.msg;
                        } else {
                            await filterGD(data.state.msg);
                        }
                        orderLoad.value = false;
                    }).finally(()=>{
                        orderLoad.value = false;
                    })
                } else {
                    idc.getWorkOrderList_post(formSearch.value).then(async (data: any) => {
                        if (!inputGongdan.value && !inputMaterial.value) {
                            newOrder.value = data.state.msg;
                        } else {
                            await filterGD(data.state.msg);
                        }
                        orderLoad.value = false;
                    }).finally(()=>{
                        orderLoad.value = false;
                    })
                }
            } else {
                return false;
            }
        });
    }

    //查询旧工单列表
    async function searchForOld() {
        idc.getFinsihOrderList_get().then((data: any) => {
            oldOrder.value = data.state.msg;
        })
    }

    //过滤工单数据
    async function filterGD(listCopy: any) {
        let ary1 = inputGongdan.value ? listCopy.filter((param: any) => {
            return param.工单编号.match(new RegExp(inputGongdan.value))
        }) : listCopy;
        let ary2 = inputMaterial.value ? ary1.filter((param: any) => {
            return param.设备.match(new RegExp(inputMaterial.value))
        }) : ary1;
        newOrder.value = ary2;
    }

    //tab切换状态
    const activeName = ref('0')

    //切换工单类型
    function tabSwitch(obj: any) {
        activeName.value = obj.index
    }

    //当前工单列表
    const newOrder = ref([])
    //已开未完列表
    const oldOrder = ref([])
    //是否正在查询工单详情状态
    const isGetBill = ref(false)
    //是否是旧工单
    const isOldBill = ref(false)

    //点击获取工单详情
    function getWorkBill(obj: any) {
        isGetBill.value = true;
        currentWB.value = obj;
        isOldBill.value = false;
        listName.value = 'first';

        tag.value = tagType.value[(currentWB.value.是否派工 == '是' ? 1 : 0)];
        let {工单编号, 副料号, 设备号, 工号} = currentWB.value;
        workers.value.工单编号 = 工单编号;
        workers.value.副料号 = 副料号;
        //获取场地和人员
        if (obj.是否派工 == "是") {
            idc.getPersonAndMaterial_post({id: obj.序号}).then((data: any) => {
                workers.value.area = data.state.msg[0].场地;
                workers.value.person = data.state.msg[0].人员
            })
        } else {
            workers.value.area = 设备号;
            workers.value.person = 工号;
        }
        //每日排程
        segmentation();
        //物料查看
        getMaterialDataForAll(obj);
    }

    function getOldBill(obj: any) {
        isGetBill.value = true;
        currentWB.value = obj;
        isOldBill.value = true;
        listName.value = 'first';

        //赋值
        tag.value = tagType.value[(currentWB.value.是否派工 == '是' ? 3 : 2)];
        let {工单编号, 副料号, 设备号, 工号} = currentWB.value;
        workers.value.工单编号 = 工单编号;
        workers.value.副料号 = 副料号;
        workers.value.area = 设备号;
        workers.value.person = 工号;
        //当日排程量
        let js = obj.每日排程;
        let json = JSON.parse(js);
        let oldTime = obj.创建时间;
        let arrDate = oldTime.split("-");
        for (let i = arrDate[2]; i < 365; i++) {
            if (arrDate[2] < 32) {
                arrDate[2]++;
            } else if (arrDate[2] == 32) {
                arrDate[1]++;
                arrDate[2] = 1;
            }
            var nowDate =
                arrDate[0] +
                "-" +
                ("0" + arrDate[1]).substr(-2) +
                "-" +
                ("0" + arrDate[2]).substr(-2);
            var jsons = json[nowDate];
            if (jsons) {
                break;
            }
        }
        everydaynumbers.value = jsons;

        //物料查看
        getMaterialDataForAll(obj);
    }

    //当日排程
    function segmentation() {
        average.value = "";
        let js = currentWB.value.每日排程;
        if (js == "" || js == null) {
            let everyweekNumber = currentWB.value.本周计划数;
            everydaynumbers.value = Math.ceil(everyweekNumber / 7);
            average.value = "平均";
        } else {
            let json = JSON.parse(js);
            let jsons = json[m().format('YYYY-MM-DD')];
            everydaynumbers.value = jsons;
        }
    }

    //**工单详情
    //返回
    const goBack = () => {
        isGetBill.value = false;
    }
    //科室选项
    const options_weizhi: any = ref([
        {value: "红冲科", label: '10196'},
        {value: "机加科", label: '10197'},
        {value: "总装科", label: '10198'},
    ])
    //选择科室
    const weizhi: any = ref('');

    //选择科室
    function storagelocal() {
        localStorage.setItem("localdata", weizhi.value);
    }

    //读取本地科室
    function getLocal() {
        weizhi.value = localStorage.getItem("localdata");
    }

    //是否绑定
    const isLock = ref(true)
    //指派状态
    const tagType: any = ref({
        0: {
            name: "10064", // 尚未指派
            type: "error",
        },
        1: {
            name: "10065", // 已经指派
            type: "success",
        },
        3: {
            name: "10200", // 已经开工
            type: "success",
        },
        2: {
            name: "10199", // 未走流程，但是已经开工
            type: "warning",
        }
    })
    const tag: any = ref(tagType.value[0]);

    //**切换工单详情
    //当前列名
    const listName = ref('first')

    //**派工
    //派工表单
    const workers: any = ref({
        area: '',
        person: ''
    })
    //当前选中工单详情
    const currentWB: any = ref({})
    //当日排程量
    const everydaynumbers: any = ref();
    const average: any = ref();
    //设备列表
    const shebei: any = ref([])

    //获取设备
    async function getShebei() {
        idc.getMachList_get().then((data: any) => {
            shebei.value = data.state.msg;
        })
    }

    //工作场地
    async function areaSearch(queryString: any, cb: any) {
        cb(await filterddress())
    }

    //工作场地过滤
    async function filterddress() {
        let ary1 = workers.value.area ? shebei.value.filter((param: any) => {
            return param.value.toLowerCase().match(new RegExp(workers.value.area.toLowerCase()))
        }) : shebei.value;

        let ary2 = weizhi.value ? ary1.filter((param: any) => {
            return param.address.match(new RegExp(weizhi.value))
        }) : ary1;
        return ary2;
    }

    //选择工作场地
    function areaSelect() {

    }

    //派工人员列表
    const person: any = ref([])

    //获取人员列表
    async function getPerson() {
        idc.getStaffList_get().then((data: any) => {
            person.value = data.state.msg;
        })
    }

    //派工人员数据
    async function personSrarch(queryString: any, cb: any) {
        cb(await filterPeople())
    }

    //派工人员过滤
    async function filterPeople() {
        let ary1 = workers.value.person ? person.value.filter((param: any) => {
            return param.value.toLowerCase().match(new RegExp(workers.value.person.toLowerCase()))
        }) : person.value;

        let ary2 = weizhi.value ? ary1.filter((param: any) => {
            return param.department.match(new RegExp(weizhi.value))
        }) : ary1;
        return ary2;
    }

    //选择派工人员
    function personSelect() {

    }

    //工序分离
    function produceProcess() {
        self.$confirm(self.$t('10194') + '?', self.$t('10204'), {
            confirmButtonText: self.$t('10015'),
            cancelButtonText: self.$t('10048'),
            type: 'warning'
        }).then(() => {
            idc.proProcess_post({
                id: currentWB.value.序号
            }).then((res: any) => {
                self.$message({
                    type: 'success',
                    message: res.data.state.msg
                })
            })
        }).catch(() => {

        });
    }

    //指派工单
    function dispatch() {
        if (weizhi.value) {
            if (workers.value.area) {
                if (workers.value.person) {
                    self.$confirm(`${self.$t('10201')}<label class="primary"> [ ${workers.value.工单编号} ] </label>${self.$t('10202')}<label class="primary"> [ ${workers.value.副料号} ] </label>${self.$t('10203')}<label class="primary"> [ ${workers.value.area} ] </label> ？`, self.$t('10204'), {
                        confirmButtonText: self.$t('10015'),
                        cancelButtonText: self.$t('10048'),
                        dangerouslyUseHTMLString: true,
                        type: 'warning'
                    }).then(() => {
                        idc.postDispatch_post({
                            id: currentWB.value.序号.toString(),
                            workOrderID: workers.value.工单编号.toString(),
                            empid: workers.value.person.toString().split(" ")[0],
                            machid: workers.value.area,
                            dep: weizhi.value,
                            fac: formSearch.value.fac,
                            process: workers.value.副料号.toString()
                        }).then((res: any) => {
                            if (res.state.code == "200") {
                                self.$message({
                                    type: "success",
                                    message: res.state.msg,
                                });
                                currentWB.value.是否派工 = "是";
                                tag.value = tagType.value[(currentWB.value.是否派工 == '是' ? 1 : 0)];
                            } else {
                                self.$message({
                                    type: "failure",
                                    message: res.state.msg,
                                });
                            }
                        })
                    }).catch(() => {
                        self.$message({
                            type: "warning",
                            message: self.$t('10206'),
                        });
                    });
                } else {
                    self.$message({
                        type: "warning",
                        message: self.$t('10079'),
                    });
                }
            } else {
                self.$message({
                    type: "warning",
                    message: self.$t('10080'),
                });
            }
        } else {
            self.$message({
                type: "warning",
                message: self.$t('10001'),
            });
        }
    }

    //取消指派
    function cancelDispatch() {
        self.$confirm(self.$t('10048') + '?', self.$t('10204'), {
            confirmButtonText: self.$t('10015'),
            cancelButtonText: self.$t('10048'),
            type: 'warning'
        }).then(() => {
            idc.cancelDispatch_post({
                id: currentWB.value.序号.toString(),
                workOrderID: workers.value.工单编号.toString(),
                fac: formSearch.value.fac
            }).then((res: any) => {
                if (res.state.code == '200') {
                    currentWB.value.是否派工 = "否";
                    tag.value = tagType.value[(currentWB.value.是否派工 == '是' ? 1 : 0)];
                } else {
                    alert(self.$t('10083') + res.state.msg);
                }
            })
        }).catch(() => {

        });
    }

    //**物料查看
    //列表数据
    const tableData = ref([])

    //获取数据
    function getMaterialDataForAll(obj: any) {
        idc.getMaterialDataForAll_post({workOrder: obj.工单编号}).then((data: any) => {
            tableData.value = data.state.msg;
            self.$refs.myTable.doLayout();
        })
    }

    const tableRowClassName = ({row}: any) => {
        if (row.已发数量 < row.应发数量) {
            return "warm-row";
        }
        return "";
    }

    const loopTime:any = ref(null)

    function refresh() {
        loopTime.value = setInterval(function () {
            location.reload();
        }, 3600000);
    }

    //修复切换多语言表格显示异常
    watch(
        () => {
            return [sys.language, listName.value]
        },
        () => {
            nextTick(() => {
                self.$refs.myTable ? self.$refs.myTable.doLayout() : null;
            })
        },
        {deep: true},
    )

    onMounted(async () => {
        await getLocal();
        await searchFor();
        formSearch.value = {
            fac: "idc001",
            startTime: m().format('YYYY-MM-DD'),
            endTime: m().format('YYYY-MM-DD'),
            isArrange: 'ALL'
        }
        await searchForOld();
        await getShebei();
        await getPerson();
        await refresh();
    })

    onUnmounted(() => {
        clearInterval(loopTime.value);
        loopTime.value = null;
    })

</script>

<style scoped lang="scss">
    .paigong {
        width: 100%;
        height: 100%;
        display: flex;

        .op {
            width: 22vw !important;
            min-width: 360px;
            height: 100%;
            border-right: 1px solid $bd;

            > p {
                text-align: center;
                padding: 8px 0;
                border-bottom: 1px solid $bd;
                background-color: $bg;
                font-weight: bold;
            }

            .op-form {
                height: 250px;
                display: flex;
                flex-direction: row;
                padding: 10px;

                ::v-deep .el-form-item {
                    margin-bottom: 2px;

                    .el-form-item__content {
                        .el-input, .el-button {
                            width: 160px;
                        }
                    }

                    .el-form-item__error {
                        display: none;
                    }
                }
            }

            .op-tab {
                height: calc(100% - 291px);
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
            width: calc(100% - 360px);
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
                        width: 100px;
                        height: 40px;
                        border: 0;
                        border-radius: 0;
                    }

                    .l-i-h-c {
                        flex: 1;
                        text-align: center;
                    }

                    .l-i-h-r {
                        width: 200px;
                    }
                }

                .l-i-b {
                    height: calc(100% - 80px);

                    ::v-deep .el-tabs {
                        height: 100%;

                        &.el-tabs--border-card {
                            box-shadow: none;
                            border-width: 1px 0 0 0;
                        }

                        .el-tabs__content {
                            padding: 0;
                            height: calc(100% - 39px);

                        }
                    }

                    .tab-first {
                        height: 100%;
                        display: flex;
                        padding: 10px;
                        overflow-y: scroll;

                        .tab-first-l {
                            width: 260px;

                            ::v-deep .el-form-item {
                                margin-bottom: 2px;

                                .el-form-item__content {
                                    .el-input, .el-button {
                                        min-width: 210px;
                                    }
                                }

                                .el-form-item__error {
                                    display: none;
                                }
                            }

                            .labelRed {
                                ::v-deep .el-form-item__label {
                                    color: $danger;
                                    font-weight: bold;
                                    font-size: 18px;
                                    padding-bottom: 0;
                                    line-height: 28px;
                                }
                            }

                            .labelBold {
                                ::v-deep .el-form-item__label {
                                    font-weight: bold;
                                    padding-bottom: 0;
                                    line-height: 24px;
                                }
                            }
                        }

                        .tab-first-r {
                            flex: 1;
                            margin-left: 20px;
                            font-size: 18px;

                            label {
                                font-weight: bold;
                            }
                        }
                    }

                    .tab-second {
                        height: calc(100% - 10px);
                        padding: 10px;

                        ::v-deep .el-descriptions {
                            .el-descriptions-item {
                                &:first-of-type {
                                    width: 256px;
                                }
                            }

                            .el-descriptions-item__label {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }

                            .el-tag {
                                font-weight: bold;
                                font-size: 18px;
                            }
                        }

                        ::v-deep .warm-row {
                            background-color: yellow !important;

                            &.hover-row {
                                .el-table__cell {
                                    background-color: yellow !important;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
