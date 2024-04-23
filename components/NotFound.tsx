import React from 'react'
import { Icon, Surface, Text } from 'react-native-paper'

const NotFound = () => (
  <Surface
    elevation={0}
    style={{
      gap: 32,
      flex: 1,
      paddingVertical: 64,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon source="close-circle" size={64} />
    <Text variant="titleLarge">Nothing found</Text>
  </Surface>
)

export default NotFound
