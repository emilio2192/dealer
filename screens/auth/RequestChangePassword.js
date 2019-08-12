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
    Animated,
    Keyboard, Dimensions, UIManager
} from "react-native";
import communStyles from '../../constants/CommunStyles';
import constants from '../../constants/Server';
import endpoints from '../../constants/Endpoints';
const { State: TextInputState } = TextInput;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenHeader } from "../../components/ScreenHeader";

export class RequestChangePasswordScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            shift: new Animated.Value(0),
            data: {
                mobileEmail: ''
            }

        };
    }

    requestChangePassword = async () => {
        try {
            const response = await fetch(constants.domain + endpoints.requestChangePassword, {
                method: 'POST',
                headers: constants.headers,
                body: JSON.stringify(this.state.data)
            }).then((response) => response.json()).then((responseJson) => { return responseJson });
            console.log('response', response);
            if (response.ok) {
                this.props.navigation.navigate('ChangePassword', {
                    email: this.state.data.mobileEmail
                });
            } else {
                alert("Error: " + response.message);
            }
        } catch (e) {
            console.log('Error', e);
        }

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
        const { height: windowHeight } = Dimensions.get('window');
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScreenHeader title="Volver" navigation={this.props.navigation} />
                <KeyboardAwareScrollView
                    innerRef={ref => {
                        this.scroll = ref
                    }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}>
                    <View style={styles.container}>
                        <Image style={styles.logo}
                            source={require('../../assets/images/logo.png')} />
                        <Text style={styles.textInput}>Teléfono o Email:</Text>
                        <TextInput style={styles.inputStyle}
                            onChangeText={(text) => this.setState({
                                data: {
                                    ...this.state.data,
                                    mobileEmail: text
                                }
                            })}
                            textContentType='emailAddress' />
                        <TouchableOpacity
                            style={[communStyles.btnPrincipal, { marginTop: 15 }]}
                            onPress={() => this.requestChangePassword()}>
                            <Text style={{ color: 'white', fontFamily: 'roboto-bold' }}>SOLICITAR</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
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
    logo: {
        resizeMode: 'contain',
        width: 250,
        height: 100,
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 100
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
    inputStyle: communStyles.inputStyle
});
