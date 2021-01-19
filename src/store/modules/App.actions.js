/*
 * 本文件用于定义创建action对象的函数
 * 在创建action对象时，必须包含action类型，以及action改变全局状态的最小数据集(payload)
 */
import * as actionType from '../actions';
import Http from "../../utils/Http";

// languageCode一定要严格按照RNLocalize.getLocales()中返回各语言字段编码来定义
const setLanguage = (languageCode) => {
    return async (dispatch) => {
        dispatch({
            type: actionType.USER_SET_LANGUAGE,
            payload: {
                languageCode,
            },
        });
    };
};

const setUserInfo = (userInfo) => {
    return async (dispatch) => {
        dispatch({
            type: actionType.USER_INFO,
            payload: {
                userInfo,
            },
        });
    };
};
const fetchLogin = () => {
    return async (dispatch) => {
        Http.postForm('/api/v1/auth/loginByPass', {}).then((res) => {
            dispatch({
                type: actionType.USER_INFO,
                payload: {
                    userInfo: res.data,
                },
            });
        });
    };
}

export {setLanguage, setUserInfo, fetchLogin};
