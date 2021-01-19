import * as actionType from '../actions';

let initialState = {
    userLanguageSetting: null, // 用户手动设置的语言
    userInfo: null, // 用户手动设置的语言
};

const AppReducers = (store = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case actionType.USER_SET_LANGUAGE:
            const {languageCode} = payload;

            return {
                ...store,
                userLanguageSetting: languageCode,
            };
        case actionType.USER_INFO:
            const {userInfo} = payload;
            return {
                ...store,
                userInfo: userInfo,
            };
        default:
            return store;
    }
};

export default AppReducers;
