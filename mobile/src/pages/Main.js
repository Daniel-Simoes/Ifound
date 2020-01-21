import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

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
        <>
            <MapView initialRegion={currentRegion} style={styles.map}>
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
            <View style={styles.searchForm}>
                <TextInput 
                style={styles.searchInput}
                placeholder="Search Professionals"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect= {false}
                />
                <TouchableOpacity onPress={() =>{}} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF"/>
                </TouchableOpacity>
            </View>
        </>
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
    searchForm: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color:'#333',
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 16,
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 4,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor:'#ec5353',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        elevation: 20,
    }



})

export default Main;