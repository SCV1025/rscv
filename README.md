# RNDEMO项目

使用react-native框架构建项目

包含基本axios请求；以及请求拦截器、响应拦截器。

包含状态管理工具。

包含基本的UI库(react-native-ui-lib)。

包含国际化相关设置。

包含React-Navigation导航的基础配置、以及底部Tab导航。

包含以函数的形式插入组件。

## 开发

安装依赖

> 本程序中仅建议使用 `yarn`

```bash
$ yarn install
```

开始构建



运行IOS

```bash 
cd ios 
pod install
cd ..
react-native run-ios
```
 
运行Android
```bash 
react-native run-android
```

## 项目改名 

安装

```
$ yarn global add react-native-rename

or

$ npm install react-native-rename -g
```

修改项目名称

```bash
$ react-native-rename <appName>
```

## 项目详解


#### 项目结构
```
.src
├── App.js
├── Config.js
├── Tab
├── api
├── assets
├── components
├── languages
├── pages
├── routes
├── store
├── styles
└── utils
```

**App.js**，外部index.js中唯一注册的RN组件入口，App的初始化等操作都放入此入口。

**Config.js**，服务器相关的配置放入此入口。

**Tab**，该目录为底部导航的页面入口文件。

**api**，请求存放位置。

**assets**，图片、动画、等资源存放位置。

**components** 公共组件存放位置 ``tips:如公用组件太多，可多分文件夹，以用途划分。base等``

**languages** 国际化语言资源存放位置 

**pages** 页面存放位置

**routes** 页面的注册入口位置

**store** 状态管理器

**styles** 公共样式，以及UI库的自定义样式存放处

**utils** 工具类，``请求的封装、导航的封装，以及版本检查等纯js代码``
 

#### UI库

