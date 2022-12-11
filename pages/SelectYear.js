import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SelectYear({ navigation }) {
    const storeYear = async (value) => {
        try {
            await AsyncStorage.setItem('@year', value)
            navigation.push('MainPage')
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <View style={styles.center}>
            <Text style={styles.yearTitle}>학년을 선택하세요</Text>
            <View style={styles.selectArea}>
                <TouchableOpacity onPress={() => storeYear('1')} style={styles.yearButton}>
                    <Text style={styles.yearText}>1학년</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => storeYear('2')} style={styles.yearButton}>
                    <Text style={styles.yearText}>2학년</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FF9518',
    },
    yearTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600',
    },
    selectArea: {
        marginTop: 20,
    },
    yearButton: {
        backgroundColor: 'white',
        paddingHorizontal: 40,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 10,
    },
    yearText: {
        fontSize: 20,
        fontWeight: '500',
    },
})
