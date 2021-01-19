import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers'; // 即combineReducers之后的rootReducer

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // blacklist: ['AppReducers'],设置不需要 持久化的对象，名称与reducers/index.js中一致
    // stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况
};

const perReducer = persistReducer(persistConfig, rootReducer); // 包装rootReducer
export const store = createStore(perReducer); // 传递给createStore函数 这个export
export const persistor = persistStore(store); // 包装store 这个也export
