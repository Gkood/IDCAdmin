<template>
    <Layout :header="header" :footer="footer">
        <div class="home">
            <div class="body scrollBar">
                <div>
                    <el-divider content-position="left">{{$t('10270')}}</el-divider>
                    <ul class="list clearfix">
                        <li v-for="(n,i) in sysList" :key="i" @click="goto(n)">
                            <div><img src="@/assets/logo.png"></div>
                            <p>{{$t(n.name)}}</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <el-divider content-position="left">{{$t('10271')}}</el-divider>
                    <ul class="list clearfix">
                        <li v-for="(n,i) in zjList" :key="i" @click="goto(n)">
                            <div><img src="@/assets/logo.png"></div>
                            <p>{{$t(n.name)}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
    import {getCurrentInstance, ref, unref, watch, computed, onMounted, nextTick} from 'vue';

    const self = (getCurrentInstance() as any).proxy;
    const header: any = {show: true}
    const footer: any = {show: true}

    const sysList: any[] = [
        //{name: '10207', path: '/capacity'},
        {name: '10195', path: '/paigong'},
        {name: '10208', path: '/startWork'},
        {name: '10242', path: '/reporWork'},
        {name: '10209', path: '/import'},
        //{name: '10210', path: '/material'},
    ]

    const zjList:any[] = [
        {name: '10097', path: '/fqc'},
        {name: '10098', path: '/routing'},
    ]

    function goto(n: { name: string, path: string }) {
        n.path ? self.$router.push({path: n.path}) : null;
    }


</script>

<style scoped lang="scss">
    .home {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;

        .body {
            width: 100%;
            height: 100%;
            padding: 0 20px;

            .list {
                > li {
                    width: 150px;
                    float: left;
                    margin: 0 20px 20px 0;
                    transition-duration: .5s;
                    cursor: pointer;

                    &:last-of-type {
                        margin-right: 0;
                    }

                    &:hover {
                        transform: translateY(-10px) scale(1.04);

                        > div {
                            box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
                        }
                    }

                    > div {
                        width: 150px;
                        height: 150px;
                        background-color: $bg;
                        border: 1px solid $bd;
                        padding: 10px;
                        border-radius: 4px;
                        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
                        display: flex;
                        align-items: center;

                        > img {
                            width: 100%;
                        }
                    }

                    > p {
                        width: 100%;
                        height: 56px;
                        max-width: 200px;
                        text-align: center;
                        padding: 2px 0;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
