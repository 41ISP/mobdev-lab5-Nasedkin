import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView, SafeAreaViewBase, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [counter, setCounter] = useState(0)

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handlePress = () => {
    setCounter((val) => val += 1)
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.btn}>dddddddddd</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              {counter}
            </Text>
          </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: 100,
    flexDirection: "row"
  },
  btn:{
    color: "#000000",
    backgroundColor: "#00ff00",
    // fontSize: 400,
    padding: 50.
  },
  text:{
    color: "darkblue",
    fontSize: 64
  }
});
