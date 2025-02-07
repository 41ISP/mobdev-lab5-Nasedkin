import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureResponderEvent, SafeAreaView, SafeAreaViewBase, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FlatList } from 'react-native';
import { customAlphabet } from 'nanoid/non-secure';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)
  const initialTasks = [
    {
      task: "123",
      id: nanoid(),
      state: false
    }
  ]
  const [tasks, setTasks] = useState([...initialTasks])
  const colorScheme = useColorScheme();

  const [task, setTask] = useState('')
  const toggleSwitch = (id: string) => {
    setTasks((old) => old.map((tsk) => tsk.id === id? {...tsk, state: !tsk.state}: tsk))
  }

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


  const handleSubmit = () => {
    if(task.trim().length > 0 && task.trim().length < 20)
    {
      setTasks([
        ...tasks,
        {id: nanoid(), task: task.trim(), state: false}
      ])
    }
    else alert("Пустая строка, или слишком много символов (допустимо не больше 20)")
  }

  const handlePress = () => {
    if(task.trim().length > 0 && task.trim().length <= 20)
    {
      setTasks([
        ...tasks,
        {id: nanoid(), task: task.trim(), state: false}
      ])
    }
    else alert("Пустая строка, или слишком много символов (допустимо не больше 20)")
  }
  const handleDelete = (id:string) => {
    setTasks(tasks.filter(a => a.id !== id))
  }

  const [filteredTasks, setFilteredTasks] = useState([...tasks])

  const filteredList = () => {
    const temp = setFilteredTasks(
      (tasks.filter(task => {return task.state === false})
    )
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <View style={styles.container}>
            <TextInput placeholder='👉 Попечатай 👈'
                       value={task} 
                       onChangeText={setTask}
                       onSubmitEditing={handleSubmit}
                       style = {styles.input}
                       returnKeyType='done'>
            </TextInput>
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.btn}>
              👉 Потрогай 👈
              </Text>
            </TouchableOpacity>
            <FlatList  data={tasks} keyExtractor={(item) => item.id} renderItem={(
              {item},
            ) => (
              <View style={styles.cntr}> 
                <TouchableOpacity onPress={()=>handleDelete(item.id)}>
                  <Text style={styles.list}>
                  👉Х👈
                  </Text>
                </TouchableOpacity >
                <Text style={styles.list}>{item.task}</Text>
                <Switch value={item.state}
                        onValueChange={()=>toggleSwitch(item.id)}
                        thumbColor={item.state ? "yellow" : "red"} 
                        trackColor={{ false: '#767577', true: '#81b0ff' }}/>
              </View>
            )}/>
          </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: 200,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "goldenrod",
    backgroundColor: "darkblue",
    borderRadius: 50,
    minHeight: 300,
    maxWidth: 350,
    minWidth: 350
  },
  btn:{
    color: "goldenrod",
    backgroundColor: "darkred",
    fontSize: 30,
    margin: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "goldenrod",
    padding: 20.
  },
  input:{
    color: "goldenrod",
    fontSize: 32,
    padding: 10,
    textAlign: 'center',
    margin: 20,
    maxWidth: 300,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "goldenrod",
    backgroundColor: "darkred"
  },
  list:{
    color: "goldenrod",
    backgroundColor: "darkred",
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    flexGrow: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "goldenrod",
    maxWidth: 150,
    width: "100%"
  },
  cntr:{
    flexDirection: "row",
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  }
});