react-native-ui-lib
> 引入 [react-native-ui-lib](https://github.com/wix/react-native-ui-lib) 库
>
> 安装
```bash
yarn add react-native-ui-lib
```
>可自定义样式，样式文件存放在styles目录中

```javascript
//....
//样式设定 styles/theme.js 
import {Typography, Colors} from 'react-native-ui-lib';

//设置颜色
Colors.loadColors({
    primaryColor: '#FF0000',
    myColor: '#fff000',
});
//....

//使用方式
// 在需要使用该风格时，引入，或者在App.js中引入
import './styles/theme';
import {Text} from 'react-native-ui-lib';

<Text myColor >Hello World</Text>
<Text primaryColor >Hello World</Text>
//...

```
关于其他样式的设定，可以去查阅[react-native-ui-lib](https://github.com/wix/react-native-ui-lib)的文档。


如有其它需求可查看wiki文档 选择需要的组件
> [WiKi RN第三方组件库文档](http://wiki.easyspark.cn/rn-tools)


#### 状态管理器


> 使用[Redux状态管理](https://www.redux.org.cn/)

> 安装

```bash
yarn add react-redux redux redux-persist @react-native-community/async-storage
```

> 文件目录结构构建如下

```
store
├─actions.js
├─index.js
├─reducers.js
├─modules
|    ├─App.actions.js
|    └App.reducers.js
```

**actions.js** 文件用来定义 执行的动作，执行的每个动作都有一个单独的名称，不可重复。

**modules** 目录，以.reducers.js结尾的文件 来存储信息，以及响应action中定义的执行动作来操作信息数据；以.actions.js结尾的文件 来存放 执行的动作 函数

**reducers.js** 使用的函数式combineReducers，这个工具函数是用来把拆分成片段的reducers组合起来。导出给index.js 使用

总而言之，使用它的方式很简单。方法如下：

```javascript
import {combineReducers} from 'redux';
import AppReducers from './modules/App.reducers';

export default combineReducers({App: AppReducers});
```

**index.js文件** ,主要包含的功能是，创建唯一的一个应用store。在我们的项目中加入了redux持久化数据的管理。所以在该文件中还需要创建唯一的一个持久化store，且对持久化做一些相应的配置处理
```javascript
import rootReducer from './reducers'; // 即combineReducers之后的rootReducer

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,//rn项目中持久化需要@react-native-community/async-storage插件
    // blacklist: ['App'],设置不需要 持久化的对象，名称与reducers/index.js中一致
};

const perReducer = persistReducer(persistConfig, rootReducer); // 包装rootReducer
export const store = createStore(perReducer); // 传递给createStore函数 这个export
export const persistor = persistStore(store); // 包装store 这个也export
```

>状态管理器添加至项目中

```javascript
//app.js文件
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <App/>
    </PersistGate>
</Provider>
```

>页面或者组件中使用redux

```javascript
const Home=(props)=>{
//如在store/reducers/App.js中定义了user
console.log(props.App.user)
// 如需要修改props.user的信息
setUser({name: 'aaaaa'});
//则要在actions中定义动作名称，以及actionsCreator中定义setUser，然后在/reducers/App.js中写入该动作名称触发时的操作。
}

// store与props关联 //
const mapStateToProps = ({ App }) => {
  return {
    App
  };
};

/** dispatch与props关联 */
const mapDispatchToProps = (dispatch) => ({
  fetchMFS0601: bindActionCreators(setUser, dispatch),
});//

export default connect(mapStateToProps,mapDispatchToProps)(Home);
```

#### axios请求

请求拦截器定义
```javascript
service.interceptors.request.use((config)=>{
    config.headers={
    }    
return config;
},(error) => {
    // 对拦截错误做点什么
    console.log(error);
    return Promise.reject(error);
})
```

响应拦截器定义
```javascript
service.interceptors.response.use((response) => {
    
    //后台返回的status状态拦截可在此处操作
    return response;
},
(error) => {
    //请求状态码非200的可在此处处理
    switch (error.response.status) {
        case 601:
            break;
    }
    return Promise.reject(error);
})
```


#### 跳转页面

>使用react-navigation导航器
>

安装
```bash
$ yarn add @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
```

添加导航
```jsx
<Stack.Navigator
    initialRouteName={'Tabs'}
    screenOptions={{gestureEnabled: true}}>
   {/*...other code*/}
    <Stack.Screen name={'Login'} options={{headerShown: false}}>
        {(props) => <Login {...props} />}
    </Stack.Screen>
</Stack.Navigator>
```

 两种使用方式;
>>一种使用 **this.props.navigation.navigate('Login')** 跳转;
>
>>另一种使用hook的方式调用

```jsx
 //引入方式
import {useNavigation} from '@react-navigation/native';

 const navigation = useNavigation();
 //使用方式
 <TouchableOpacity color="primary" onClick={()=>{
    navigation.navigate('Login');
}}>Go</TouchableOpacity>
 ```

需要在非组件的地方使用导航器的话，引入 **util/RootNavigation.js** 使用RootNavigation.navigate() 跳转，使用方式与navigation.navigate()一致，另有reset方法。

#### 国际化

安装

[react-native-localize](https://github.com/react-native-community/react-native-localize) 用来获取系统设置的语言
```
$ yarn add I18n.js react-native-localize
```

语言文件设置

>所有语言有关的文件都放入**languages**文件夹
>
>```
>  languages
>  ├── cn.js
>  ├── cn.js
>  └── index.js
>```
>每个语言都创建一个js文件
>index.js 中写入判断当前语言的逻辑。具体的语言配置有关的[查阅i18n的文档说明](./md/i18n.md)

``tip：可修改语言的页面上，所有存在堆栈中的页面(即所有可导向修改语言的页面)，都需要使用redux的connect方法，来保证语言一旦切换，及时更新语言。``

#### 函数式组件编写

安装
```
$ yarn add react-native-root-siblings
```

使用

>在App.js页面上包裹一层，之后编写好代码后，即可用函数的形式插入组件。
>```javascript
>// App.js
><RootSiblingParent>
>    <Navigate />
></RootSiblingParent>
>```
>
>在components中写入需要插入的组件
>然后建立一个引用该组件的js，以自定义的Toast组件为例
>```javascript
>import React from 'react';
>import RootSiblings from 'react-native-root-siblings';
>import ToastView from './ToastView';
>
>
>let rootSibling = null;
> 
>// 组件销毁的方法
>function destroy() {
>     if (rootSibling) {
>         rootSibling.destroy();
>     }
> }
> 
> export default class Toast {
>     //组件显示的方法
>     static show(item, duration) {
>         if (rootSibling) {
>             rootSibling.destroy();
>         }
>         rootSibling = new RootSiblings(
>             <ToastView
>                 item={item}
>                 duration={duration}
>                 destroy={() => destroy()}
>             />,
>         );
> 
>         return rootSibling;
>     }
>   //组件销毁外部调用的方法
>     static destory() {
>         destroy();
>     }
> }
>```
>使用方式
>```javascript
>    //显示
>    const toast = Toast.show();
>   //销毁
>   toast.destroy();
> ```
