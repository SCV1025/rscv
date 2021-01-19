/**
 * 多语言配置文件
 */
import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import cn from './cn';
import en from './en';
// import rus from './rus';
import {store} from '../store';

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode; // 用户系统偏好语言
const {App} = store.getState(); // 用户手动设置语言
const {userLanguageSetting} = App;

if (userLanguageSetting) {
    I18n.locale = userLanguageSetting;
} else if (systemLanguage) {
    I18n.locale = systemLanguage;
} else {
    I18n.locale = 'en'; // 用户既没有设置，也没有获取到系统语言时，默认加载英语语言资源
}

// 监听应用运行过程中语言的变化
store.subscribe(() => {
    const {App} = store.getState();
    const {userLanguageSetting: newUserLanguageSetting} = App;
    if (
        newUserLanguageSetting &&
        newUserLanguageSetting !== userLanguageSetting
    ) {
        I18n.locale = newUserLanguageSetting;
    }
});

I18n.fallbacks = true;
I18n.translations = {
    'zh-CN': cn,
    en,
    // ru: rus,
};

export default I18n;
export {systemLanguage};
