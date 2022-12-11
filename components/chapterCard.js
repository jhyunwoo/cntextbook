import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ChapterCard({ navigation, chapter, isDark }) {
    const setSelectedChapter = async (value) => {
        try {
            await AsyncStorage.setItem('@selected', value.toLowerCase())
        } catch (e) {
            console.error(e)
        }
    }
    const styles = StyleSheet.create({
        card: {
            backgroundColor: isDark ? '#101010' : 'white',
            margin: 12,
            borderRadius: 14,
            marginHorizontal: 24,
        },
        cardTest: {
            fontSize: 15,
        },
        cardTitle: {
            fontSize: 25,
            fontWeight: '500',
            color: isDark ? 'white' : 'black',
        },
        cardInner: {
            margin: 18,
        },
    })

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                navigation.push('ChapterList')
                setSelectedChapter(chapter.fileName)
            }}>
            <View style={styles.cardInner}>
                <Text style={styles.cardTitle}>{chapter.title}</Text>
            </View>
        </TouchableOpacity>
    )
}
