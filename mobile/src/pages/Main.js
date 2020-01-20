import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
    const [ currentRegion, setCurrentRegion ] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    },
    []);

    if (!currentRegion) {
        return null;
    }


    return (
    <MapView initialRegion={currentRegion} style={ styles.map }>
        <Marker coordinate={ { latitude: 53.3223839, longitude: -6.2474962 }}>
            <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/43343496?s=460&v=4'}}/>
            <Callout onPress={()=>{
                navigation.navigate('Profile', { github_username: 'Daniel-Simoes'});
            }}>
                 <View style={styles.callout}>
                    <Text style={styles.userName}>Daniel Simões</Text>
                    <Text style={styles.userBio}>Apaixonado por NodeJS, ReactJS e React Native.</Text>
                    <Text style={styles.userTechs}>NodeJS, ReactJS e React Native.</Text>
                 </View>
            </Callout>
        </Marker>
    </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        borderWidth: 1,
        borderColor:'#ec5353',
    },
    callout: {
        width: 260,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    userBio: {
        color: '#666',
        marginTop: 5,
    },
    userTechs: {
        marginTop: 5,
    },
})

export default Main;