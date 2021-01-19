import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {navigationRef, isReadyRef} from './utils/RootNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './routes';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import './styles/theme';

const Navigate = () => {
    React.useEffect(() => {
        return () => (isReadyRef.current = false);
    }, []);

    //安卓的沉浸式状态栏设置
    if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('#00000000');
        StatusBar.setBarStyle('dark-content');
    }
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true;
            }}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Routes />
                </PersistGate>
            </Provider>
        </NavigationContainer>
    );
};
const App = () => (
    <RootSiblingParent>
        <Navigate />
    </RootSiblingParent>
);
export default App;
