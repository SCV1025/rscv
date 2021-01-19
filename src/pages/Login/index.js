/**
 * Sample React Native AppReducers
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
//弹出窗
import {connect} from 'react-redux';
import {Dialog, Text} from 'react-native-ui-lib';
import {setLanguage} from '../../store/modules/App.actions';
import {bindActionCreators} from 'redux';

const Login: () => React$Node = (props) => {
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <Text>{props.userInfo && props.userInfo.name}</Text>
                <View
                    style={{
                        height: 90,
                        // alignItems: 'center',
                        // justifyContent: 'center',
                    }}>
                    <Text>切换语言</Text>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                setLanguage('zh-CN');
                            }}
                            style={{marginRight: 30}}>
                            <Text>中文</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLanguage('en');
                            }}
                            style={{marginRight: 30}}>
                            <Text>English</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    contentInsetAdjustmentBehavior='automatic'
                    style={styles.scrollView}>
                    <Text h1 pink>
                        Login,Please
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    scrollView: {
        backgroundColor: '#fff',
    },
});
const mapDispatchToProps = (dispatch) => ({
    setLanguage: bindActionCreators(setLanguage, dispatch),
});

export default connect(({App}) => App, mapDispatchToProps)(Login);
