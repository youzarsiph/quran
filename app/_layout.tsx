import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AmiriQuran_400Regular } from '@expo-google-fonts/amiri-quran'
import { useFonts, NotoSans_400Regular } from '@expo-google-fonts/noto-sans'
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Platform, useColorScheme } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { StackHeader } from '@/components'
import { Themes } from '@/styles'
import { Setting } from '@/types'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    AmiriQuran_400Regular,
    Uthmanic: require('@/assets/fonts/Uthmanic.ttf'),
    ...MaterialCommunityIcons.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error
  }, [error])

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme()
  const [settings, setSettings] = React.useState<Setting>({
    theme: 'auto',
    color: 'default',
  })

  // Load settings from the device
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      SecureStore.getItemAsync('settings').then((result) => {
        if (result === null) {
          SecureStore.setItemAsync('settings', JSON.stringify(settings)).then(
            (res) => console.log(res),
          )
        }

        setSettings(JSON.parse(result ?? JSON.stringify(settings)))
      })
    } else {
      setSettings({ ...settings, theme: colorScheme ?? 'light' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PaperProvider
      theme={
        Themes[
          settings.theme === 'auto' ? colorScheme ?? 'dark' : settings.theme
        ][settings.color]
      }
    >
      <Stack
        screenOptions={{
          animation: 'ios',
          header: (props) => (
            <StackHeader navProps={props} children={undefined} />
          ),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ title: 'Modal', presentation: 'modal' }}
        />
      </Stack>
    </PaperProvider>
  )
}

export default RootLayout
