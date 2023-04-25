<template>
    <el-dropdown trigger="click"
                 @command="handleSetLanguage">
        <el-button round size="medium">
            {{languageZH[sys.language]}}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="sys.language==='zh'"
                              command="zh">简体中文
            </el-dropdown-item>
            <el-dropdown-item divided
                              :disabled="sys.language==='en'"
                              command="en">English
            </el-dropdown-item>
            <el-dropdown-item divided
                              :disabled="sys.language==='vi'"
                              command="vi">Tiếng Việt
            </el-dropdown-item>
            <el-dropdown-item divided
                              :disabled="sys.language==='es'"
                              command="es">Español
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script setup lang="ts">
    import {reactive, ref,toRefs} from 'vue';
    import i18n from '../lang'
    import {useSys} from '@/stores/sys';

    const sys = useSys()
    const languageZH: any = {
        'zh': '简体中文',
        'en': 'English',
        'vi': 'ภาษาไทย',
        'es': 'Español'
    }

    const handleSetLanguage = (lang: any) => {
        i18n.locale = lang
        sys.SETLanguage(lang)
        //location.reload();

        // document.documentElement.lang = lang
        // const title = `${this.$t(`sysName`)}`
        // document.title = title
        // this.$message({
        //   message: this.$t('changeLanguageTips').toString(),
        //   type: 'success'
        // })
    }
</script>

<style scoped lang="scss">

</style>

