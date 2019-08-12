import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Animated,
    Dimensions,
    Keyboard,
    UIManager, Image, TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { State: TextInputState } = TextInput;
import constants from '../../constants/Server';
import endpoints from '../../constants/Endpoints';
import communStyles from '../../constants/CommunStyles';
import { gateway } from '../../services/gateway';
import { SafeAreaView } from 'react-navigation';
import { ScreenHeader } from "../../components/ScreenHeader";

export class VerificationAccountScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            shift: new Animated.Value(0),
            data: {
                mobileEmail: '',
                verificationCode: ''
            }

        };
    }

    verificate = async () => {
        try {
            let response = await fetch(constants.domain + endpoints.verifyAccount, {
                method: 'POST',
                headers: constants.headers,
                body: JSON.stringify(this.state.data)
            });
            if (response.ok) {
                this.props.navigation.navigate('Login');
            }
        } catch (e) {
            console.log("ERROR ", e);
        }
    };
    requestVerification = async () => {
        try {
            const data = { mobileEmail: this.state.data.mobileEmail };
            const response = await gateway(endpoints.requestVerification, 'POST', data, false);
            if (response.message) {
                alert(response.message);
            }
        } catch (e) {
            console.log("ERROR ", e);
        }
    };;


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScreenHeader customStyle={{ backgroundColor: '#F4F4F4', position: 'absolute' }} title="Volver" navigation={this.props.navigation} />
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: '#F4F4F4' }}
                    forceInset={{ top: 'never' }}>
                    <KeyboardAwareScrollView
                        innerRef={ref => {
                            this.scroll = ref
                        }}
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={styles.container}
                        scrollEnabled={false}>
                        <View style={styles.formContainer}>
                            <Image style={styles.logo}
                                source={require('../../assets/images/logo.png')} />
                            <Text style={styles.textInput}>Email ó Teléfono:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({ data: { ...this.state.data, mobileEmail: text } })}
                                style={styles.inputStyle}
                                textContentType='name' />
                            <Text style={styles.textInput}>Código:</Text>
                            <TextInput
                                onChangeText={(text) => this.setState({
                                    data: {
                                        ...this.state.data,
                                        verificationCode: text
                                    }
                                })}
                                style={styles.inputStyle}
                                textContentType='name' />
                            <TouchableOpacity
                                style={[communStyles.btnPrincipal, { width: Dimensions.get('window').width - 96 }]}
                                onPress={() => this.verificate()}>
                                <Text style={{ color: 'white', fontFamily: 'roboto-bold' }}>VERIFICAR</Text>
                            </TouchableOpacity>
                            <Text style={styles.register} onPress={() => this.requestVerification()}>REENVIAR</Text>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#F4F4F4'
    },
    formContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 24,
        bottom: 24,
        position: 'absolute',
        paddingVertical: 75,
        borderRadius: 35,
        alignItems: 'center'
    },
    logo: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 250,
        height: 100,
        alignItems: 'center',
        marginBottom: 75,
        top: -150
    },
    register: {
        fontSize: 16,
        color: '#009ADE',
        marginTop: 15
    },
    textInput: {
        fontSize: 12,
        textTransform: 'uppercase',
        marginBottom: 10,
        color: '#C1C1C1',
        fontWeight: 'bold',
        fontFamily: 'roboto-semibold',
        alignSelf: 'flex-start'
    },
    inputStyle: communStyles.inputStyle
});
