import React from 'react'
import { Chip, IconButton, Surface, Text, Tooltip } from 'react-native-paper'

import { Verse as TVerse } from '@/types'

const Verse = (props: TVerse & { copy: () => void }) => (
  <Surface
    elevation={0}
    style={{
      gap: 8,
      marginBottom: 8,
      flexWrap: 'wrap',
      paddingHorizontal: 16,
    }}
  >
    <Surface
      elevation={0}
      style={{
        gap: 16,
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <Tooltip title="Copy">
        <IconButton
          mode="contained"
          icon="clipboard-text-outline"
          onPress={() => props.copy()}
        />
      </Tooltip>

      <Chip>{props.number}</Chip>
    </Surface>

    <Text
      variant="titleLarge"
      style={{
        width: '100%',
        lineHeight: 36,
        textAlign: 'center',
        fontFamily: 'Uthmanic',
        // fontFamily: "AmiriQuran_400Regular",
      }}
    >
      {props.text}
    </Text>

    <Text
      variant="bodyLarge"
      style={{
        width: '100%',
        textAlign: 'center',
      }}
    >
      {props.transliteration}
    </Text>
  </Surface>
)

export default Verse
