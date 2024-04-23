import React from 'react'
import { Searchbar, SearchbarProps, Surface } from 'react-native-paper'

const SearchBar = (props: SearchbarProps) => (
  <Surface elevation={0} style={{ padding: 8 }}>
    <Searchbar {...props} />
  </Surface>
)

export default SearchBar
