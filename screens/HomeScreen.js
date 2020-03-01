import * as React from 'react';
import {AsyncStorage, Image, Modal, StyleSheet, Text, View} from 'react-native';

import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import assigment from '../services/Assignments';

import {getLocation} from '../services/location-service';

import * as geolib from 'geolib';
import LottieView from "lottie-react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import * as Font from "expo-font";

// import Image from "react-native-web/dist/exports/Image";

export default class HomeScreen extends React.Component {

    constructor(props) {
        const _isMount = false;
        super(props);
        this.state = {
            statusDelivery: false,
            userStatus: 'false',
            interval: null,
            modal: false,
            assignment: {},
            user: {},
            distance:'',
            summary: {}
        };
    };

    async componentDidMount() {
        // await Font.loadAsync({
        //     'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
        //     'roboto-black': require('../assets/fonts/Roboto/Roboto-Black.ttf'),
        //     Roboto: require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
        //     'roboto-thin': require('../assets/fonts/Roboto/Roboto-Thin.ttf'),
        //     'roboto-light': require('../assets/fonts/Roboto/Roboto-Light.ttf'),
        //     'roboto-semibold': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
        //     'bebas': require('../assets/fonts/bebas_neue/BebasNeue-Regular.ttf'),
        // });
        // // xs
        
        await AsyncStorage.setItem('userStatus', 'false');
        this.setState({userStatus: 'false'});
        const userStatus = await AsyncStorage.getItem('userStatus');
        const user = await AsyncStorage.getItem('userInformation');
        const summary = await assigment.summary(user.id);
        this.setState({user: JSON.parse(user), summary:summary.summaryMonth});
        if (userStatus === null) {
            await AsyncStorage.setItem('userStatus', 'false');
            this.setState({userStatus: 'false'});
        }
        if (userStatus === 'false') {
            this.stopAssignment();
        } else {
            await AsyncStorage.setItem('userStatus', 'true');
            clearInterval(this.state.interval);
            this.setState({interval: null});
            this.startGetAssignments();
        }

        this.setState({userStatus});


        this.animation.play();
    };

    displayIconStatus = () => {
        if (this.state.userStatus === "true") {
            return [<Text key={'online'}>En linea</Text>,
                <MaterialCommunityIcons key={'powerOn'} name="play-speed" size={50} color="black"
                                        onPress={() => this.changeStatus()}/>];
        } else {
            return [<Text key={'offline'}>Fuera de linea</Text>,
                <AntDesign key={'iconOff'} name="poweroff" size={50} color="black"
                           onPress={() => this.changeStatus()}/>]
        }
    };

    static navigationOptions = {
        header: null,
    };
    changeStatus = async () => {
        if (this.state.userStatus === "true") {
            assigment.disconnectMessenger();
            await AsyncStorage.setItem('userStatus', 'false');
            this.setState({userStatus: 'false'});
            this.stopAssignment();
        } else {
            assigment.connectMessenger();
            await AsyncStorage.setItem('userStatus', 'true');
            this.startGetAssignments();
            this.setState({userStatus: 'true'});
        }

    };

    startGetAssignments = () => {
        const interval = setInterval(async () => {
            console.log('ASSIGNMENT ++++++++++++');
            const assignmentId = await AsyncStorage.getItem("assignment");
            const confirmedAssignment = await AsyncStorage.getItem("confirmedAssignment");
            if ((assignmentId !== null || assignmentId) && (confirmedAssignment !== null || confirmedAssignment === 'true')) {
                clearInterval(this.state.interval);
                this.props.navigation.navigate('Navigator');
                return;
            }

            // if ((assignmentId !== null || assignmentId) && (confirmedAssignment !== null || confirmedAssignment === 'false')) {
            //     console.log('inside', (assignmentId === null || assignmentId) );
            //     return;
            // }

            const response = await assigment.startGetAssignments();
            console.log('response assignment =======>', response);
            if (typeof response.assignment !== 'undefined') {
                console.log('************** assignmentID  ---      ', response.assignment.assignmentID);
                this.setState({assigment: response.assignment});
                await this.confirmedAlert(response.assignment);
            }
        }, (1000 * 10));
        this.setState({interval});
    };

    confirmedAlert = async (assignment) => {
        clearInterval(this.state.interval);
        const getCurrentLocation = await getLocation();
        const distance = await geolib.getDistance({
                latitude: getCurrentLocation.latitude,
                longitude: getCurrentLocation.longitude
            },
            {
                latitude: assignment.locations[0].lat,
                longitude: assignment.locations[0].lng
            });
        const km = distance / 1000;
        this.setState({modal: true, distance: km});
    };

    aceptAssignment = async () => {
        this.setState({modal: false});

        await AsyncStorage.setItem('confirmedAssignment', 'true');
        await AsyncStorage.setItem('assignment', this.state.assigment.assignmentID);
        await assigment.confirm(true, this.state.assigment.assignmentID);
        // send to screen
        this.props.navigation.navigate('Navigator');
    };
    declineAssignment = async () => {
        this.setState({modal: false});
        assigment.confirm(false, this.state.assigment.assignmentID);
        this.startGetAssignments();
        await AsyncStorage.setItem('confirmedAssignment', 'false');
        await AsyncStorage.removeItem('assignment');
    };

