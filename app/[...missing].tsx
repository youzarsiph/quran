import { Stack, router } from 'expo-router'
import { Button, Surface, Text } from 'react-native-paper'

const NotFoundScreen = () => (
  <Surface style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Stack.Screen options={{ title: 'Oops!' }} />

    <Text variant="bodyLarge">This screen doesn't exist.</Text>

    <Button mode="contained" onPress={() => router.push('/')}>
      Go to home screen!
    </Button>
  </Surface>
)

export default NotFoundScreen
