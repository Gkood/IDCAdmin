<template>
    <Layout :header="header"
            :footer="footer"
            :tool="hTool"
            @on-back="back"
            @on-sel-wz="onSelWz">
        <div class="fqc">
            <div class="op scrollBar">
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
                                      @keyup.enter.native="searchFor"></el-input>
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

                    </div>
                    <div class="l-i-b">

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
    const header: any = {show: true, title: '10274'}
    const footer: any = {show: true}
    const hTool: any = {
        show: true,
        backShow: true,
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

    function onSelWz(obj:any) {
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

    function intoDrawing(item: any) {
        showMain.value = true
        nowForm.value = item;
    }


    //**工单详情
    const showMain = ref(false)
    const nowForm: any = ref({})


    const department: any = ref('');

    async function getLocalStore() {
        department.value = localStorage.getItem("FQClocal");
    }

    onMounted(async () => {
        await getLocalStore();
        await getFqcOrder();
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

                }
            }
        }
    }
</style>
