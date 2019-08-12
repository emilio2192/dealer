import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Animated,
    Dimensions,
    Image,
    Modal, TouchableOpacity, SafeAreaView
} from "react-native";

import { AntDesign } from '@expo/vector-icons/';
import Terms from '../../components/Terms';

const { State: TextInputState } = TextInput;
import constants from '../../constants/Server';
import colors from '../../constants/Colors';
import endpoints from '../../constants/Endpoints';
import communStyles from '../../constants/CommunStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenHeader } from "../../components/ScreenHeader";

export class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            shift: new Animated.Value(0),
            modal: false,
            data: {
                agreed: false,
                name: '',
                mobile: '',
                email: '',
                areaMobileCountry: '502',
                password: '',
                passwordConfirm: '',
                userType: 'client',
                countryCode: 'GTM'
            }

        };
    }

    createNewUser = async () => {
        try {
            if(!this.state.data.agreed){
                alert('Por favor aceptar términos y condiciones para proceder');
                return;
            }
            let response = await fetch(constants.domain + endpoints.signUp, {
                method: 'POST',
                headers: constants.headers,
                body: JSON.stringify(this.state.data)
            });
            console.log('response', response);
            const body = response._bodyInit;
            if (response.ok) {
                alert('Usuario creado con exito, realiza la verificación por medio del codigo enviado a tu email o móvil.');
                this.props.navigation.navigate('Login');
            } else {
                alert("Error: " + body.message);
            }
        } catch (e) {
            console.log("ERROR ", e);
        }


    };
    checkBox = () => {
        const agreedment = this.state.data.agreed ? 'checksquareo' : 'closesquareo';
        return <View style={{ alignItems: 'center', height: 50, justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingRight: 15, fontFamily: 'roboto-semibold' }} onPress={() => { this.setState({ modal: !this.state.modal }) }}>Términos y condiciones &nbsp;</Text>
            <AntDesign name={agreedment} size={20} color={this.state.data.agreed ? 'green' : 'red'} onPress={() => { this.setState({ data: { ...this.state.data, agreed: !this.state.data.agreed } }) }} />
        </View>
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScreenHeader customStyle={{ backgroundColor: '#F4F4F4' }} title="Registro" navigation={this.props.navigation} />
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
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modal}
                                onRequestClose={() => console.log('Modal closed')}>
                                <View style={styles.container}>
                                    <View style={styles.closeModal}>
                                        <AntDesign name="close" color="black" size={30} onPress={() => { this.setState({ modal: !this.state.modal }) }} />
                                    </View>
                                    <ScrollView style={styles.modalContainer}>
                                        <Terms />
                                    </ScrollView>
                                </View>
                            </Modal>
                            <ScrollView style={styles.formContainer} contentContainerStyle={{alignItems: 'center', paddingBottom: 36}}>
                                <Text style={styles.textInput}>Nombre:</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({ data: { ...this.state.data, name: text } })}
                                    style={styles.inputStyle}
                                    textContentType='name' />
                                <Text style={styles.textInput}>Telefono:</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({ data: { ...this.state.data, mobile: text } })}
                                    style={styles.inputStyle}
                                    textContentType='telephoneNumber' />
                                <Text style={styles.textInput}>Correo:</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({ data: { ...this.state.data, email: text } })}
                                    style={styles.inputStyle}
                                    keyboardType='email-address' />
                                <Text style={styles.textInput}>Contraseña:</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ data: { ...this.state.data, password: text } })}
                                    style={[styles.inputStyle]}
                                    textContentType='password' />
                                <Text style={styles.textInput}>Confirmar contraseña:</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ data: { ...this.state.data, passwordConfirm: text } })}
                                    style={styles.inputStyle}
                                    textContentType='password' />
                                <View style={styles.row}>
                                    {this.checkBox()}
                                </View>
                                <TouchableOpacity
                                    style={[communStyles.btnPrincipal, { width: Dimensions.get('window').width - 96 }]}
                                    onPress={() => this.createNewUser()}>
                                    <Text style={{ color: 'white', fontFamily: 'roboto-bold' }}>REGISTRARSE</Text>
                                </TouchableOpacity>
                            </ScrollView>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: '#F4F4F4'
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
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingBottom: 50,
        borderRadius: 35,
        marginBottom: 25
    },
    logo: {
        flex: 1,
        resizeMode: 'contain',
        width: 250,
        height: 100,
        alignItems: 'center',
        marginBottom: 100,
    },
    row: {
        height: 70,
    },
    closeModal: {
        height: 30,
        position: 'absolute',
        right: 30,
        top: 30,
        alignItems: 'flex-end'
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        height: '90%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        position: 'absolute',
        left: 10,
        top: 50

    },
    rowImage: {
        height: 100,
        paddingBottom: 15
    },
    rowBtn: {
        height: 70,
        alignItems: 'flex-end'
    },
    register: {
        fontSize: 16,
        color: colors.llevoleBlue
    },
    inputStyle: communStyles.inputStyle
});
