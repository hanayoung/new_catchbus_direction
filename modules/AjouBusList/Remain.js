import React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { money } from '../AjouBus';

const Remain = (head, location) => {
    return (
        <ScrollView>
            <View style={[styles.row, styles.borderStyle]}>
                {head.head.map((head, index) => {
                    return (
                        <View key={index} style={[styles.rowItem, (index == 0 || index == 3) && { flexGrow: 1 }]}>
                            {index < 3 && <Text style={[styles.rowItemText]}>{head}</Text>}
                            {index == 3 &&
                                <View style={styles.column}>
                                    <View style={styles.borderSt}>
                                        <Text style={[styles.rowItemText]}>{head}</Text>
                                    </View>
                                    <View style={[styles.row]}>
                                        {money.map((money) => {
                                            return (
                                                <View style={styles.rowItem2}>
                                                    <Text style={[styles.rowItemText]}>{money}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>}
                        </View>
                    )
                })}
            </View>
            <View style={[styles.column, styles.borderStyle]}>
                {head.location.map((values, index) => {
                    return (
                        <View style={[styles.row, styles.borderStyle]}>
                            {values.map((value, index2) => {
                                return (
                                    <View key={index2} style={[styles.rowValue, (index2 == 0 || index2 == 3) && { flexGrow: 1 }]}>
                                        {index2 < 3 && <Text style={[styles.rowItemText]}>{value}</Text>}
                                        {(index2 == 3 && value == 'money') &&
                                            <View style={[styles.row]}>

                                                <View style={styles.rowItem2}>
                                                    <Text style={[styles.rowItemText]}>1,300</Text>
                                                </View>
                                                <View style={styles.rowItem2}>
                                                    <Text style={[styles.rowItemText]}>1,500</Text>
                                                </View>
                                            </View>
                                        }
                                        {(index2 == 3 && value == 'money2') &&
                                            <View style={[styles.row]}>
                                                <View style={styles.rowItem2}>
                                                    <Text style={[styles.rowItemText]}>1,000</Text>
                                                </View>
                                                <View style={styles.rowItem2}>
                                                    <Text style={[styles.rowItemText]}>1,200</Text>
                                                </View>
                                            </View>
                                        }
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
    rowItem2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        paddingVertical: 4,
        paddingHorizontal: 2,
        height: 25,
    },
    rowValue: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        paddingVertical: 8,
        paddingHorizontal: 4,
        height: 80,
    },
    rowValue2: {
        flexDirection: 'row',
        width: 70,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    rowItemText: { textAlign: 'center' },
    borderStyle: {
        borderBottomWidth: 1,
        width: (Dimensions.get('window').width - 40),
    },
    borderSt: {
        borderBottomWidth: 1,
        width: 100,
    },
    locationButton: {
        width: 34,
        height: 34,
    },
});

export default Remain;