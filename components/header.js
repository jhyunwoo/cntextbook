import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Header({ test, isDark }) {
    const insets = useSafeAreaInsets()

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: insets.top,
        },
        text: {
            fontWeight: '800',
            fontSize: 26,
            marginHorizontal: 20,
            color: isDark ? 'white' : 'black',
        },
        test: {
            fontWeight: '600',
            fontSize: 15,
            marginHorizontal: 4,
            color: 'white',
        },
        testBox: {
            backgroundColor: '#FF9518',
            padding: 6,
            borderRadius: 20,
            marginHorizontal: 4,
        },
    })

    return (
        <View style={styles.background}>
            <Text style={styles.text}>CN교과서</Text>
            <View style={styles.testBox}>
                <Text style={styles.test}>{test}</Text>
            </View>
        </View>
    )
}
