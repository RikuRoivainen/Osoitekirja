import { getDatabase, push, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Alert, View, Button, Text, StyleSheet } from 'react-native';
import { app } from '../firebaseConfig';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Map({ route }) {
    const { address } = route.params;
    const [location, setLocation] = useState(null);
    const [database] = useState(getDatabase(app));

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                let geocode = await Location.geocodeAsync(address);
                if (geocode.length > 0) {
                    const { latitude, longitude } = geocode[0];
                    setLocation({ latitude, longitude });
                }else {
                    Alert.alert('Error', 'Could not find location for the given address');
                }
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        };

        fetchLocation();
    }, [address])

    const handleSave = () => {
        if (address) {
            push(ref(database, 'places/'), { name: address })
        .then(() => {
            Alert.alert('Success', 'Address saved!');
        })
        .catch(error => {
            Alert.alert('Error', error.message);
        });
        } else {
            Alert.alert('Error', 'No address to save');
        }
    };

    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={address}
                    />
                </MapView>
            ) : (
                <Text>Loading map...</Text>
            )}
            <Button title="Save Address" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '80%',
    },
});