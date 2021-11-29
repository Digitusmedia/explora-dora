import * as React from 'react';
import MapView, {AnimatedRegion, Circle, Marker, Overlay, PROVIDER_GOOGLE} from 'react-native-maps'
import {StyleSheet, Text, View, SafeAreaView, Dimensions, Animated} from 'react-native';
import * as Location from 'expo-location';
import MaskedView from "@react-native-masked-view/masked-view";
import {getDistance} from "geolib";

function MapPresenterFile() {
    const [location, setLocation] = React.useState({
        latitude: 59.3322,
        longitude: 18.0642,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [errorMsg, setErrorMsg] = React.useState(null);

    const coordinateArray = [
        {
            latitude: 59.32953119445494,
            longitude: 18.00289168513791
        },
        {
            latitude: 59.33015246382279,
            longitude: 18.003315711589828
        },
        {
            latitude: 59.329374724823495,
            longitude: 18.00520127602495
        },
        {
            latitude: 59.3284128809676,
            longitude: 18.004100611617844
        }
    ]
    getDistance(
        {latitude: 51.5103, longitude: 7.49347},
        {latitude: "51° 31' N", longitude: "7° 28' E"}
    );

    React.useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    }, []);

    React.useEffect(() => {
        Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Highest,
                distanceInterval: 5,
                timeInterval: 10000,
            },
            (pos) => {
                pos.coords.latitudeDelta = 0.01;
                pos.coords.longitudeDelta = 0.01;
                setLocation(pos.coords);
                console.log("Continuous location: " + JSON.stringify(pos.coords))
            }
        )
            .then(() => {
            })
            .catch((err) => {
                console.log("position error: ", err.message);
                setErrorMsg(err.message);
            });
    }, []);

    return (
        <SafeAreaView style={{alignItems: 'center'}}>
            <MaskedView maskElement={
                <View
                    style={{
                        // Transparent background because mask is based off alpha channel.
                        backgroundColor: 'transparent',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    { /*here is the place to put the clipping object for mask*/}
                    <View style={styles.circle}/>
                </View>
            }
            >
                {/* Shows behind the mask, you can put anything here, such as an image */}
                <MapView region={location} showsUserLocation={true}
                         provider={PROVIDER_GOOGLE} style={styles.map} customMapStyle={customMap} scrollEnabled={false}
                         zoomEnabled={false} rotateEnabled={false} pitchEnabled={false}>

                    {coordinateArray.map(coords => {
                        return (<Marker coordinate={coords}
                                        onPress={() => console.log("Distance to marker is " + getDistance(coords, location) + " meters")} />)})}
                                            < /MapView>
                                            </MaskedView>
                                            </SafeAreaView>
                                            );
                                        }

                                        const customMap=[
                            {
                                "elementType": "geometry",
                                "stylers": [
                            {
                                "color": "#212121"
                            }
                                ]
                            },
                            {
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#212121"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#9e9e9e"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.land_parcel",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.locality",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#bdbdbd"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#191919"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#181818"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#616161"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#1b1b1b"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#393939"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#8a8a8a"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#373737"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#989898"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#3c3c3c"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#989898"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway.controlled_access",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#4e4e4e"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#616161"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#3d3d3d"
                                    }
                                ]
                            }
                    ]
                        const styles = StyleSheet.create({
                            container: {
                                flex: 1,
                                backgroundColor: '#000000',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            map: {
                                flex: 1,
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height,
                            },
                            button: {
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#DDDDDD",
                                padding: 10
                            },
                            circle: {
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').width,
                                borderRadius: Dimensions.get('window').width / 2,
                                backgroundColor: 'red',
                                padding: 10,
                                shadowColor: '#000000',
                                shadowOffset: {
                                    width: 0,
                                    height: 3
                                },
                                shadowRadius: 50,
                                shadowOpacity: 1.0
                            }
                        });

                        export default MapPresenterFile;
