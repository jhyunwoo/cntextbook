import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
    Platform,
    useColorScheme,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TextView({ navigation }) {
    const insets = useSafeAreaInsets()
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState([])
    const { height, width } = useWindowDimensions()
    const [isDark, setIsDark] = useState(false)
    const colorScheme = useColorScheme()
    const start = async () => {
        // check dark mode
        if (colorScheme === 'dark') {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
        const questionData = await AsyncStorage.getItem('@question')
        const storedVersion = await AsyncStorage.getItem('@version')
        const storedYear = await AsyncStorage.getItem('@year')
        const selectedChapter = await AsyncStorage.getItem('@selected')
        const textDataResponse = await fetch(
            `https://cntextbookapi.moveto.kr/v${storedVersion}/y${storedYear}/${selectedChapter}/${questionData}`
        )
        const textData = await textDataResponse.json()
        if (textDataResponse.status === 200) {
            setText(textData)
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
        enpage: {
            width: width,
            height: height,
            backgroundColor: isDark ? '#262523' : '#FFF6EB',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
        },
        enpageAndroid: {
            width: width,
            height: height + insets.top,
            backgroundColor: isDark ? '#262523' : '#FFF6EB',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
        },
        krpage: {
            width: width,
            height: height,
            backgroundColor: isDark ? '#161513' : '#FFEBD4',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
        },
        krpageAndroid: {
            width: width,
            height: height + insets.top,
            backgroundColor: isDark ? '#161513' : '#FFEBD4',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
        },
        encenter: {
            backgroundColor: isDark ? 'black' : 'white',
            margin: 12,
            padding: 18,
            borderRadius: 20,
        },
        krcenter: {
            backgroundColor: isDark ? 'black' : 'white',
            margin: 12,
            padding: 18,
            borderRadius: 20,
        },
        entext: {
            color: isDark ? 'white' : 'black',
            fontSize: 24,
            letterSpacing: 1,
            fontWeight: '500',
            marginBottom: 2,
        },
        krtext: {
            color: isDark ? 'white' : 'black',
            fontSize: 24,
            letterSpacing: 1,
            fontWeight: '500',
            marginBottom: 2,
        },
        question: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 14,
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
        <View>
            <ScrollView pagingEnabled={true}>
                {text.map((data, key) => {
                    return (
                        <ScrollView horizontal pagingEnabled={true} key={key}>
                            <View
                                style={
                                    Platform.OS === 'android' ? styles.enpageAndroid : styles.enpage
                                }>
                                <View style={styles.encenter}>
                                    <View style={styles.question}>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                color: isDark ? 'white' : 'black',
                                            }}>
                                            {data.title}
                                        </Text>
                                    </View>
                                    <Text style={styles.entext}>{data.en}</Text>
                                </View>
                            </View>
                            <View
                                style={
                                    Platform.OS === 'android' ? styles.krpageAndroid : styles.krpage
                                }>
                                <View style={styles.krcenter}>
                                    <View style={styles.question}>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: '500',
                                                color: isDark ? 'white' : 'black',
                                            }}>
                                            {data.title}
                                        </Text>
                                    </View>
                                    <Text style={styles.krtext}>{data.ko}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    )
                })}
                <View style={styles.enpage}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FF9518',
                            padding: 15,
                            borderRadius: 15,
                            paddingHorizontal: 30,
                        }}
                        onPress={() => navigation.goBack()}>
                        <Text style={{ color: 'white', fontSize: 25 }}>이전으로</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
