import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect } from '../services/socket';


function Main({ navigation }) {
    const [users, setUsers] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

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

    function setupWebsocket() {
        const { latitude, longitude } = currentRegion;
        connect(latitude, longitude, techs,);
    }

    async function loadUsers() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });
        setUsers(response.data.users);
        setupWebsocket();

    }

        function handleRegionChanged(region) {
            console.log(region);
            setCurrentRegion(region);
        }

    if (!currentRegion) {
        return null;
    }


    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
                {users.map( user =>(
                    <Marker key={user._id}coordinate={ { latitude: user.location.coordinates [1], longitude: user.location.coordinates [0] }}>
                    <Image style={styles.avatar} source={{ uri: user.avatar_url }}/>
                    <Callout onPress={()=>{
                        navigation.navigate('Profile', { github_username: user.github_username });
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userBio}>{user.bio}</Text>
                <Text style={styles.userTechs}>{user.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                style={styles.searchInput}
                placeholder="Search Professionals"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect= {false}
                value={techs}
                onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadUsers} style={styles.loadButton}>
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
        top: 20,
        left: 15,
        right: 10,
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
        marginLeft: 10,
        elevation: 20,
    }



})

export default Main;