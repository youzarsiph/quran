import { AnimatedFlashList } from '@shopify/flash-list'
import React from 'react'
import { Surface, List, Chip, Text } from 'react-native-paper'

import { CHAPTERS } from '@/assets/json/chapters'
import { VERSES } from '@/assets/json/verses'
import { LoadingIndicator, NotFound, SearchBar } from '@/components'
import { Verse } from '@/types'

const Search = () => {
  const [query, setQuery] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [verses, setVerses] = React.useState<Verse[]>([])

  React.useEffect(() => {
    setLoading(true)
    setVerses(
      VERSES.filter(
        (verse) =>
          verse.text
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')) ||
          verse.transliteration
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
      ),
    )
    setLoading(false)
  }, [query])

  return (
    <Surface style={{ flex: 1 }}>
      <SearchBar
        value={query}
        placeholder="Search verses..."
        onChangeText={(v) => setQuery(v)}
      />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <List.Section
          title={query === '' ? 'Recent searches' : 'Results'}
          style={{ flex: 1 }}
        >
          {query !== '' ? (
            <AnimatedFlashList
              data={verses}
              estimatedItemSize={65}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => <NotFound />}
              renderItem={({ item }: { item: Verse }) => {
                const chapter = CHAPTERS[item.chapter_id - 1]

                return (
                  <List.Item
                    key={item.id}
                    title={item.text}
                    titleStyle={{ fontFamily: 'Uthmanic' }}
                    left={(props) => (
                      <Chip {...props}>
                        {item.chapter_id}:{item.number}
                      </Chip>
                    )}
                    description={`${chapter.transliteration}, ${chapter.translation}, ${item.chapter_id}:${item.number}`}
                    right={(props) => (
                      <Text
                        {...props}
                        style={{
                          ...props.style,
                          fontFamily: 'AmiriQuran_400Regular',
                        }}
                      >
                        {chapter.name}
                      </Text>
                    )}
                    onPress={() => {}}
                  />
                )
              }}
            />
          ) : (
            <AnimatedFlashList
              data={[{ id: 1, text: 'hello' }]}
              estimatedItemSize={65}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => <NotFound />}
              renderItem={({ item }) => (
                <List.Item
                  key={item.id}
                  title={item.text}
                  onPress={() => setQuery(item.text)}
                  left={(props) => <List.Icon {...props} icon="history" />}
                  right={(props) => <List.Icon {...props} icon="magnify" />}
                />
              )}
            />
          )}
        </List.Section>
      )}
    </Surface>
  )
}

export default Search
