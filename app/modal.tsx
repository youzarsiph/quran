import { AnimatedFlashList } from '@shopify/flash-list'
import * as Clipboard from 'expo-clipboard'
// import { useKeepAwake } from "expo-keep-awake";
import { Stack, router, useGlobalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import { Text, Surface, Chip, IconButton, Tooltip } from 'react-native-paper'

import { CHAPTERS } from '@/assets/json/chapters'
import { VERSES } from '@/assets/json/verses'
import { LoadingIndicator, NotFound, SearchBar, Verse } from '@/components'
import { Chapter, Verse as TVerse } from '@/types'

const Modal = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()
  const [query, setQuery] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [showHeader, setShowHeader] = React.useState<boolean>(true)
  const [data, setData] = React.useState<{
    chapter: Chapter
    verses: TVerse[]
  }>({
    chapter: CHAPTERS[parseInt(id, 10) - 1],
    verses: VERSES.filter((verse) => verse.chapter_id.toString() === id),
  })

  // Keep the screen on
  // useKeepAwake();

  const verses =
    query === ''
      ? data.verses
      : data.verses.filter((verse) =>
          verse.text
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  // React.useEffect(() => {
  //   setLoading(true);
  //   setData({
  //     chapter: CHAPTERS[parseInt(id) - 1],
  //     verses: VERSES.filter((verse) => verse.chapter_id.toString() === id),
  //   });
  //   setLoading(false);
  // }, [query]);

  return (
    <Surface style={{ flex: 1, paddingTop: !showHeader ? 32 : undefined }}>
      <Stack.Screen
        options={{
          headerShown: showHeader,
          title: data.chapter.transliteration,
        }}
      />
      <SearchBar
        value={query}
        placeholder="Search verses..."
        onChangeText={(v) => setQuery(v)}
      />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <AnimatedFlashList
          data={verses}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <NotFound />}
          ListHeaderComponent={() => (
            <Surface elevation={0} style={{ gap: 16, marginVertical: 16 }}>
              <Surface elevation={0} style={{ gap: 16, alignItems: 'center' }}>
                <Text
                  variant="displaySmall"
                  style={{
                    lineHeight: 60,
                    textAlign: 'center',
                    fontFamily: 'AmiriQuran_400Regular',
                  }}
                >
                  سورة {data.chapter.name}
                </Text>

                <Surface
                  style={{
                    gap: 16,
                    padding: 8,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Chip>
                    # {data.chapter.id} : {data.chapter.type}
                  </Chip>

                  <Text variant="bodyLarge">{data.chapter.translation}</Text>

                  <Chip>{data.chapter.verseCount} verses</Chip>
                </Surface>
              </Surface>

              <Text
                variant="headlineLarge"
                style={{
                  lineHeight: 80,
                  textAlign: 'center',
                  fontFamily: 'AmiriQuran_400Regular',
                }}
              >
                بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
              </Text>
            </Surface>
          )}
          ListFooterComponent={() => (
            <Surface
              elevation={0}
              style={{
                gap: 16,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <Tooltip title="Previous Chapter">
                <IconButton
                  size={32}
                  icon="chevron-left"
                  mode="contained-tonal"
                  disabled={data.chapter.id === 1}
                  onPress={() => {
                    router.replace('/modal')
                    router.setParams({
                      id: (data.chapter.id - 1).toString(),
                    })
                  }}
                />
              </Tooltip>

              <Tooltip title="Next Chapter">
                <IconButton
                  size={32}
                  mode="contained-tonal"
                  icon="chevron-right"
                  onPress={() => {
                    router.replace('/modal')
                    router.setParams({
                      id: ((data.chapter.id + 1) % 114).toString(),
                    })
                  }}
                />
              </Tooltip>
            </Surface>
          )}
          renderItem={({ item }: { item: TVerse }) => (
            <Verse {...item} copy={() => Clipboard.setStringAsync(item.text)} />
          )}
        />
      )}

      {!showHeader && (
        <Tooltip title="Navigate back">
          <IconButton
            size={32}
            icon="arrow-left"
            onPress={() => router.back()}
            style={{ position: 'absolute', bottom: 8, left: 8 }}
          />
        </Tooltip>
      )}

      <Tooltip title={showHeader ? 'Toggle fullscreen' : 'Exit fullscreen'}>
        <IconButton
          size={32}
          onPress={() => setShowHeader(!showHeader)}
          icon={showHeader ? 'fullscreen' : 'fullscreen-exit'}
          style={{ position: 'absolute', bottom: 8, right: 8 }}
        />
      </Tooltip>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Surface>
  )
}

export default Modal
