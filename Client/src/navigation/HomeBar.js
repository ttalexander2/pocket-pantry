import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeProvider, Header } from 'react-native-elements';

const HomeBar = (props) => {
    return (
        <ThemeProvider>
        <Header leftComponent={{text: 'Pocket Pantry', style: { color: '#fff' } }} centerComponent={{ text: props.name, style: { color: '#fff' } }}/>
        </ThemeProvider>
      );
}

export default HomeBar;
