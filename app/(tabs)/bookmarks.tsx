import { AnimatedFlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import React from 'react'
import { Surface, List, Chip, Text, IconButton } from 'react-native-paper'

import { LoadingIndicator, NotFound } from '@/components'

const Bookmarks = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [bookmarks, setBookmarks] = React.useState([
    { id: 1, start: 'Hello, Verse 1' },
    { id: 2, start: 'Hello, Verse 2' },
  ])

  React.useEffect(() => {
    setLoading(true)
    setBookmarks([
      { id: 1, start: 'Hello, Verse 1' },
      { id: 2, start: 'Hello, Verse 2' },
    ])
    setLoading(false)
  }, [])

  return (
    <Surface style={{ flex: 1 }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <List.Section style={{ flex: 1 }}>
          <AnimatedFlashList
            data={bookmarks}
            estimatedItemSize={65}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <NotFound />}
            renderItem={({ item }) => (
              <List.Item
                key={item.id}
                title={item.start}
                description={`${item.start}`}
                left={(props) => <Chip {...props}>{item.id}</Chip>}
                right={(props) => <IconButton {...props} icon="close" />}
                onPress={() => {
                  router.push('/modal')
                  router.setParams({ id: item.id.toString() })
                }}
              />
            )}
          />
        </List.Section>
      )}
    </Surface>
  )
}

export default Bookmarks
