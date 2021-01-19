import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
//弹出窗
import {connect} from 'react-redux';
import {Dialog, Text, TextField, View, Button} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {bindActionCreators} from 'redux';
import {
    fetchLogin,
    setLanguage,
    setUserInfo,
} from '../../store/modules/App.actions';
import I18n from '../../languages';

const Home: () => React$Node = (props) => {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState(() => props.userInfo.name);
    const navigation = useNavigation();

    const toggleModal = () => {
        setVisible(!visible);
    };
    useEffect(() => {
        return () => {
            console.log('退出时执行');
        };
    }, []);
    return (
        <>
            <Dialog visible={visible} width={'100%'} bottom>
                <View style={styles.content}>
                    <Text h1 errorColor>
                        {I18n.t('helloWorld')}
                    </Text>
                    <Button
                        onPress={() => {
                            setVisible(false);
                        }}
                        title='Close'
                    />
                </View>
            </Dialog>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <Text>
                    UserInfo.name:{props.userInfo && props.userInfo.name}
                </Text>
                <Text>language:{props.userLanguageSetting}</Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Text>Modal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.fetchLogin}>
                    <Text>请求测试</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}>
                    <Text>Navigator</Text>
                </TouchableOpacity>
                <TextField
                    value={username}
                    onChangeText={(v) => {
                        setUsername(v);
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        props.setUserInfo({name: username});
                    }}>
                    <Text>保存输入内容到store</Text>
                </TouchableOpacity>
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
                                props.setLanguage('zh-CN');
                            }}
                            style={{marginRight: 30}}>
                            <Text>中文</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                props.setLanguage('en');
                            }}
                            style={{marginRight: 30}}>
                            <Text>English</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    contentInsetAdjustmentBehavior='automatic'
                    style={styles.scrollView}>
                    <Text h1 primaryColor>
                        {I18n.t('helloWorld')}
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
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    fetchLogin: bindActionCreators(fetchLogin, dispatch),
});

export default connect(({App}) => App, mapDispatchToProps)(Home);
