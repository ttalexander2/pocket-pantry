import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

const Header = (props) => (
    <View>
        <Text category='h6'>{props.title}</Text>
        <Text category='s1'>{props.subtitle}</Text>
    </View>
);

export default Header;