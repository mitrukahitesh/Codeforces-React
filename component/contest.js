import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Linking, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import * as AddCalendarEvent from 'react-native-add-calendar-event'
import moment from 'moment';

const ContestComponent = ({ item }) => {
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

    function getDuration(seconds) {
        var hrs = Math.floor(seconds / 3600);
        var minutes = (seconds % 3600) / 60;
        return (hrs + ' : ' + minutes);
    }

    function getStartTime(seconds) {
        var date = new Date(seconds * 1000);
        const day = days[date.getDay()]
        const dayMonth = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        const time = date.toLocaleTimeString();
        return `${day} ${dayMonth} ${month} ${year} ${time}`;
    }

    const addToCalendar = () => {
        const name = item.name
        const offset = new Date().getTimezoneOffset()
        moment().utc(false)
        const startDate = moment(item.startTimeSeconds * 1000).utc(false).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        const endDate = moment(item.startTimeSeconds * 1000 + item.durationSeconds * 1000).utc(false).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        const eventConfig = {
            title: name,
            startDate: startDate,
            endDate: endDate
        }
        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then((eventInfo) => {
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const shareContest = () => {
        const URL = `https://codeforces.com/contests/${item.id}`
        const options = {
            message: `Check this Codeforces contest\n\n${URL}`
        }
        Share.share(options)
            .then(response => {

            })
            .catch(error => {
                console.log(error)
            })
    }

    const takeToContest = () => {
        const URL = `https://codeforces.com/contests/${item.id}`
        Linking.canOpenURL(URL)
            .then(supported => {
                Linking.openURL(URL)
            })
            .catch(err => {
                ToastAndroid.show('Oops! Can\'t open linkr', ToastAndroid.LONG);
            })
    }

    return (
        <View style={styles.box}>
            <TouchableOpacity onPress={takeToContest}>
                <Text style={styles.contestName}>{item.name}</Text>
            </TouchableOpacity>
            <Text style={styles.otherText}>Type: {item.type}</Text>
            <Text style={styles.otherText}>Duration: {getDuration(item.durationSeconds)}</Text>
            <Text style={styles.otherText}>Start Time: {getStartTime(item.startTimeSeconds)}</Text>
            <View style={styles.innerBox}>
                {item.startTimeSeconds * 1000 > new Date().getTime()
                    ?
                    <TouchableOpacity onPress={addToCalendar}>
                        <Icon name='calendar' size={25} color='#cc0000' style={styles.calendar} />
                    </TouchableOpacity>
                    :
                    null
                }
                <TouchableOpacity onPress={shareContest}>
                    <Icon name='share' size={25} color='#cc0000' style={styles.calendar} />
                </TouchableOpacity>
            </View>
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
    contestName: {
        color: '#3081cc',
        fontSize: 16
    },
    otherText: {
        color: '#757575'
    },
    innerBox: {
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },
    calendar: {
        paddingEnd: 25,
        paddingTop: 5
    }
})

export default ContestComponent