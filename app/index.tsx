import { Appearance, Platform, ScrollView, FlatList, TextInput, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorsTheme } from "@/constants/Colors";
import createGetStylesFactory from "@/factories/createStylesheet";
import {data} from "@/data/todos"
import TodoItem from "@/components/TodoItem";
import { useState } from "react";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText("");
    }
  };
  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  const colorScheme = Appearance.getColorScheme() === "dark" ? "dark" : "light";
  const viewStyles = getStyles(colorScheme);
  const textStyles = getTextStyles(colorScheme);
  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

  return (
    <Container
      style={viewStyles.container}
    >
      <View style={viewStyles.inputContainer}>
      <TextInput 
        style={[viewStyles.input, textStyles.input]} 
        onChangeText={setText} 
        value={text}
        placeholder="Add todo task"
        placeholderTextColor={'gray'}
      />
      <Pressable onPress={addTodo} style={viewStyles.button}>
        <Text style={textStyles.button}>Add</Text>
      </Pressable>
      </View>
      <FlatList 
        contentContainerStyle={viewStyles.container}
        data={todos} 
        renderItem={(item)=>TodoItem({...item, toggleTodo, removeTodo})} 
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
}

const getStyles = createGetStylesFactory((themeStyles: ColorsTheme) =>({
    container: {
      justifyContent: "center",
      gap: 16,
      backgroundColor: themeStyles.background,
      paddingHorizontal: 8
    },
    inputContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 24
    },
    input:{
      flexGrow: 1,
      padding: 8,
      fontSize: 18,
      backgroundColor: themeStyles.primary,
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: "gray"
    },
    button: {
      width: 64,
      alignItems: 'center',
      paddingHorizontal: 6,
      paddingVertical: 8,
      backgroundColor: themeStyles.secondary,
      borderRadius: 8,
      fontSize: 24
    }
}));

const getTextStyles = createGetStylesFactory((themeStyles: ColorsTheme) => ({
  button: {
    fontSize: 18
  },
  input:{
    color: themeStyles.text
  }
}));