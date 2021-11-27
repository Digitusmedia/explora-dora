import React from 'react';
import {Alert, FlatList,Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from "react-redux";

function ordinal_suffix (i) {
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
const Highscores = () => {
    const styles = useSelector((state) => state.theme.value.style);
    const theme = useSelector((state) => state.theme.value.theme);
    return (

        <View>
            <FlatList

                data={[
                    {name: 'Devin', score: '154'},
                    {name: 'Gurra', score: '98'},
                    {name: 'Johanna', score: '65'},
                    {name: 'sara', score: '34'},
                    {name: 'bertil', score: '31'},
                    {name: 'ngt namn', score: '28'},
                    {name: 'the NOob1', score: '15'},
                    {name: 'the NOob2', score: '11'},
                    {name: 'the NOob3', score: '9'},
                    {name: 'the NOob4', score: '9'},
                    {name: 'the NOob5', score: '9'},

                ]}
                renderItem={({item, index}) =>(
                    <TouchableOpacity onPress={() => {
                        Alert.alert("Rank",item.name + " is currently ranked " + ordinal_suffix(index) + " with " + item.score + "points" );
                    }}>
                        <View style={[styles.row,  {backgroundColor: index % 2 === 0 ? theme.colors.backgroundColor : theme.colors.smallDetails}]}>
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
    )}

export default Highscores;