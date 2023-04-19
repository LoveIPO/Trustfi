import { createI18n } from 'vue-i18n'
import store from '../store'
export default createI18n({
    legacy: true, 
    globalInjection: true, 
    locale:  store.state.lang ?  store.state.lang:"zh-CN" ,
    fallbackLocale: 'zh-CN', 
    messages: {
        'zh-CN': require('./lang/zh.json'),
        'zh-TW': require('./lang/ft.json'),
        'en': require('./lang/en.json'),
        'ja': require('./lang/ja.json'),
        'ms': require('./lang/ms.json'),
        'km': require('./lang/km.json'),
        'ru': require('./lang/ru.json'),
        'de': require('./lang/de.json'),
        'fr': require('./lang/fr.json')
    }
})