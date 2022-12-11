import { StyleSheet, Text, View, ScrollView, useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Header from '../components/header'
import ChapterDetailCard from '../components/chapterDetailCard'

export default function ChapterList({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [questionList, setQuestionList] = useState([])
    const [test, setTest] = useState('')
    const [isDark, setIsDark] = useState(false)
    const colorScheme = useColorScheme()
    const start = async () => {
        const storedVersion = await AsyncStorage.getItem('@version')
        const storedYear = await AsyncStorage.getItem('@year')
        const selectedChapter = await AsyncStorage.getItem('@selected')
        const testData = await AsyncStorage.getItem('@test')
        setTest(testData)
        const listData = await fetch(
            `https://cntextbookapi.moveto.kr/v${storedVersion}/y${storedYear}/${selectedChapter}`
        )
        const listOfChapter = await listData.json()
        if (listData.status === 200) {
            setQuestionList(listOfChapter)
        }
        // check dark mode
        if (colorScheme === 'dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
    }

    const wrap = () => {
        setIsLoading(true)
        start()
        setIsLoading(false)
    }
    useEffect(() => {
        wrap()
    }, [colorScheme])

    const styles = StyleSheet.create({
        mainBackground: {
            flex: 1,
            backgroundColor: isDark ? '#000000' : '#FFFAF4',
        },
        chapters: {
            flex: 10,
        },
        card: {
            backgroundColor: 'white',
            margin: 12,
            borderRadius: 10,
        },
        cardTest: {
            fontSize: 15,
        },
        cardTitle: {
            fontSize: 25,
        },
        cardInner: {
            margin: 8,
        },
    })
    return isLoading ? (
        <View
            style={{
                backgroundColor: '#FFBB6A',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text style={{ fontSize: 40, fontWeight: '600', color: 'white' }}>Loading...</Text>
        </View>
    ) : (
        <View style={styles.mainBackground}>
            <Header test={test} isDark={isDark} />
            <View style={styles.chapters}>
                <ScrollView>
                    {questionList.map((data, key) => {
                        return (
                            <ChapterDetailCard
                                data={data}
                                key={key}
                                navigation={navigation}
                                isDark={isDark}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}
