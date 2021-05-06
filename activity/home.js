import React, { useState } from 'react';
// import Navigator from './navigator/navigator';
import { Button, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import ContestComponent from '../component/contest'

const Home = ({ navigation }) => {
    const URL = 'https://codeforces.com/api/contest.list'
    const [contests, setContests] = useState();

    const goToUser = () => {
        navigation.navigate('User');
    }

    const goToProblems = () => {
        navigation.navigate('Problem');
    }

    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(response => {
            setContests(prevContests => {
                return response.result;
            });
        })
        .catch(error => console.log(error))
    return (
        <View style={styles.outerFlex}>
            <FlatList data={contests} renderItem={({ item }) => (
                <ContestComponent item={item} />
            )} />
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