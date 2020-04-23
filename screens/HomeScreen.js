import * as React from "react";
import {
  AsyncStorage,
  Image,
  Modal,
  StyleSheet,
  Text,
  View
} from "react-native";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import assigment from "../services/Assignments";

import { getLocation } from "../services/location-service";

import * as geolib from "geolib";
import LottieView from "lottie-react-native";
// import {TouchableOpacity} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { NavigationEvents } from "react-navigation";
import Colors from "../constants/Colors";
import { white } from "color-name";

// import Image from "react-native-web/dist/exports/Image";

export default class HomeScreen extends React.Component {
  constructor(props) {
    const _isMount = false;
    super(props);
    this.state = {
      statusDelivery: false,
      userStatus: "false",
      interval: null,
      modal: false,
      assignment: {},
      user: {},
      distance: "",
      summary: {}
    };
  }

  async componentDidMount() {
    const userStatus = await AsyncStorage.getItem("userStatus");
    const user = await AsyncStorage.getItem("userInformation");
    const summary = await assigment.summary(user.id);
    this.setState({
      user: JSON.parse(user),
      summary: summary.summaryMonth,
      userStatus: userStatus
    });

    if (userStatus === null) {
      await AsyncStorage.setItem("userStatus", "false");
      this.setState({ userStatus: "false" });
    }
    if (userStatus === "false") {
      this.stopAssignment();
    } else {
      await AsyncStorage.setItem("userStatus", "true");
      clearInterval(this.state.interval);
      this.setState({ interval: null });
      this.startGetAssignments();
    }

    this.setState({ userStatus });

    // this.animation.play();
  }

  displayIconStatus = () => {
    if (this.state.userStatus === "true") {
      return [
        <Text key={"online"}>En linea</Text>,
        <MaterialCommunityIcons
          key={"powerOn"}
          name="play-speed"
          size={50}
          color="black"
          onPress={() => this.changeStatus()}
        />
      ];
    } else {
      return [
        <Text key={"offline"}>Fuera de linea</Text>,
        <AntDesign
          key={"iconOff"}
          name="poweroff"
          size={50}
          color="black"
          onPress={() => this.changeStatus()}
        />
      ];
    }
  };

  static navigationOptions = {
    header: null
  };
  changeStatus = async () => {
    if (this.state.userStatus === "true") {
      assigment.disconnectMessenger();
      await AsyncStorage.setItem("userStatus", "false");
      this.setState({ userStatus: "false" });
      this.stopAssignment();
    } else {
      assigment.connectMessenger();
      await AsyncStorage.setItem("userStatus", "true");
      this.startGetAssignments();
      this.setState({ userStatus: "true" });
    }
  };

  verifyUserStatus = async () => {
    const userStatus = await AsyncStorage.getItem("userStatus");
    if (userStatus === null) {
      await AsyncStorage.setItem("userStatus", "false");
      this.setState({ userStatus: "false" });
    }
    if (userStatus === "false") {
      this.stopAssignment();
    } else {
      await AsyncStorage.setItem("userStatus", "true");
      clearInterval(this.state.interval);
      this.setState({ interval: null });
      this.startGetAssignments();
    }
  };

  startGetAssignments = () => {
    const interval = setInterval(async () => {
      console.log("ASSIGNMENT ++++++++++++");
      const assignmentId = await AsyncStorage.getItem("assignment");
      const confirmedAssignment = await AsyncStorage.getItem(
        "confirmedAssignment"
      );
      if (
        (assignmentId !== null || assignmentId) &&
        (confirmedAssignment !== null || confirmedAssignment === "true")
      ) {
        clearInterval(this.state.interval);
        this.props.navigation.navigate("Navigator");
        return;
      }

      // if ((assignmentId !== null || assignmentId) && (confirmedAssignment !== null || confirmedAssignment === 'false')) {
      //     console.log('inside', (assignmentId === null || assignmentId) );
      //     return;
      // }

      const response = await assigment.startGetAssignments();
      console.log("response assignment =======>", response);
      if (typeof response.assignment !== "undefined") {
        console.log(
          "************** assignmentID  ---      ",
          response.assignment.assignmentID
        );
        this.setState({ assigment: response.assignment });
        await this.confirmedAlert(response.assignment);
      }
    }, 1000 * 10);
    this.setState({ interval });
  };

  confirmedAlert = async assignment => {
    clearInterval(this.state.interval);
    const getCurrentLocation = await getLocation();
    const distance = await geolib.getDistance(
      {
        latitude: getCurrentLocation.latitude,
        longitude: getCurrentLocation.longitude
      },
      {
        latitude: assignment.locations[0].lat,
        longitude: assignment.locations[0].lng
      }
    );
    const km = distance / 1000;
    this.setState({ modal: true, distance: km });
  };

