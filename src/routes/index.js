import React from 'react';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import Login from '../pages/Login';
import Tabs from '../Tab';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator
            initialRouteName={'Tabs'}
            screenOptions={{gestureEnabled: true}}>
            <Stack.Screen
                name={'Tabs'}
                options={{
                    headerShown: false,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    },
                }}>
                {(props) => <Tabs {...props} />}
            </Stack.Screen>
            <Stack.Screen name={'Login'} options={{headerShown: false}}>
                {(props) => <Login {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
