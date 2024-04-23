import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

import { TabBar, TabsHeader } from '@/components'

const TabLayout = () => (
  <Tabs
    tabBar={(props) => <TabBar {...props} />}
    screenOptions={{
      tabBarHideOnKeyboard: true,
      header: (props) => <TabsHeader navProps={props} children={undefined} />,
    }}
  >
    <Tabs.Screen
      name="search"
      options={{
        title: 'Search',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? 'text-box-search' : 'text-box-search-outline'}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="chapters"
      options={{
        title: 'Chapters',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? 'card-multiple' : 'card-multiple-outline'}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? 'home-variant' : 'home-variant-outline'}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="bookmarks"
      options={{
        title: 'Bookmarks',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={
              props.focused ? 'bookmark-multiple' : 'bookmark-multiple-outline'
            }
          />
        ),
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: 'Settings',
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? 'cog' : 'cog-outline'}
          />
        ),
      }}
    />
  </Tabs>
)

export default TabLayout
