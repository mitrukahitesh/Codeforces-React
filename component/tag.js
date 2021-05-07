import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TagComponent = ({ item }) => {
    return (
        <View style={styles.tagBox}>
            <Text style={styles.tagName}>{item}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tagBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#3081cc',
        padding: 5,
        marginStart: 3,
        marginEnd: 3,
        borderRadius: 4,
        marginTop: 8
    },
    tagName: {
        color: '#fff',
        fontSize: 12
    }
});

export default TagComponent