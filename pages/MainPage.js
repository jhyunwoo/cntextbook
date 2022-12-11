import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    useColorScheme,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Header from '../components/header'
import ChapterCard from '../components/chapterCard'
import * as Linking from 'expo-linking'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function MainPage({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [version, setVersion] = useState('0')
    const [year, setYear] = useState('0')
    const [chapter, setChapter] = useState([])
    const [test, setTest] = useState('')
    const [noti, setNoti] = useState('')
    const [reload, setReload] = useState(0)
    const [isDark, setIsDark] = useState(false)
    const colorScheme = useColorScheme()
    const start = async () => {
        // check dark mode
        if (colorScheme === 'dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
        // version function
        try {
            const versionResponse = await fetch('https://cntextbookapi.moveto.kr')
            const versionData = await versionResponse.json()
            if (versionResponse.status === 200) {
                try {
                    await AsyncStorage.setItem('@version', String(versionData.currentVersion))
                } catch (e) {
                    console.error(e)
                }
            }
        } catch (e) {
            console.error(e)
        }

        try {
            const storedVersion = await AsyncStorage.getItem('@version')
            if (storedVersion !== null) {
                setVersion(storedVersion)
            }
        } catch (e) {
            console.error(e)
        }

        // year check function
        try {
            const storedYear = await AsyncStorage.getItem('@year')
            if (storedYear === '1' || storedYear === '2') {
                setYear(storedYear)
            } else navigation.push('SelectYear')
        } catch (e) {
            console.error(e)
        }

        // get notification
        try {
            const notiRes = await fetch('https://cntextbookapi.moveto.kr/noti')
            if (notiRes.status === 200) {
                const notiData = await notiRes.json()
                setNoti(notiData.title)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const getChapterList = async () => {
        const chapterResponse = await fetch(`https://cntextbookapi.moveto.kr/v${version}/y${year}`)
        const chapterData = await chapterResponse.json()
        setChapter(chapterData.listOfText)
        setTest(chapterData.test)
        try {
            await AsyncStorage.setItem('@test', chapterData.test)
        } catch (e) {
            console.error(e)
        }
    }

    // reset year data
    const resetYear = async () => {
        try {
            await AsyncStorage.removeItem('@year')
        } catch (e) {
            console.error(e)
        }
    }

    const wrap = () => {
        setIsLoading(true)
        start()
        setIsLoading(false)
    }

    useEffect(() => {
        getChapterList()
    }, [version, year, reload])

    useEffect(() => {
        wrap()
    }, [reload, colorScheme])

    const styles = StyleSheet.create({
        mainBackground: {
            flex: 1,
            backgroundColor: isDark ? '#000000' : '#FFFAF4',
        },
        chapters: {
            flex: 10,
        },

        resetYear: {
            flex: 1,
            padding: 4,
            paddingHorizontal: 10,
        },
        resetYearArea: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
            marginBottom: 24,
        },
        notiBox: {
            backgroundColor: '#FF9518',
            margin: 12,
            borderRadius: 14,
            marginHorizontal: 24,
            padding: 14,
            paddingLeft: 20,
        },
        notiTitle: {
            fontSize: 17,
            color: 'white',
            fontWeight: '500',
            marginBottom: 4,
        },
        notiText: {
            fontSize: 20,
            color: 'white',
            fontWeight: '600',
        },
        reloadButton: {
            backgroundColor: isDark ? '#1A1816' : 'white',
            borderWidth: 2,
            borderColor: isDark ? '#CE7814' : '#FF9518',
            padding: 8,
            paddingHorizontal: 24,
            borderRadius: 30,
        },
    })

    return isLoading || version === '0' ? (
        <SafeAreaProvider
            style={{
                backgroundColor: '#FFBB6A',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text style={{ fontSize: 40, fontWeight: '600', color: 'white' }}>Loading...</Text>
        </SafeAreaProvider>
    ) : (
        <SafeAreaProvider style={styles.mainBackground}>
            <Header test={test} isDark={isDark} />
            <View style={styles.chapters}>
                <ScrollView>
                    {noti !== '' ? (
                        <TouchableOpacity
                            style={styles.notiBox}
                            onPress={() =>
                                Linking.openURL('https://www.instagram.com/cntextbook/')
                            }>
                            <Text style={styles.notiTitle}>공지</Text>
                            <Text style={styles.notiText}>{noti}</Text>
                        </TouchableOpacity>
                    ) : (
                        ''
                    )}
                    {chapter.map((data, key) => {
                        return (
                            <ChapterCard
                                chapter={data}
                                navigation={navigation}
                                key={key}
                                isDark={isDark}
                            />
                        )
                    })}
                    <View style={styles.resetYearArea}>
                        <TouchableOpacity
                            onPress={() => {
                                setReload((reload) => reload + 1)
                                Alert.alert('업데이트 완료', '최신 버전으로 업데이트 됨')
                            }}
                            style={styles.reloadButton}>
                            <Text style={{ color: '#FF9518' }}>지문 새로고침</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.resetYearArea}>
                        <TouchableOpacity
                            onPress={() => {
                                resetYear()
                                navigation.navigate('SelectYear')
                            }}
                            style={styles.resetYear}>
                            <Text style={{ color: 'gray' }}>학년 초기화</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    )
}
