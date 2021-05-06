import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import * as AddCalendarEvent from 'react-native-add-calendar-event'
import moment from 'moment';

const Contest = ({ item }) => {
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
        const startDate = moment(item.startTimeSeconds * 1000).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        const endDate = moment(item.startTimeSeconds * 1000 + item.durationSeconds * 1000).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        const eventConfig = {
            title: name,
            startDate: startDate,
            endDate: endDate
        }
        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then((eventInfo) => {
                // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
                // These are two different identifiers on iOS.
                // On Android, where they are both equal and represent the event id, also strings.
                // when { action: 'CANCELED' } is returned, the dialog was dismissed
                console.warn(JSON.stringify(eventInfo));
            })
            .catch((error) => {
                // handle error such as when user rejected permissions
                console.warn(error);
            });
    }

    return (
        <View style={styles.box}>
            <Text style={styles.contestName}>{item.name}</Text>
            <Text style={styles.otherText}>Type: {item.type}</Text>
            <Text style={styles.otherText}>Duration: {getDuration(item.durationSeconds)}</Text>
            <Text style={styles.otherText}>Start Time: {getStartTime(item.startTimeSeconds)}</Text>
            {item.startTimeSeconds * 1000 > new Date().getTime()
                ?
                <TouchableOpacity onPress={addToCalendar}>
                    <Icon name='calendar' size={25} color='#b9001e' style={styles.calendar} />
                </TouchableOpacity>
                :
                null
            }
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
    calendar: {
        alignSelf: 'flex-end',
        paddingEnd: 20,
        paddingTop: 5
    }
})

export default Contest