    stopAssignment = () => {
        clearInterval(this.state.interval);
        this.setState({interval: null});
    };

    getOnlineButton = () => {
        return <TouchableOpacity
            onPress={() => this.changeStatus()}
            style={{
                padding: 5,
                height: 200,
                width: 200,  //The Width must be the same as the height
                borderRadius: 400, //Then Make the Border Radius twice the size of width or Height  AW-EVuOj0
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#99CC33',
                borderWidth: 3,
                backgroundColor: '#FFFFFF'
            }}>
            <Text style={{color: '#99CC33', fontSize: 20, fontWeight: "bold"}}>Desconectar</Text>
        </TouchableOpacity>
    }

    getOfflineButton = () => {
        return <TouchableOpacity
            onPress={() => this.changeStatus()}
            style={{
                padding: 5,
                height: 200,
                width: 200,  //The Width must be the same as the height
                borderRadius: 400, //Then Make the Border Radius twice the size of width or Height  AW-EVuOj0
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#f43535',
                borderWidth: 3,
                backgroundColor: '#FFFFFF',
                elevation: 10
            }}>
            <Text style={{color: '#f43535', fontSize: 20, fontWeight: "bold"}}>Conectarse</Text>
        </TouchableOpacity>
    }

    render() {

        return (
            <View style={{
                flex: 3,
                flexDirection: 'column',
                backgroundColor: 'white',
                zIndex: 11,
                paddingTop: 50
            }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modal}
                    onRequestClose={() => this.setState({modal: false})}>
                    <View style={{
                        flex: 6,
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        zIndex: 11,
                        paddingTop: 50
                    }}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image style={styles.avatar} source={require('../assets/images/user.png')}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'stretch'}}>
                            <Text style={{fontSize: 24, padding: 5, textAlign: 'center'}}>
                                Hola Emilio, tienes una nueva asignación a {this.state.distance} km
                            </Text>
                        </View>
                        <View style={{flex: 2, marginBottom: 40}}>
                            <LottieView
                                ref={animation => {
                                    this.animation = animation;
                                }}
                                style={{
                                    width: 400,
                                    height: 400,
                                    alignSelf: 'center'
                                }}
                                autoPlay={true}
                                loop={true}
                                source={require('../constants/dealer.json')}
                            />
                        </View>
                        <View style={{flex: 2, padding: 5}}>
                            <TouchableOpacity
                                style={styles.blueButton}
                                onPress={() => this.aceptAssignment()}>
                                <Text style={{color: '#99CC33', fontWeight: 'bold'}}>ACEPTAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.completeButton}
                                onPress={() => this.declineAssignment()}>
                                <Text style={{color: '#f43535', fontWeight: 'bold'}}>DECLINAR</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                {/*{this.displayIconStatus()}*/}
                <View style={{flex: 1, justifyContent: 'strech', alignItems: "center"}}>
                    <Image style={{
                        resizeMode: 'contain',
                        width: 400,
                        height: 300,
                        alignItems: 'center'
                    }}
                           source={require('../assets/images/motorista.png')}/>
                </View>
                <View style={{flex: 1, justifyContent: 'strech', alignItems: "flex-start"}}>
                    <Text style={{fontSize: 20, paddingLeft: 10, paddingRight:10, textAlign: 'center'}}>
                        Hola {this.state.user.contactName} hoy haz realizado {this.state.summary.assignments} asignaciones y en este mes llevas un total de
                        {this.state.summary.total} mantente conectado y sigue ganando.
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'strech', alignItems: "center"}}>
                    {this.state.userStatus === 'false' ? this.getOfflineButton() : this.getOnlineButton()}
                </View>

            </View>
        );
    };

}
const styles = StyleSheet.create({
    closeModal: {
        height: 30,
        right: 30,
        top: 30,
        alignItems: 'flex-end',
        zIndex: 13,
        flex: 1,
        alignSelf: 'flex-end'
    },
    avatar: {
        flex: 1,
        resizeMode: 'contain',
        width: 100,
        height: 75,
        alignSelf: 'center',
        alignContent: 'center'
    },
    circle: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        width: 40,
        height: 40,
        borderColor: '#3c3c3b',
        padding: 10,
        borderRadius: 44 / 2
    },
    completeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#f43535',
        padding: 10,
        height: 50,
        borderRadius: 5,
        alignSelf: 'stretch',
        zIndex: 10,
        fontFamily: 'Roboto-Bold',
        marginTop: 20
    },
    blueButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#99CC33',
        padding: 10,
        height: 50,
        borderRadius: 5,
        alignSelf: 'stretch',
        zIndex: 10,
        fontFamily: 'Roboto-Bold',
        marginTop: 20
    }
});
