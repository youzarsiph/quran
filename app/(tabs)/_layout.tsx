import React from "react";
import { Tabs } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Appbar, BottomNavigation } from "react-native-paper";

const TabLayout = () => (
  <Tabs
    screenOptions={{
      tabBarHideOnKeyboard: true,
      header: (props) => {
        const title = getHeaderTitle(props.options, props.route.name);

        return (
          <Appbar.Header>
            <Appbar.Content title={title} />
          </Appbar.Header>
        );
      },
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ focused, color, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.title;

          return label;
        }}
      />
    )}
  >
    <Tabs.Screen
      name="search"
      options={{
        title: "Search",
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? "text-box-search" : "text-box-search-outline"}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="chapters"
      options={{
        title: "Chapters",
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? "card-multiple" : "card-multiple-outline"}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? "home-variant" : "home-variant-outline"}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="parts"
      options={{
        title: "Parts",
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={
              props.focused ? "bookmark-multiple" : "bookmark-multiple-outline"
            }
          />
        ),
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            {...props}
            size={24}
            name={props.focused ? "cog" : "cog-outline"}
          />
        ),
      }}
    />
  </Tabs>
);

export default TabLayout;
