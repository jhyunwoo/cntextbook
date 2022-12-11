import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MainPage from './pages/MainPage'
import SelectYear from './pages/SelectYear'
import ChapterList from './pages/ChapterList'
import TextView from './pages/TextView'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <ExpoStatusBar style="auto" />
                <Stack.Navigator initialRouteName={'MainPage'}>
                    <Stack.Screen
                        name={'MainPage'}
                        component={MainPage}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={'SelectYear'}
                        component={SelectYear}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={'ChapterList'}
                        component={ChapterList}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={'TextView'}
                        component={TextView}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
