import React from "react";
import {AsyncStorage, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import communStyles from '../../constants/CommunStyles';
import constants from '../../constants/Server';
import endpoints from '../../constants/Endpoints';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-navigation';

// const { Lottie } = DangerZone;

export class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            // shift: new Animated.Value(0),
            data: {
                username: '',
                password: ''
            },
            sending: false
        };
    }


    login = async () => {
        try {
            this.setState({sending: true});
            let response = await fetch(constants.domain + endpoints.signIn, {
                method: 'POST',
                headers: constants.headers,
                body: JSON.stringify(this.state.data)
            });

            const body = JSON.parse(response._bodyInit);
            if (response.status === 401 && response.ok === false && body.verified === false) {
                this.props.navigation.navigate('Verify');
                return;
            }
            if (response.ok && response.status === 200) {
                await AsyncStorage.setItem("token", JSON.stringify(body.token));
                await AsyncStorage.setItem("userInformation", JSON.stringify(body.user));
                await AsyncStorage.setItem("userStatus", JSON.stringify(false));
                this.props.navigation.navigate('Main');

            } else {
                alert(body.msg);
            }
            this.setState({sending: false});
        } catch (e) {
            console.log("ERROR ", e);
        }
    };

    render() {
        return (
            <SafeAreaView
                style={{flex: 1, backgroundColor: '#F4F4F4'}}
                forceInset={{top: 'never'}}>
                <KeyboardAwareScrollView
                    innerRef={ref => {
                        this.scroll = ref
                    }}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}>
                    <View style={styles.formContainer}>
                        <Image style={styles.logo}
                               source={require('../../assets/images/logo.png')}/>
                        <Text style={styles.textInput}>Usuario:</Text>
                        <TextInput style={styles.inputStyle}
                                   onChangeText={(text) => this.setState({data: {...this.state.data, username: text}})}
                                   keyboardType='email-address'
                                   returnKeyType='next'
                                   onSubmitEditing={() => {
                                       this.password.focus();
                                   }}
                                   blurOnSubmit={false}
                        />
                        <Text style={styles.textInput}>Contrase&ntilde;a:</Text>
                        <TextInput style={styles.inputStyle}
                                   ref={(input) => {
                                       this.password = input;
                                   }}
                                   secureTextEntry={true}
                                   onChangeText={(text) => this.setState({data: {...this.state.data, password: text}})}
                                   textContentType='password'
                                   returnKeyType='done'
                                   onSubmitEditing={() => {
                                       this.login()
                                   }}
                        />
                        <View style={[styles.rowLink, {paddingTop: 0}]}>
                            <Text style={styles.register}
                                  onPress={() => this.props.navigation.navigate('RequestChangePass')}>Recuperar
                                Contrase&ntilde;a</Text>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[styles.btnLogin, {width: Dimensions.get('window').width - 96}]}
                                onPress={() => this.login()}>
                                {
                                    !this.state.sending &&
                                    <Text style={{color: 'white', fontFamily: 'roboto-bold'}}>INGRESAR</Text>
                                }
                                {/*{this.state.sending &&*/}
                                {/*    <LottieView*/}
                                {/*        ref={c => this._playAnimation(c)}*/}
                                {/*        source={require('../../constants/sending.json')}*/}
                                {/*        loop={true}*/}
                                {/*    />*/}
                                {/*}*/}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.registerView}>
                            <Text style={styles.registerText}>¿No tienes cuenta?</Text>
                            <Text style={styles.linkRegister}
                                  onPress={() => this.props.navigation.navigate('Register')}> Regístrate</Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
    }

    _playAnimation = (anim) => {
        this.lottieAnim = anim;
        if (anim) {
            this.lottieAnim.play();
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#F4F4F4'
    },
    registerView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'row'
    },
    registerText: {
        fontFamily: 'roboto',
        fontSize: 12,
        color: '#C1C1C1'
    },
    linkRegister: {
        fontFamily: 'roboto-bold',
        fontSize: 12,
        color: '#FBB44A'
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
        marginBottom: 100,
        top: -150
    },
    rowLink: {
        height: 40,
        paddingTop: 5
    },
    btnLogin: communStyles.btnPrincipal,
    register: {
        fontSize: 12,
        color: '#009ADE',
        textAlign: 'center',
        fontFamily: 'roboto'
    },
    inputStyle: communStyles.inputStyle,
    textInput: {
        fontSize: 12,
        textTransform: 'uppercase',
        marginBottom: 10,
        color: '#C1C1C1',
        fontWeight: 'bold',
        fontFamily: 'roboto-semibold',
        alignSelf: 'flex-start'
    }
});
