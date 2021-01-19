import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    StatusBar,
} from 'react-native';
//弹出窗
import {Text, Dialog} from 'react-native-ui-lib';
import I18n from '../../languages';
import Http from '../../utils/Http';

const User: () => React$Node = (props) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Dialog visible={visible} width={'100%'} bottom>
                <View style={styles.content}>
                    <Text h1 errorColor>
                        Hello World
                    </Text>
                    <Button
                        testID={'close-button'}
                        onPress={() => {
                            setVisible(false);
                        }}
                        title='Close'
                    />
                </View>
            </Dialog>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior='automatic'
                    style={styles.scrollView}>
                    <Text h1 pink>
                        {I18n.t('helloWorld')}
                    </Text>
                    <Button
                        onPress={() => {
                            setVisible(true);
                        }}
                        title='弹窗'
                    />
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

export default User;
