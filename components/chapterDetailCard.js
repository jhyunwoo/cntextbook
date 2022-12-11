import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ChapterDetailCard({ navigation, data, isDark }) {
    const setDetail = async (value) => {
        try {
            await AsyncStorage.setItem('@question', value)
        } catch (e) {
            console.error(e)
        }
    }

    const styles = StyleSheet.create({
        card: {
            backgroundColor: isDark ? '#101010' : 'white',
            margin: 12,
            marginHorizontal: 24,
            borderRadius: 14,
        },
        cardTest: {
            fontSize: 15,
        },
        cardMainTitle: {
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 4,
            marginLeft: 3,
            color: isDark ? 'white' : 'black',
        },
        cardQuestionTitle: {
            fontSize: 20,
            fontWeight: '500',
            marginLeft: 3,
            color: isDark ? 'white' : 'black',
        },
        cardInner: {
            margin: 18,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
    })

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                navigation.push('TextView')
                setDetail(data.title)
            }}>
            <View style={styles.cardInner}>
                <Text style={styles.cardMainTitle}>{data.chapter}</Text>
                <Text style={styles.cardQuestionTitle}>{data.question}</Text>
            </View>
        </TouchableOpacity>
    )
}
