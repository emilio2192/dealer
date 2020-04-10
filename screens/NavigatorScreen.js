import * as React from "react";
import {
  Alert,
  AsyncStorage,
  Dimensions,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import assigment from "../services/Assignments";
import assignment from "../services/Assignments";
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  ProviderPropType
} from "react-native-maps";
import { getLocation } from "../services/location-service";
import GOOGLE from "../constants/Google";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapViewDirections from "react-native-maps-directions";
import Colors from "../constants/Colors";
import { LocationList } from "../components/LocationList";
// import {TouchableOpacity} from 'react-native-gesture-handler';
import { TouchableOpacity } from "react-native";
import { getDistance } from "geolib";
import Endpoints from "../constants/Endpoints";
import endpoints from "../constants/Endpoints";
import { gateway } from "../services/gateway";

import constants from "../constants/Server";
import server from "../constants/Server";

let savedRegion;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 14.521837;
const LONGITUDE = -90.600022;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = 0.003;
let globalInterval;
const FINISH_DISTANCE = 15;

export default class NavigatorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.mapView = null;
  }

  static navigationOptions = {
    header: null
  };

  state = {
    region: {
      latitude: 0,
      longitude: 0
    },
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }),
    origin: {
      latitude: LATITUDE,
      longitude: LONGITUDE
    },
    item: {},
    interval: null
  };

  async componentDidMount() {
    const assignmentId = await AsyncStorage.getItem("assignment");
    // const assignmentId = 'x_lTRmuZF';
    console.log("ID ASSIGNMENT" + assignmentId);

    const response = await gateway(
      Endpoints.GetAssignement(assignmentId),
      "GET"
    );
    console.log("RESPONSE", response);
    let item = response.Assignment;

    item.locations = await item.locations.map(item => {
      let newItem = item;
      newItem["active"] = false;
      return newItem;
    });

    console.log("=============", item.locations);
    for (let i = 0; i < item.locations.length; i++) {
      if (item.locations[i].status === "1") {
        item.locations[i]["active"] = true;
        i = item.locations.length;
      }
    }

    console.log("IIIIIITEEEEEEM", item);
    this.setState({ item });
    this.forceUpdate();
    console.log("ITEM " + this.state.item);
    /*this.getInitialState();
        globalInterval = setInterval(() => {
            this.getInitialState();
        }, 5000);*/

    getLocation().then(async data => {
      this.updateState({
        latitude: data.latitude,
        longitude: data.longitude
      });
      this.animate(data.latitude, data.longitude);
    });

    if (Platform.OS === "ios") {
      const interval = setInterval(() => {
        this.getInitialState();
      }, 1000 * 5);
      this.setState({ interval });
    }
  }

  getInitialState() {
    getLocation().then(async data => {
      // this.updateState({
      //     latitude: data.latitude,
      //     longitude: data.longitude,
      // });
      // this.animate(data.latitude, data.longitude);

      let user = await AsyncStorage.getItem("userInformation");
      user = JSON.parse(user);
      const dataSend = {
        assignmentId: user.id,
        newLocation: `${data.latitude},${data.longitude}`
      };
      fetch(server.domain + endpoints.changeMessengerLocationAssigment, {
        method: "POST",
        headers: constants.headers,
        body: JSON.stringify(dataSend)
      });
    });
  }

  updateState(location) {
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      origin: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    });
  }

  animate(newLat, newLong) {
    const { coordinate } = this.state;
    const newCoordinate = {
      latitude: newLat,
      longitude: newLong,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    coordinate.timing(newCoordinate).start();
    this.mapView.animateToRegion(newCoordinate, 1000 * 2);
  }

  async _finishAdress() {
    const locations = this.state.item.locations;
    const actualPoint = this.state.item.locations.find(element => {
      return element.active;
    });
    const actualCoor = {
      latitude: actualPoint.lat,
      longitude: actualPoint.lng
    };
    if (getDistance(this.state.origin, actualCoor) <= FINISH_DISTANCE || true) {
      const index = locations.findIndex(element => {
        return element.active;
      });
      if (index !== locations.length - 1) {
        locations[index].active = false;
        locations[index].status = 2;
        const responseFinish = assigment.endLocation(locations);
        locations[index + 1].active = true;
        this.setState({ item: { locations } });
        // ultimo punto
      } else if (index == locations.length - 1) {
        locations[index].status = 2;
        const responsePoint = assigment.endLocation(locations);
        const responseFinish = assigment.finishAssignment();
        clearInterval(globalInterval);
        AsyncStorage.removeItem("assignment", () => {
          AsyncStorage.removeItem("confirmedAssignment", async () => {
            await AsyncStorage.setItem("userStatus", "true");
            clearInterval(this.state.interval);
            this.props.navigation.navigate("Main");
          });
        });
      }
    } else {
      Alert.alert(
        "Distancia requerida",
        `Sólo puedes finalizar un punto, cuando estés a ${FINISH_DISTANCE} metros de dicho punto.`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  render() {
    let width = Dimensions.get("window").width;
    const height = 400;
    let { item } = this.state;
    let activeElement =
      item.locations &&
      item.locations.find(element => {
        return typeof element.active !== "undefined" && element.active;
      });
    console.log(activeElement);
    return (
      <ScrollView style={[styles.container]}>
        {item.locations && (
          <MapView
            fitToElements={MapView.ANIMATED_FIT}
            provider={PROVIDER_GOOGLE}
            customMapStyle={GOOGLE.MinimalMap}
            initialRegion={{
              latitude: +activeElement.lat,
              longitude: +activeElement.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            zIndex={999}
            style={{
              width: width,
              height: height,
              position: "relative",
              zIndex: 99,
              bottom: 0,
              top: 0,
              left: 0,
              right: 0
            }}
            ref={c => (this.mapView = c)}
          >
            <Marker.Animated
              coordinate={this.state.origin}
              ref={marker => {
                this.marker = marker;
              }}
            >
              <MaterialIcons
                name="person-pin-circle"
                size={44}
                color={Colors.YELLOW}
              />
            </Marker.Animated>
            <Marker
              coordinate={{
                latitude: +activeElement.lat,
                longitude: +activeElement.lng
              }}
            >
              <MaterialIcons
                name="location-on"
                size={44}
                color={Colors.YELLOW}
              />
            </Marker>
            <MapViewDirections
              origin={this.state.origin}
              destination={{
                latitude: +activeElement.lat,
                longitude: +activeElement.lng
              }}
              apikey={GOOGLE.apiKey}
              strokeWidth={4}
              strokeColor={Colors.CIAN}
              optimizeWaypoints={true}
            />
          </MapView>
        )}
        {item.locations && (
          <View style={styles.orderDetails}>
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.DARK,
                fontSize: 20
              }}
            >
              Dirección: {activeElement.address}
            </Text>
            <Text
              style={{ fontWeight: "bold", color: Colors.DARK, fontSize: 14 }}
            >
              Método de pago:
              {item.paymentMethod === "cdcard" ? "Tarjeta" : "Efectivo"}
            </Text>
            {item.subject && item.subject.contactName ? (
              <Text
                style={{ fontWeight: "bold", color: Colors.DARK, fontSize: 14 }}
              >
                Contacto: {item.subject.contactName}
              </Text>
            ) : null}
            {item.subject.contactPhone ? (
              <Text
                style={{ fontWeight: "bold", color: Colors.DARK, fontSize: 14 }}
              >
                Teléfono: {item.subject.contactPhone}
              </Text>
            ) : null}
            <View style={{ paddingTop: 20 }}>
              {item.locations.map((location, index) => (
                <LocationList location={location} index={index} key={index} />
              ))}
            </View>

            <TouchableOpacity
              style={styles.blueButton}
              onPress={() =>
                Linking.openURL(
                  `https://www.waze.com/ul?ll=${activeElement.lat}%2C${activeElement.lng}&navigate=yes&zoom=17`
                )
              }
            >
              <Image
                style={styles.imageButton}
                source={require("../assets/images/waze.png")}
              />
              <Text style={{ color: "white", fontWeight: "bold" }}>
                ABRIR EN WAZE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => this._finishAdress()}
            >
              <Image
                style={styles.imageButton}
                source={require("../assets/images/finish-line.png")}
              />

              <Text style={{ color: "white", fontWeight: "bold" }}>
                FINALIZAR PUNTO
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}

NavigatorScreen.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  imageButton: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 15
  },
  container: {
    flex: 1
  },
  orderDetails: {
    paddingHorizontal: 24,
    paddingBottom: 50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#727272",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 15,
    backgroundColor: "white",
    top: -40,
    paddingTop: 40,
    marginBottom: -50
  },
  completeButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.YELLOW,
    padding: 10,
    height: 50,
    borderRadius: 5,
    alignSelf: "stretch",
    zIndex: 10,
    fontFamily: "roboto-bold",
    marginTop: 20,
    flexDirection: "row"
  },
  blueButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.CIAN,
    padding: 10,
    height: 50,
    borderRadius: 5,
    alignSelf: "stretch",
    zIndex: 10,
    fontFamily: "roboto-bold",
    flexDirection: "row",
    marginTop: 20
  }
});
