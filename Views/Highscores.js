import React, {useEffect} from 'react';
import {Alert, FlatList, Text, View, TouchableOpacity} from 'react-native';
import LoadingSpinner from "./Components/LoadingAnimation";

function ordinal_suffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

const Highscores = ({getUsers, styles, theme, highscores}) => {

    useEffect(() => {
        if(highscores.status !== "success" )
            getUsers()
    }, []);

    return (
        highscores.status !== "success" ?
            <LoadingSpinner/>
            :
            <View>
                <FlatList
                    data={highscores.list}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => {
                            Alert.alert("Rank", item.name + " is currently ranked " + ordinal_suffix(index) + " with " + item.score + "points");
                        }}>
                            <View
                                style={[styles.row, {backgroundColor: index % 2 === 0 ? theme.colors.backgroundColor : theme.colors.smallDetails}]}>
                                <Text style={styles.h2}>
                                    {ordinal_suffix(index += 1)}
                                </Text>
                                <Text style={styles.h3} numberOfLines={1}>{item.name}
                                </Text>
                                <Text style={styles.h3}>{item.score}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index}
                />
            </View>
    )
}

export default Highscores;
