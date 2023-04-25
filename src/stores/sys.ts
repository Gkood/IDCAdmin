import {defineStore} from 'pinia'
import {setLanguage} from '@/utils/cookies'
import {getLocale} from '../lang'

export const useSys = defineStore({
    id: 'sys',
    state: () => ({
        language: getLocale()
    }),
    getters: {

    },
    actions: {
        SETLanguage(lang: any) {
            this.language = lang
            setLanguage(this.language)
        }
    }
})
