import React, { useState } from 'react';
// import Navigator from './navigator/navigator';
import { FlatList, View, StyleSheet, TouchableOpacity, ToastAndroid, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import ProblemComponent from '../component/problem'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import ProgressDialog from 'react-native-progress-dialog';

const Problem = ({ navigation }) => {
    const URL = 'https://codeforces.com/api/problemset.problems'
    const [problems, setProblems] = useState(null);
    const [latestData, setLatestData] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [selectCategory, setSelectCategory] = useState();
    const [visible, setVisible] = useState(false);
    var cat
    const revertDialog = () => {
        setVisible(prevData => {
            return !prevData
        })
    }

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

    const refreshUtility = (response) => {
        if (problems !== null) {
            ToastAndroid.show('New problems Available!', ToastAndroid.LONG);
        }
        setProblems(prevProblems => {
            return response.result.problems;
        });
    }

    const refresh = () => {
        var url = URL
        if (selectCategory !== null || selectCategory !== 'all') {
            url = `https://codeforces.com/api/problemset.problems?tags=${selectCategory}`
        }
        setRefreshing(prevVal => {
            return true
        })
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(response => {
                delete response.result.problemStatistics
                if (newDataAvailable(response)) {
                    if (selectCategory === null || selectCategory === 'all') {
                        AsyncStorage.setItem('problems', JSON.stringify(response))
                            .then(() => {
                                refreshUtility(response)
                            })
                    } else {
                        refreshUtility(response)
                    }
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
                if (a.rating === undefined) {
                    a.rating = 0
                }
                if (b.rating === undefined) {
                    b.rating = 0
                }
                return a.rating - b.rating;
            })
        } else {
            newData.sort((a, b) => {
                if (a.rating === undefined) {
                    a.rating = 0
                }
                if (b.rating === undefined) {
                    b.rating = 0
                }
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

    const filterContent = (category) => {
        revertDialog();
        setSelectCategory(category);
        var url = `https://codeforces.com/api/problemset.problems?tags=${category}`
        if (category === 'all') {
            url = URL
        }
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(response => {
                delete response.result.problemStatistics
                // AsyncStorage.setItem(category, JSON.stringify(response))
                //     .then(() => {
                //         if (problems !== null) {
                //             ToastAndroid.show('New problems Available!', ToastAndroid.LONG);
                //         }
                //         setProblems(prevProblems => {
                //             return response.result.problems;
                //         });
                //     })
                setProblems(prevProblems => {
                    return response.result.problems;
                });
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                revertDialog();
            })
    }

    return (
        <View style={styles.outerFlex}>
            <Picker
                selectedValue={selectCategory}
                onValueChange={(itemValue, itemIndex) =>
                    filterContent(itemValue)
                }
                mode='dialog'>
                <Picker.Item label="all" value="all" />
                <Picker.Item label="*special" value="*special" />
                <Picker.Item label="2-sat" value="2-sat" />
                <Picker.Item label="binary search" value="binary search" />
                <Picker.Item label="bitmasks" value="bitmasks" />
                <Picker.Item label="brute force" value="brute force" />
                <Picker.Item label="chinese remainder theorem" value="chinese remainder theorem" />
                <Picker.Item label="combinatorics" value="combinatorics" />
                <Picker.Item label="constructive algorithms" value="constructive algorithms" />
                <Picker.Item label="data structures" value="data structures" />
                <Picker.Item label="dfs and similar" value="dfs and similar" />
                <Picker.Item label="divide and conquer" value="divide and conquer" />
                <Picker.Item label="dp" value="dp" />
                <Picker.Item label="dsu" value="dsu" />
                <Picker.Item label="expression parsing" value="expression parsing" />
                <Picker.Item label="fft" value="fft" />
                <Picker.Item label="flows" value="flows" />
                <Picker.Item label="games" value="games" />
                <Picker.Item label="geometry" value="geometry" />
                <Picker.Item label="graph matchings" value="graph matchings" />
                <Picker.Item label="graphs" value="graphs" />
                <Picker.Item label="greedy" value="jgreedys" />
                <Picker.Item label="hashing" value="hashing" />
                <Picker.Item label="implementation" value="implementation" />
                <Picker.Item label="interactive" value="interactive" />
                <Picker.Item label="math" value="math" />
                <Picker.Item label="matrices" value="matrices" />
                <Picker.Item label="meet-in-the-middle" value="meet-in-the-middle" />
                <Picker.Item label="number theory" value="number theory" />
                <Picker.Item label="probabilities" value="probabilities" />
                <Picker.Item label="schedules" value="schedules" />
                <Picker.Item label="shortest paths" value="shortest paths" />
                <Picker.Item label="sortings" value="sortings" />
                <Picker.Item label="sting suffix structures" value="sting suffix structures" />
                <Picker.Item label="strings" value="strings" />
                <Picker.Item label="ternary search" value="ternary search" />
                <Picker.Item label="trees" value="trees" />
                <Picker.Item label="two pointers" value="two pointers" />
            </Picker>
            <ProgressDialog visible={visible} label={`Filtering...`} loaderColor='#f8d23e' />
            <FlatList data={problems} extraData={reRender} renderItem={({ item }) => (
                <ProblemComponent item={item} />
            )} refreshing={refreshing} onRefresh={refresh} keyExtractor={item => item.contestId + item.index} />
            <View style={styles.innerFlex}>
                <TouchableOpacity onPress={sort}>
                    <Icon name='sort' size={30} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity onPress={sort}>
                    <Text style={styles.sortText}>Sort by Rating</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    sortText: {
        color: '#fff',
        fontSize: 18,
        marginStart: 10
    }
});

export default Problem;