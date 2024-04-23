import { AnimatedFlashList } from '@shopify/flash-list'
import React from 'react'
import { Chip, Divider, Surface } from 'react-native-paper'

import LoadingIndicator from './LoadingIndicator'
import Verse from './Verse'

import { VERSES } from '@/assets/json/verses'
import { Verse as TVerse } from '@/types'

const Page = (props: { id: number; copy: (text: string) => void }) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<TVerse[]>(
    VERSES.filter((verse) => verse.page_id === props.id),
  )

  return (
    <Surface elevation={0} style={{ flex: 1 }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <AnimatedFlashList
          data={data}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: TVerse }) => (
            <Verse {...item} copy={() => props.copy(item.text)} />
          )}
        />
      )}

      <Chip>{props.id}</Chip>
      <Divider />
    </Surface>
  )
}

export default Page
