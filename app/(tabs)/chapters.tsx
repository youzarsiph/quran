import { AnimatedFlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
// import * as SQLite from "expo-sqlite/next";
import React from 'react'
import { Surface, List, Chip, Text } from 'react-native-paper'

import { CHAPTERS } from '@/assets/json/chapters'
import { LoadingIndicator, NotFound, SearchBar } from '@/components'
import { Chapter } from '@/types'

// Open the database
// const db = SQLite.openDatabaseSync("quran.db");

const Chapters = () => {
  const [query, setQuery] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [chapters, setChapters] = React.useState<Chapter[]>(CHAPTERS)

  // Load data
  // React.useEffect(() => {
  //   (async () => {
  //     await db
  //       .execAsync(
  //         "SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT LIKE 'sqlite_%';"
  //       )
  //       .then((res) => console.log(res));
  //   })();
  // }, []);

  React.useEffect(() => {
    setLoading(true)
    setChapters(
      CHAPTERS.filter(
        (c) =>
          c.translation.toLowerCase().includes(query) ||
          c.transliteration.toLowerCase().includes(query),
      ),
    )
    setLoading(false)
  }, [query])

  return (
    <Surface style={{ flex: 1 }}>
      <SearchBar
        value={query}
        placeholder="Search chapters..."
        onChangeText={(v) => setQuery(v)}
      />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <List.Section style={{ flex: 1 }}>
          <AnimatedFlashList
            data={chapters}
            estimatedItemSize={65}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <NotFound />}
            renderItem={({ item }: { item: Chapter }) => (
              <List.Item
                key={item.id}
                title={item.translation}
                description={`${item.transliteration} ${item.verseCount} verses, ${item.type}`}
                left={(props) => <Chip {...props}>{item.id}</Chip>}
                right={(props) => (
                  <Text
                    {...props}
                    variant="bodyLarge"
                    style={{ fontFamily: 'AmiriQuran_400Regular' }}
                  >
                    {item.name}
                  </Text>
                )}
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

export default Chapters
