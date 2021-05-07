import React, { useState } from 'react';
// import Navigator from './navigator/navigator';
import { FlatList, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import ProblemComponent from '../component/problem'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Problem = ({ navigation }) => {
    const URL = 'https://codeforces.com/api/problemset.problems'
    const [problems, setProblems] = useState(null);
    const [latestData, setLatestData] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [reRender, setReRender] = useState(false);

    const loadLocalData = () => {
        AsyncStorage.getItem('PROBLEMS')
            .then(response => {
                if (response !== null) {
                    setProblems(prevProblems => {
                        const json = JSON.parse(response)
                        return json.result.problems;
                    })
                } else {
                    fetchLatestData()
                }
            })
            .catch(err => {
            })
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
                    delete response.result.problemStatistics
                    if (newDataAvailable(response)) {
                        AsyncStorage.setItem('PROBLEMS', JSON.stringify(response))
                            .then(() => {
                                if (problems !== null) {
                                    ToastAndroid.show('New problems Available!', ToastAndroid.LONG);
                                }
                                setProblems(prevProblems => {
                                    return response.result.problems;
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

    if (problems === null) {
        loadLocalData();
    } else {
        fetchLatestData();
    }

    const newDataAvailable = (response) => {
        if (problems === null) {
            return true
        }
        if (response.result.problems.length !== problems.length) {
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
                delete response.result.problemStatistics
                if (newDataAvailable(response)) {
                    AsyncStorage.setItem('problems', JSON.stringify(response))
                        .then(() => {
                            if (problems !== null) {
                                ToastAndroid.show('New problems Available!', ToastAndroid.LONG);
                            }
                            setProblems(prevProblems => {
                                return response.result.problems;
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

    const sort = () => {
        var newData = problems
        if (newData[0].rating > 800) {
            newData.sort((a, b) => {
                return a.rating - b.rating;
            })
        } else {
            newData.sort((a, b) => {
                return b.rating - a.rating;
            })
        }
        setProblems(prevData => {
            return newData
        })
        setReRender(prevData => {
            return !prevData
        })
    }

    const filter = () => {

    }

    return (
        <View style={styles.outerFlex}>
            <FlatList data={problems} extraData={reRender} renderItem={({ item }) => (
                <ProblemComponent item={item} />
            )} refreshing={refreshing} onRefresh={refresh} keyExtractor={item => item.contestId + item.index} />
            <View style={styles.innerFlex}>
                <TouchableOpacity onPress={sort}>
                    <Icon name='sort' size={30} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity onPress={filter}>
                    <Icon name='filter' size={30} color='#fff' />
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

export default Problem;