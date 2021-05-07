import { duration } from 'moment';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserComponent from '../component/user'
import ProgressDialog from 'react-native-progress-dialog';

const User = ({ navigation }) => {
    const URL = 'https://codeforces.com/api/user.info?handles=';
    const [users, setUsers] = useState(null);
    const [text, setTextState] = useState();
    const [visible, setVisible] = useState(false);

    const revertDialog = () => {
        setVisible(prevData => {
            return !prevData
        })
    }

    const loadLocalData = () => {
        AsyncStorage.getItem('USER')
            .then(response => {
                if (response !== null) {
                    setUsers(prevData => {
                        const json = JSON.parse(response)
                        return json.result
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (users === null) {
        loadLocalData();
    }

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
        revertDialog();
        fetch(`${URL}${text}`)
            .then(response => {
                return response.json()
            })
            .then(response => {
                AsyncStorage.setItem('USER', JSON.stringify(response))
                    .then(() => {
                        setUsers(prevUser => {
                            return response.result
                        })
                    })
                    .catch(err => {
                        ToastAndroid.show('Oops! Some error occurred..', ToastAndroid.LONG);
                        console.log(err)
                    })
            })
            .catch(err => {
                ToastAndroid.show('Oops! Some error occurred..', ToastAndroid.LONG);
                console.log(err)
            })
            .finally(() => revertDialog())
    }

    return (
        <View style={styles.box}>
            <TextInput placeholder='Userhandle' style={styles.input} onChangeText={textChangeListener} />
            <TouchableOpacity onPress={searchUser}>
                <Text style={styles.button}>Search</Text>
            </TouchableOpacity>
            <ProgressDialog visible={visible} label={`Searching ${text}`} loaderColor='#f8d23e' />
            <FlatList data={users} renderItem={({ item }) => (
                <UserComponent item={item} />
            )} keyExtractor={item => item.avatar} />
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