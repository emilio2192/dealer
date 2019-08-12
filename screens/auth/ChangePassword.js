import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    AsyncStorage,
    Image,
    TouchableOpacity,
    Keyboard,
    Dimensions, UIManager, Animated
} from "react-native";
import communStyles from '../../constants/CommunStyles';
import constants from '../../constants/Server';
import endpoints from '../../constants/Endpoints';

const {State: TextInputState} = TextInput;

export class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shift: new Animated.Value(0),
            data: {
                verificationCode: '',
                mobileEmail: '',
                newPassword: ''
            }

        };
    }

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    handleKeyboardDidShow = (event) => {
        const {height: windowHeight} = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + 20);
            if (gap >= 0) {
                return;
            }
            Animated.timing(
                this.state.shift,
                {
                    toValue: gap,
                    duration: 700,
                    useNativeDriver: true,
                }
            ).start();
        });
    };

    handleKeyboardDidHide = () => {
        Animated.timing(
            this.state.shift,
            {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }
        ).start();
    };

    changePassword = async () => {
        try {
            const response = await fetch(constants.domain + endpoints.changePassword, {
                method: 'POST',
                headers: constants.headers,
                body: JSON.stringify(this.state.data)
            });
            if (response.ok) {
                this.props.navigation.navigate('Login');
            }
        } catch (e) {
            console.log('Error', e);
        }
    }

    render() {
        return (
            <Animated.View style={[communStyles.containerAnimated, {transform: [{translateY: this.state.shift}]}]}>
                <View style={styles.container}>
                    <View style={styles.rowImage}>
                        <Image style={{width: 350, height: 100, alignItems: 'center'}}
                               source={require('../../assets/images/logo.png')}/>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textInput}>C&oacute;digo:</Text>
                        <TextInput style={styles.inputStyle}
                                   onChangeText={(text) => this.setState({
                                       data: {
                                           ...this.state.data,
                                           verificationCode: text
                                       }
                                   })}
                                   textContentType='emailAddress'/>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textInput}>Tel&ecute;fono o Email:</Text>
                        <TextInput style={styles.inputStyle}
                                   onChangeText={(text) => this.setState({
                                       data: {
                                           ...this.state.data,
                                           mobileEmail: text
                                       }
                                   })}
                                   textContentType='emailAddress'/>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textInput}>Nueva Contrase&ntilde;a:</Text>
                        <TextInput style={styles.inputStyle}
                                   secure={true}
                                   onChangeText={(text) => this.setState({
                                       data: {
                                           ...this.state.data,
                                           newPassword: text
                                       }
                                   })}
                                   textContentType='emailAddress'/>
                    </View>
                    <View style={styles.row}>
                        {/*<Button color="#F15394" title="Iniciar Sesi&oacute;n" onPress={() => this.changePassword()}/>*/}

                        <TouchableOpacity
                            style={[communStyles.btnPrincipal, {marginTop: 15}]}
                            onPress={() => this.changePassword()}>
                            <Text style={{color: 'white', fontFamily: 'roboto-bold'}}>CAMBIAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column'
    },
    row: {
        height: 70,
        paddingTop: 10
    },
    rowImage: {
        height: 100,
        paddingBottom: 15
    },
    rowLink: {
        height: 40,
        paddingTop: 5
    },
    btnLogin: {
        color: 'green'
    },
    register: {
        fontSize: 16,
        color: '#009ADE',
        textAlign: 'center'
    },
    inputStyle: communStyles.inputStyle,
    textInput: {
        color: '#3E3E3E',
        paddingTop: 5
    }
});

