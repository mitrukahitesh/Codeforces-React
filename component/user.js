import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

const UserComponent = ({ item }) => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]

    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thurs',
        'Fri',
        'Sat'
    ]

    function getTime(seconds) {
        var date = new Date(seconds * 1000);
        const day = days[date.getDay()]
        const dayMonth = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        const time = date.toLocaleTimeString();
        return `${day} ${dayMonth} ${month} ${year} ${time}`;
    }

    return (
        <View>
            {item.handle ? <Text style={styles.handle}>{item.handle}</Text> : null}
            {item.titlePhoto ? <Image source={{ uri: item.titlePhoto }} style={styles.profilePic} /> : null}
            {item.lastOnlineTimeSeconds ? <Text style={styles.details}>Last online: {getTime(item.lastOnlineTimeSeconds)}</Text> : null}
            {item.firstName ? <Text style={styles.details}>First Name: {item.firstName}</Text> : null}
            {item.lastName ? <Text style={styles.details}>Last Name: {item.lastName}</Text> : null}
            {item.country ? <Text style={styles.details}>Country: {item.country}</Text> : null}
            {item.city ? <Text style={styles.details}>City: {item.city}</Text> : null}
            {item.rank ? <Text style={styles.details}>Rank: {item.rank}</Text> : null}
            {item.maxRank ? <Text style={styles.details}>Max Rank: {item.maxRank}</Text> : null}
            {item.rating ? <Text style={styles.details}>Rating: {item.rating}</Text> : null}
            {item.maxRating ? <Text style={styles.details}>Max Rating: {item.maxRating}</Text> : null}
            {item.organization ? <Text style={styles.details}>Organization: {item.organization}</Text> : null}
            {item.friendOfCount ? <Text style={styles.details}>Friend of: {item.friendOfCount}</Text> : null}
            {item.contribution ? <Text style={styles.details}>Contribution: {item.contribution}</Text> : null}
            {item.registrationTimeSeconds ? <Text style={styles.details}>Registered on: {getTime(item.registrationTimeSeconds)}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    handle: {
        color: '#3081cc',
        fontSize: 28
    },
    profilePic: {
        borderRadius: 4,
        width: 120,
        height: 120
    },
    details: {
        marginTop: 5,
        fontSize: 16,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    }
})

export default UserComponent;