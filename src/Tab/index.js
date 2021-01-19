import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import I18n from '../languages';
import {connect} from 'react-redux';
import User from '../pages/User';

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: I18n.t('Tabs.title1'),
                    // tabBarIcon: ({color, size}) => <Image />,
                }}
            />
            <Tab.Screen
                name='User'
                component={User}
                options={{
                    tabBarLabel: I18n.t('Tabs.title2', {
                        locale: props.userLanguageSetting,
                    }),
                }}
            />
        </Tab.Navigator>
    );
};
export default connect(({App}) => App)(Tabs);
