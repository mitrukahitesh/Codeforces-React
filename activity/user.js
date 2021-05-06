import { duration } from 'moment';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import UserComponent from '../component/user'

const User = ({ navigation }) => {
    const URL = 'https://codeforces.com/api/user.info?handles=';
    const [users, setUsers] = useState();
    const [text, setTextState] = useState();

    const textChangeListener = (newText) => {
        setTextState(prevData => {
            return newText
        })
    }

    const searchUser = () => {
        if (text === "") {
            ToastAndroid.show('Userhandle cannot be empty', ToastAndroid.LONG)
            return
        }
        fetch(`${URL}${text}`)
            .then(response => {
                return response.json()
            })
            .then(response => {
                setUsers(prevUser => {
                    console.log(response.result)
                    return response.result
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <View style={styles.box}>
            <TextInput placeholder='Userhandle' style={styles.input} onChangeText={textChangeListener} />
            <TouchableOpacity onPress={searchUser}>
                <Text style={styles.button}>Search</Text>
            </TouchableOpacity>
            <FlatList data={users} renderItem={({ item }) => (
                <UserComponent item={item} keyExtractor={item => item.avatar} />
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        padding: 10
    },
    input: {
        borderWidth: 2,
        borderColor: '#f8d23e',
        paddingStart: 15,
        borderRadius: 8
    },
    button: {
        marginTop: 10,
        padding: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#cc0000',
        color: '#ffffff',
        borderRadius: 6,
        marginEnd: 10,
        paddingStart: 15,
        paddingEnd: 15
    }
})

export default User;