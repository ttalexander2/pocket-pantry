import React, { useState } from "react";
import {
  AccessibilityRole,
  ImageProps,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Text as RNText,
  ImageBackground,
} from "react-native";
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
}
from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light, dark } from "@eva-design/eva";
import Login from './src/Login.js';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import AppNavigator from './src/Navigation';
import Store from './src/store';
import { Provider } from 'react-redux';

const themes = {
  light: {
    theme: light,
    icon: "sun",
    text: "LIGHT",
  },
  dark: {
    theme: dark,
    icon: "moon",
    text: "DARK",
  },
};

type IconProps = {
  name: string;
  style?: ImageStyle;
};

type CustomButtonWithIconProps = {
  accessibilityRole: AccessibilityRole;
  accessibilityLabel: string;
  icon: string;
  iconStyle?: ImageStyle;
  onPress: () => void;
  text: string;
  style: any;
};

const renderIcon = ({ name, style }: IconProps) => (
  <Icon {...style} name={name} />
);

const CustomButtonWithIcon = ({
  accessibilityRole,
  accessibilityLabel,
  icon,
  iconStyle,
  onPress,
  text,
  style,
}: CustomButtonWithIconProps) => {
  const ButtonIcon = () => renderIcon({ name: icon, style: iconStyle });
  return (
    <Button
      style={style}
      icon={ButtonIcon}
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
    >
      {text}
    </Button>
  );
};

const App = (): React.ReactFragment => {

  const [themeName, setThemeName] = useState("light");
  const theme = themes[themeName].theme;

  const [logIn, setLogIn] = useState(false);

  const changeTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  const { text: themeButtonText, icon: themeButtonIcon } =
    themeName === "light" ? themes.dark : themes.light;

  return (
    <Provider store={Store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        {
          !logIn
          ?
          <ImageBackground source={require("./Assets/are you feeling it now mr krabs.png")} style={styles.image}>
              <Login onLogIn={() => {setLogIn(true)}} />
          </ImageBackground>
        :
        <AppNavigator/>
        }

      </ApplicationProvider>
    </ Provider>
  );
};

/**
  Change Theme Button:

  <CustomButtonWithIcon
    accessibilityRole="button"
    accessibilityLabel="UI Kitten Change Theme"
    style={styles.iconButton}
    text={`SWITCH TO ${themeButtonText} THEME`}
    icon={themeButtonIcon}
    onPress={changeTheme}
    iconStyle={{ tintColor: "white" }}
  />

 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  iconButton: {
    marginVertical: 16,
  },
  nativeButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;