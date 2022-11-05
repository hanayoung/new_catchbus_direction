import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';

const Gyoanggyo = (head, location) => {
    return (
        <ScrollView>
            <View style={[styles.row, styles.borderStyle]}>
                {head.head.map((head, index) => {
                    return (
                        <View key={index} style={[styles.rowItem, index >= 1 && { flexGrow: 1 }]}>
                            <Text style={[styles.rowItemText]}>{head}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={[styles.column, styles.borderStyle]}>
                {head.location.map((values, index) => {
                    return (
                        <View style={[styles.row, styles.borderStyle]}>
                            {values.map((value, index) => {
                                return (
                                    <View key={index} style={[styles.rowValue, index >= 1 && { flexGrow: 1 }]}>
                                        <Text style={[styles.rowItemText]}>{value}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    rowItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        paddingVertical: 8,
        paddingHorizontal: 4,
        height: 80,
    },  
    rowValue: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        paddingVertical: 8,
        paddingHorizontal: 4,
        height: 50,
    },
    rowItemText: { textAlign: 'center' },
    borderStyle: {
        borderBottomWidth: 1,
        width: (Dimensions.get('window').width - 40),
    },
    locationButton: {
        width: 34,
        height: 34,
    },
});

export default Gyoanggyo;