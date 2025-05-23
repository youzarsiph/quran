import { SQLiteDatabase } from 'expo-sqlite'
import React from 'react'
import { View } from 'react-native'
import {
  Button,
  Card,
  Chip,
  Divider,
  MD3Theme,
  Surface,
  Text,
  Tooltip,
} from 'react-native-paper'

import {
  Slug,
  TChapter,
  TFontFamily,
  TFontSize,
  TPage,
  TVerse,
} from '@/lib/types'
import { toMarker } from '@/lib/utils'

import { Locales } from '../locales'

// Page container
const Container = (p: {
  data: TPage
  onButtonPress: (path: Slug, id: number) => void
  children: React.ReactNode | React.ReactNode[]
}) => (
  <Surface elevation={0} style={{ gap: 16 }}>
    <View
      style={{
        paddingTop: 8,
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
      }}
    >
      <Tooltip title={Locales.t('read')}>
        <Button onPress={() => p.onButtonPress('chapters', p.data.chapter_id)}>
          {Locales.t('chapter')} {p.data.chapter_id}
        </Button>
      </Tooltip>

      <Tooltip title={Locales.t('read')}>
        <Button onPress={() => p.onButtonPress('parts', p.data.part_id)}>
          {Locales.t('part')} {p.data.part_id}
        </Button>
      </Tooltip>
    </View>

    <View style={{ gap: 8 }}>
      {p.children}

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
        }}
      >
        <Tooltip title={Locales.t('read')}>
          <Button onPress={() => p.onButtonPress('groups', p.data.group_id)}>
            {Locales.t('group')} {p.data.group_id}
          </Button>
        </Tooltip>

        <Tooltip title={Locales.t('pNum')}>
          <Chip onPress={() => p.onButtonPress('pages', p.data.id)}>
            {p.data.id}
          </Chip>
        </Tooltip>

        <Tooltip title={Locales.t('read')}>
          <Button
            onPress={() => p.onButtonPress('quarters', p.data.quarter_id)}
          >
            {Locales.t('quarter')} {p.data.quarter_id}
          </Button>
        </Tooltip>
      </View>

      <Divider bold />
    </View>
  </Surface>
)

// Page content
const Content = (props: {
  color: string
  font: TFontFamily
  size: TFontSize
  verses: TVerse[]
  onPress: (v: TVerse) => void
}) => (
  <Text style={{ direction: 'rtl', paddingHorizontal: 16 }}>
    {props.verses.map((v) => (
      <Text
        key={v.id}
        variant={props.size.value}
        onLongPress={() => props.onPress(v)}
        style={{
          textAlign: 'center',
          fontFamily: props.font,
          lineHeight: props.size.lineHeight,
        }}
      >
        {v.number !== 1 ? (
          v.content + ' '
        ) : (
          <>
            <Text
              style={{
                textAlign: 'center',
                color: props.color,
                fontFamily: props.font,
              }}
            >
              {v.content.slice(0, 39) + '\n'}
            </Text>
            {v.content.slice(39) + ' '}
          </>
        )}

        <Text
          style={{
            color: props.color,
            fontFamily: props.font,
          }}
        >
          {toMarker(v.number.toString()) + ' '}
        </Text>
      </Text>
    ))}
  </Text>
)

const Header = (props: {
  chapter: TChapter
  font: TFontFamily
  onButtonPress: (path: Slug, id: number) => void
}) => (
  <Card
    style={{ marginHorizontal: 16 }}
    onPress={() => props.onButtonPress('chapters', props.chapter.id)}
  >
    <Card.Content
      style={{
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Tooltip title={Locales.t('chapter')}>
        <Chip mode="outlined">{props.chapter.id}</Chip>
      </Tooltip>

      <Text
        variant="bodyLarge"
        style={{
          textAlign: 'center',
          lineHeight: 32,
          fontFamily: props.font,
        }}
      >{`سُورَةُ ${props.chapter.name}`}</Text>

      <Tooltip title={Locales.t('vCount')}>
        <Chip mode="outlined">{props.chapter.verse_count}</Chip>
      </Tooltip>
    </Card.Content>
  </Card>
)

const Page = (props: {
  db: SQLiteDatabase
  data: TPage
  theme: MD3Theme
  verses: TVerse[]
  font: { family: TFontFamily; size: TFontSize }
  onVersePress: (v: TVerse) => void
  onButtonPress: (path: Slug, id: number) => void
}) => {
  const firstVerse = props.verses[0].chapter_id

  // Check if the page contains only verses of one chapter
  if (props.verses.every((v) => v.chapter_id === firstVerse)) {
    let chapter = undefined

    // Check if the 1st verses of a chapter in this page
    if (props.verses.filter((v) => v.number === 1).length === 1) {
      chapter = props.db.getFirstSync<TChapter>(
        'SELECT * FROM "chapters" WHERE "id" = ?',
        firstVerse,
      )!
    }

    return (
      <Container data={props.data} onButtonPress={props.onButtonPress}>
        {chapter && (
          <Header
            chapter={chapter}
            font={props.font.family}
            onButtonPress={props.onButtonPress}
          />
        )}

        <Text style={{ direction: 'rtl', paddingHorizontal: 16 }}>
          <Content
            verses={props.verses}
            size={props.font.size}
            font={props.font.family}
            color={props.theme.colors.primary}
            onPress={(v: TVerse) => props.onVersePress(v)}
          />
        </Text>
      </Container>
    )
  }

  // Extract chapters from page verses
  const chapters: (TChapter & { verses: TVerse[] })[] = []
  for (const v of props.verses) {
    if (!chapters.map((i) => i.id).includes(v.chapter_id)) {
      const chapter = props.db.getFirstSync<TChapter>(
        'SELECT * FROM "chapters" WHERE "id" = ?',
        v.chapter_id,
      )!

      chapters.push({
        ...chapter,
        verses: [v],
      })
    } else {
      chapters.find((c) => c.id === v.chapter_id)?.verses.push(v)
    }
  }

  return (
    <Container data={props.data} onButtonPress={props.onButtonPress}>
      {chapters.map((c) => (
        <View key={c.id} style={{ gap: 16 }}>
          {/* Check if the chapter verses includes 1st verse */}
          {c.verses.find((v) => v.number === 1) && (
            <Header
              chapter={c}
              font={props.font.family}
              onButtonPress={props.onButtonPress}
            />
          )}

          <Content
            verses={c.verses}
            size={props.font.size}
            font={props.font.family}
            color={props.theme.colors.primary}
            onPress={(v: TVerse) => props.onVersePress(v)}
          />
        </View>
      ))}
    </Container>
  )
}

export default Page
