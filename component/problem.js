import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Share, Linking, ToastAndroid, FlatList, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import TagComponent from './tag'

const ProblemComponent = ({ item }) => {
    const [names, setNames] = useState(item.tags);

    const goToProblem = () => {
        const URL = `https://www.codeforces.com/problemset/problem/${item.contestId}/${item.index}`
        Linking.canOpenURL(URL)
            .then(supported => {
                Linking.openURL(URL)
            })
            .catch(err => {
                ToastAndroid.show('Oops! Can\'t open linkr', ToastAndroid.LONG);
            })
    }

    const shareProblem = () => {
        const URL = `https://www.codeforces.com/problemset/problem/${item.contestId}/${item.index}`
        const options = {
            message: `Check this Codeforces problem\n\n${URL}`
        }
        Share.share(options)
            .then(response => {

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <View style={styles.box}>
            <TouchableOpacity onPress={goToProblem}>
                <Text style={styles.problemName}>{item.name}</Text>
            </TouchableOpacity>
            <Text style={styles.otherText}>Contest ID: {item.contestId + '-' + item.index}</Text>
            <Text style={styles.otherText}>Rating: {item.rating}</Text>
            <FlatList data={[...new Set(names)]} renderItem={({ item }) => (
                <TagComponent item={item} />
            )} horizontal={true} keyExtractor={item => item} />
            <TouchableOpacity onPress={shareProblem}>
                <Icon name='share' color='gray' size={25} style={styles.shareButton} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        margin: 7,
        padding: 10,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: '#f8d23e'
    },
    problemName: {
        color: '#3081cc',
        fontSize: 16
    },
    otherText: {
        color: '#757575'
    },
    shareButton: {
        alignSelf: 'flex-end',
        paddingEnd: 25,
        paddingTop: 5,
        marginTop: 10
    }
})

export default ProblemComponent