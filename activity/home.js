import React, { useState } from 'react';
// import Navigator from './navigator/navigator';
import { FlatList, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import ContestComponent from '../component/contest'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const URL = 'https://codeforces.com/api/contest.list'
    const [contests, setContests] = useState(null);
    const [latestData, setLatestData] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadLocalData = () => {
        AsyncStorage.getItem('CONTESTS')
            .then(response => {
                if (response !== null) {
                    setContests(prevContests => {
                        const json = JSON.parse(response)
                        return json.result;
                    })
                }
                fetchLatestData()
            })
            .catch(err => {
                fetchLatestData()
            })
    }
    if (contests === null) {
        loadLocalData();
    }

    const fetchLatestData = () => {
        if (!latestData) {
            setLatestData(prevData => {
                return true
            })
            fetch(URL)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    if (newDataAvailable(response)) {
                        AsyncStorage.setItem('CONTESTS', JSON.stringify(response))
                            .then(() => {
                                if (contests !== null) {
                                    ToastAndroid.show('New Contests Available!', ToastAndroid.LONG);
                                }
                                setContests(prevContests => {
                                    return response.result;
                                });
                            })
                    }
                })
                .catch(error => {
                    setLatestData(prevData => {
                        return false
                    })
                    console.log(error)
                })
        }
    }

    const newDataAvailable = (response) => {
        if (contests === null) {
            return true
        }
        if (response.result[0].id !== contests[0].id) {
            return true
        }
        return false
    }

    const refresh = () => {
        setRefreshing(prevVal => {
            return true
        })
        fetch(URL)
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (newDataAvailable(response)) {
                    AsyncStorage.setItem('CONTESTS', JSON.stringify(response))
                        .then(() => {
                            if (contests !== null) {
                                ToastAndroid.show('New Contests Available!', ToastAndroid.LONG);
                            }
                            setContests(prevContests => {
                                return response.result;
                            });
                        })
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setRefreshing(prevVal => {
                    return false
                })
            })
    }

    const goToUser = () => {
        navigation.navigate('User');
    }

    const goToProblems = () => {
        navigation.navigate('Problem');
    }

    return (
        <View style={styles.outerFlex}>
            <FlatList data={contests} renderItem={({ item }) => (
                <ContestComponent item={item} />
            )} refreshing={refreshing} onRefresh={refresh} />
            <View style={styles.innerFlex}>
                <TouchableOpacity onPress={goToUser}>
                    <Icon name='user' size={30} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToProblems}>
                    <Icon name='laptop' size={30} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerFlex: {
        flex: 1,
        justifyContent: 'space-between'
    },
    innerFlex: {
        backgroundColor: '#3081cc',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
    }
});

export default Home;