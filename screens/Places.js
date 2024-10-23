import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { app } from '../firebaseConfig';
import { Button, Input, ListItem, Icon } from 'react-native-elements';
import { getDatabase, ref, onValue, remove } from "firebase/database";

export default function Places({ navigation }) {
    const [places, setPlaces] = useState([]);
    const [address, setAddress] = useState('');

    const database = getDatabase(app);


    useEffect(() => {
        const itemsRef = ref(database, 'places/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const placesList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setPlaces(placesList);
            } else {
                setPlaces([]);
            }
        });
    }, [database]);


    const handleDelete = (id) => {
        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", 
                    onPress: () => {
                        const itemRef = ref(database, `places/${id}`);
                        remove(itemRef)
                          .then(() => {
                              Alert.alert('Success', 'Address deleted successfully');
                          })
                          .catch((error) => {
                              Alert.alert('Error', 'Failed to delete address: ' + error.message);
                          });
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>{item.name}</ListItem.Title>
            </ListItem.Content>
            <Icon
                name="delete"
                color="#ff6347"
                onPress={() => handleDelete(item.id)}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Map', { address: item.name })}>
                <Icon name="map" color="#007bff" />
            </TouchableOpacity>
        </ListItem>
    );

    return (
        <View style={styles.container}>
            <Input
                placeholder="Type in address"
                value={address}
                onChangeText={setAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
            />

            <Button
                title="Show on map"
                onPress={() => navigation.navigate('Map', { address })}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
            />

            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 20,
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});