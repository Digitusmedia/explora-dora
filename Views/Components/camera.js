import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {Camera} from 'expo-camera';

export default function CameraView({navigation, route}) {
    const { title, lat, lon, styles, user, addPost} = route.params;

    //console.log("2. Camera props---------------------------------",route)

    const [camera, setCamera] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null)
            console.log("Image -------------------------------", data.uri);
            navigation.navigate("Claim Landmark", {title, lat, lon, data,styles, user,addPost})
        }
    }

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <View style={cameraStyles.container}>
            <Camera
                style={cameraStyles.camera}
                type={type}
                ref={ref => {
                    setCamera(ref);
                }}>
                <View style={cameraStyles.buttonContainer}>
                    <TouchableOpacity
                        style={cameraStyles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={cameraStyles.text}> Flip </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <Button title="Snap"
                    onPress={() => takePicture()}
            />
        </View>
    )
}

const cameraStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
