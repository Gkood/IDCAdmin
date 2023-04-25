import Vue from 'vue'
import VueI18n from 'vue-i18n'

import {getLanguage} from '../utils/cookies'

// element-ui built-in lang
//@ts-ignore
import elementEnLocale from 'element-ui/lib/locale/lang/en'
//@ts-ignore
import elementViLocale from 'element-ui/lib/locale/lang/vi'
//@ts-ignore
import elementEsLocale from 'element-ui/lib/locale/lang/es'
//@ts-ignore
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'


// User defined lang
import enLocale from './en'
import zhLocale from './zh'
import viLocale from './vi'
import esLocale from './es'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale,
        ...enUS
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale,
        ...zhCN
    },
    vi: {
        ...viLocale,
        ...elementViLocale
    },
    es: {
        ...esLocale,
        ...elementEsLocale
    }
}

export const getLocale:any = () => {
    const cookieLanguage = getLanguage()
    if (cookieLanguage) {
        document.documentElement.lang = cookieLanguage
        return cookieLanguage
    }

    const language = navigator.language.toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            document.documentElement.lang = locale
            return locale
        }
    }

    // Default language is english
    return 'zh'
}

const i18n = new VueI18n({
    locale: getLocale(),
    messages,
    silentTranslationWarn: true
})

export default i18n