  aceptAssignment = async () => {
    this.setState({ modal: false });

    await AsyncStorage.setItem("confirmedAssignment", "true");
    await AsyncStorage.setItem("assignment", this.state.assigment.assignmentID);
    await assigment.confirm(true, this.state.assigment.assignmentID);
    // send to screen
    this.props.navigation.navigate("Navigator");
  };
  declineAssignment = async () => {
    this.setState({ modal: false });
    assigment.confirm(false, this.state.assigment.assignmentID);
    this.startGetAssignments();
    await AsyncStorage.setItem("confirmedAssignment", "false");
    await AsyncStorage.removeItem("assignment");
  };

  stopAssignment = () => {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  };

  getOnlineButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this.changeStatus()}
        style={{
          padding: 5,
          height: 140,
          width: 140, //The Width must be the same as the height
          borderRadius: 400, //Then Make the Border Radius twice the size of width or Height  AW-EVuOj0
          justifyContent: "center",
          alignItems: "center",
          borderColor: Colors.GREEN,
          borderWidth: 3,
          backgroundColor: "#FFFFFF"
        }}
      >
        <Text style={{ color: Colors.GREEN, fontSize: 20, fontWeight: "bold" }}>
          Desconectar
        </Text>
      </TouchableOpacity>
    );
  };

  getOfflineButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this.changeStatus()}
        style={{
          padding: 5,
          height: 140,
          width: 140, //The Width must be the same as the height
          borderRadius: 400, //Then Make the Border Radius twice the size of width or Height  AW-EVuOj0
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#f43535",
          borderWidth: 3,
          backgroundColor: "#FFFFFF",
          elevation: 10
        }}
      >
        <Text style={{ color: "#f43535", fontSize: 20, fontWeight: "bold" }}>
          Conectarse
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 3,
          flexDirection: "column",
          backgroundColor: "white",
          zIndex: 11,
          paddingTop: 50
        }}
      >
        <NavigationEvents onDidFocus={() => this.verifyUserStatus()} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => this.setState({ modal: false })}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              backgroundColor: "white",
              zIndex: 15,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={styles.avatar}
              source={require("../assets/images/dealer.png")}
            />
            <Text style={{ fontSize: 24, textAlign: "center" }}>
              ¡Hola {this.state.user.contactName}!
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                marginTop: 40
              }}
            >
              Tienes una nueva asignación a {this.state.distance} km
            </Text>
            <Text
              style={{
                fontSize: 24,
                padding: 5,
                textAlign: "center",
                marginTop: 40,
                marginBottom: 30
              }}
            >
              ¿Quieres tomarla?
            </Text>

            {/*<View style={{ flex: 2, marginBottom: 40 }}>*/}
            {/* <LottieView
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
                            /> */}
            {/*</View>*/}

            <TouchableOpacity
              style={styles.blueButton}
              onPress={() => this.aceptAssignment()}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                ACEPTAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => this.declineAssignment()}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                RECHAZAR
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              width: 175,
              height: 100,
              marginBottom: 30
            }}
            source={require("../assets/images/motorista.png")}
          />
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              marginBottom: 30
            }}
          >
            ¡Hola {this.state.user.contactName}!
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            Estas son las asignaciones que has
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 30 }}>
            realizado hasta ahora:
          </Text>

          <View style={styles.boxShadow}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "50%"
              }}
            >
              <Text style={{ fontSize: 24, textAlign: "center" }}>
                {this.state.summary.assignments
                  ? this.state.summary.assignments
                  : 0}
              </Text>
              <Text style={{ fontSize: 14, textAlign: "center" }}>Día</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "50%"
              }}
            >
              <Text style={{ fontSize: 24, textAlign: "center" }}>
                {this.state.summary.total ? this.state.summary.total : 0}
              </Text>
              <Text style={{ fontSize: 14, textAlign: "center" }}>Mes</Text>
            </View>
          </View>
          <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>
            ¿Estás listo para seguir?
          </Text>
          {this.state.userStatus === "false"
            ? this.getOfflineButton()
            : this.getOnlineButton()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  boxShadow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginBottom: 30,
    borderBottomColor: "#d6d6d6",
    borderBottomWidth: 1,
    padding: 15,
    shadowColor: "#d6d6d6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
    backgroundColor: "white"
  },
  closeModal: {
    height: 30,
    right: 30,
    top: 30,
    alignItems: "flex-end",
    zIndex: 13,
    flex: 1,
    alignSelf: "flex-end"
  },
  avatar: {
    resizeMode: "contain",
    width: 200,
    height: 125,
    marginBottom: 30
  },
  circle: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    width: 40,
    height: 40,
    borderColor: "#3c3c3b",
    padding: 10,
    borderRadius: 44 / 2
  },
  completeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.YELLOW,
    padding: 10,
    height: 50,
    borderRadius: 8,
    fontFamily: "Roboto-Bold",
    marginTop: 20,
    width: "80%"
  },
  blueButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.CIAN,
    padding: 10,
    width: "80%",
    height: 50,
    borderRadius: 8,
    fontFamily: "Roboto-Bold",
    marginTop: 20
  }
});
