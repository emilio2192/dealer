import * as React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    RefreshControl
} from 'react-native';
import assigment from '../services/Assignments';
import {ScrollView} from "react-native-gesture-handler";
import { computeDestinationPoint } from 'geolib';
import Status from '../constants/Status';
import Colors from '../constants/Colors';
import lodash from 'lodash';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
// import Ionicons from '@expo/vector-icons/Ionicons';
import {Ionicons, FontAwesome, EvilIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import {LocationList} from '../components/LocationList';
import {NavigationEvents} from 'react-navigation';

export default class History extends React.Component {
    state = {
        assignments: [],
        isCollapsed: [],
        isLoading: true,
        animation: null,
        modalVisible: false,
        refreshing: false,
        statusCount: {
            waiting: 0,
            assigned: 0,
            inProgress: 0,
            finished: 0
        }
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log('in history');
        await this.fetchAssignments();
    }
    async fetchAssignments() {
        try {
            console.log("start fetching..");
            let user = await AsyncStorage.getItem('userInformation');
            // const token = await AsyncStorage.getItem('token');
            
            user = JSON.parse(user);
            console.log("user---->", user);
            // const history = await assigment.getHistoryAssignments(user);
            
            const history = await assigment.getHistoryAssignments()
            console.log("end fetching..");
            const response = history.assignments;
            
            console.log(response);
            this.setState({assignments: lodash.orderBy(response, ['date'], ['desc']), user: user});
            const waiting = lodash.filter(response, function (o) {
                return o.status === Status.WAITING
            }).length;
            const assigned = lodash.filter(response, function (o) {
                return o.status === Status.ASSIGNED
            }).length;
            const inProgress = lodash.filter(response, function (o) {
                return o.status === Status.IN_PROGRESS
            }).length;
            const finished = lodash.filter(response, function (o) {
                return o.status === Status.FINISHED
            }).length;
            let isCollapsed = [];
            for (let i = 0; i < response.length; i++) {
                isCollapsed.push(true);
            }
            
            this.setState({isCollapsed, isLoading: false, statusCount: {waiting, assigned, inProgress, finished}});
        } catch (error) {
            console.error(error);
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchAssignments().then(() => {
            this.setState({refreshing: false});
        });
    }

    cardRender = (data) => {
        return (
            <View style={style.card} key={data.date}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={style.subject}>{data.subject.subject} </Text>
                    <Text style={style.date}>{data.date.substring(0, 10)}</Text>
                </View>
                <View style={{flex: 3}}>
                    <View style={{flex: 1}}>
                        <Text style={{
                            textAlign: 'right',
                            paddingRight: 5,
                            paddingTop: 10
                        }}>{data.messengerPaid ? 'PAGADO' : 'PENDIENTE'}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 15, textAlign: 'left', paddingLeft: 10}}>
                            Contacto: {data.subject.contactName}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.log(this.state.assignments);
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.fetchAssignments()}/>
                {this.state.assignments.length > 0 && <StatusBar barStyle="light-content"/>}
                {this.state.assignments.length < 0 && <StatusBar barStyle="dark-content"/>}
                {
                    !this.state.isLoading && this.state.assignments.length > 0 &&
                    <View style={styles.header}>
                        <Image style={{width: 60, height: 60, resizeMode: "contain",}} source={require("../assets/images/kangaroo.png")} />
                        <Text style={styles.title}>Tus Asignaciones realizadas</Text>
                    </View>
                } 
                {
                    !this.state.isLoading && this.state.assignments.length > 0 &&
                    <Image style={styles.headerBackground}
                           source={require('../assets/images/header.png')}/>
                }
                {
                    !this.state.isLoading && this.state.assignments.length > 0 &&
                    <View style={styles.body}>
                        <View style={styles.topBar}>
                            <TouchableOpacity style={styles.indicator}>
                                <Text style={styles.indicatorValue}>{this.state.assignments.length}</Text>
                                <Text style={styles.indicatorText}>Creadas</Text>
                                <View style={[styles.indicatorColor, {backgroundColor: Status.COLORS.ALL}]}></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.indicator}>
                                <Text style={styles.indicatorValue}>{this.state.statusCount.inProgress}</Text>
                                <Text style={styles.indicatorText}>Activas</Text>
                                <View style={[styles.indicatorColor, { backgroundColor: Colors.GREEN }]}></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.indicator}>
                                <Text style={styles.indicatorValue}>{this.state.statusCount.finished}</Text>
                                <Text style={styles.indicatorText}>Completas</Text>
                                <View style={[styles.indicatorColor, { backgroundColor: Colors.CIAN }]}></View>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            style={{flex: 1, marginTop: 30, paddingTop: 7, paddingHorizontal: 7, marginHorizontal: -7}}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }>
                            {
                                this.state.assignments.map((item, index) => (
                                    <View style={styles.plainCard} key={index}>
                                        <View style={styles.cardStatus}>
                                            <View style={[
                                                    styles.cardStatusAlt, 
                                                    item.status === Status.ASSIGNED ? { backgroundColor: Status.COLORS.ALL } : 
                                                    item.status === Status.IN_PROGRESS ? { backgroundColor: Colors.GREEN } :
                                                    item.status === Status.FINISHED ? { backgroundColor: Colors.CIAN } : null
                                                ]}
                                            ></View>
                                        </View>
                                        <View style={styles.cardDate}>
                                            <Text
                                                style={styles.dateText}>{moment(item.date).format('DD-MM-YYYY')}</Text>
                                        </View>
                                        <TouchableOpacity
                                            // onPress={() => this.props.navigation.navigate('PaymentScreen',
                                            //     {
                                            //         readonly: true,
                                            //         locations: item.locations,
                                            //         subject: item.subject,
                                            //         active: true,
                                            //         assignmentId: item.assignmentID,
                                            //         price: item.price   
                                            //     } 
                                            // )}
                                            style={styles.cardBody}>
                                            <Text style={styles.cardTitle}>{item.subject.subject}</Text>
                                            <View style={styles.cardItem}>
                                                <Ionicons name="ios-person" size={16} color="#595959"/>
                                                <Text style={styles.itemDescription}>{item.subject.contactName}</Text>
                                            </View>
                                            
                                            <View style={styles.cardItem}>
                                                <MaterialCommunityIcons name="credit-card" size={16} color="#595959"/>
                                                <Text style={styles.itemDescription}>{"Tipo de pago: " + (item.paymentMethod === "cdcard"? "Tarjeta" : "Efectivo")}</Text>
                                            </View>
                                            <View style={styles.cardItem}>
                                                <MaterialCommunityIcons name="cash" size={16} color="#595959"/>
                                                <Text style={styles.itemDescription}>{"Pagada:"+(item.messengerPaid? "Si" : "No")}</Text>
                                            </View>
                                            <View style={styles.cardItem}>
                                                <MaterialCommunityIcons name="cash" size={16} color="#595959"/>
                                                <Text style={styles.itemDescription}>{"Valor: Q"+(item.price ? item.price: 0)}</Text>
                                            </View>
                                      
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                let isCollapsed = this.state.isCollapsed;
                                                isCollapsed[index] = !isCollapsed[index];
                                                this.setState({isCollapsed});
                                            }}
                                            style={styles.cardFooter}>
                                            <Text style={styles.footerTitle}>{item.locations.length} destinos</Text>
                                            <EvilIcons name="chevron-down" size={30} color="#595959"/>
                                        </TouchableOpacity>
                                        <Collapsible collapsed={this.state.isCollapsed[index]}>
                                            <View style={{paddingBottom: 20}}>
                                                {
                                                    item.locations.map((location, index) => (
                                                        <LocationList
                                                            location={location}
                                                            index={index}
                                                            key={index}
                                                        />
                                                    ))
                                                }
                                            </View>
                                        </Collapsible>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                }
                {
                    !this.state.isLoading && this.state.assignments.length === 0 &&
                    <View
                        style={[styles.body, {justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16,}]}>
                        <Image
                            source={require('../assets/images/assignement-placeholder.png')}
                            style={{width: 120, height: 120, resizeMode: 'contain', marginBottom: 40}}
                        />
                        <Text style={styles.bigText}>Hola {this.state.user.contactName},</Text>
                        <Text style={styles.infoText}>Parece que aún no has creado ninguna asignación. Crea una
                            asignación para poder darle seguimiento.</Text>
                        <TouchableOpacity
                            style={styles.fab}
                            onPress={() => this.props.navigation.navigate('New')}>
                            <Ionicons name='ios-add' size={24} color="white"/>
                        </TouchableOpacity>
                    </View>
                }
                {
                    this.state.isLoading &&
                    <View style={StyleSheet.absoluteFill}>
                        {/* <LottieView
                            ref={animation => {
                                this.animation = animation;
                            }}
                            loop={true}
                            source={require('../constants/loading.json')}
                        /> */}
                        <Text style={styles.loadingText}>Espera un instante...</Text>
                    </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 24,
        backgroundColor: '#F9F9F9',
    },
    loadingText: {
        fontFamily: 'roboto-semibold',
        color: '#232b33',
        fontSize: 14,
        alignSelf: 'center',
        position: 'absolute',
        top: (Dimensions.get('window').height / 2) + 50
    },
    plainCard: {
        backgroundColor: 'white',
        shadowColor: '#878787',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderRadius: 10,
        marginVertical: 15,
        marginLeft: 10,
        marginRight: 4,
        paddingHorizontal: 20,
    },
    cardBody: {
        paddingVertical: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'roboto-semibold',
        color: '#595959',
        marginBottom: 20
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    cardDate: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 30,
        position: 'absolute',
        top: 50,
        right: 26,
    },
    dateText: {
        fontFamily: 'roboto-semibold',
        color: '#595959',
    },
    itemDescription: {
        fontFamily: 'roboto',
        color: '#595959',
        fontSize: 14,
        marginLeft: 16
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2'
    },
    footerTitle: {
        fontFamily: 'roboto-semibold',
        fontSize: 14,
        color: '#595959',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBackground: {
        height: 250,
        width: Dimensions.get('window').width,
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    cardStatus: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: -7,
        right: -7,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    cardStatusAlt: {
        width: 10,
        height: 10,
        borderRadius: 50
    },
    indicatorColor: {
        width: 8,
        height: 8,
        borderRadius: 50,
        marginTop: 5
    },
    indicator: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    indicatorText: {
        fontSize: 10,
        fontFamily: 'roboto-semibold',
        color: '#b8c5dd'
    },
    indicatorValue: {
        fontSize: 26,
        fontFamily: 'roboto-bold',
        color: '#595959'
    },
    topBar: {
        alignSelf: 'stretch',
        paddingVertical: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#878787',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 7,
        elevation: 10,
        borderRadius: 10
    },
    body: {
        flex: 1,
        paddingTop: 24
    },
    bigText: {
        fontFamily: 'roboto-semibold',
        fontSize: 18,
        color: '#262626'
    },
    infoText: {
        marginTop: 20,
        marginBottom: 30,
        fontFamily: 'roboto',
        fontSize: 15,
        padding: 8,
        textAlign: 'center',
        color: '#757575'
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        height: 50,
        borderRadius: 5,
        alignSelf: 'center',
        zIndex: 50,
        fontFamily: 'roboto-bold',
        borderWidth: 2,
        borderColor: 'black'
    },
    title: {
        fontSize: 30,
        fontFamily: 'bebas',
        color: Colors.WHITE
    },
    fab: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#98CC33',
        padding: 10,
        width: 65,
        height: 65,
        borderRadius: 50,
        shadowColor: '#98CC33',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 10,
    },
});

