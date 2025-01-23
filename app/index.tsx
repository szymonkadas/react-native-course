import {  Platform, ScrollView, TextInput, Pressable, Text, View, ActivityIndicator, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS, { ColorsTheme } from "@/constants/Colors";
import createGetStylesFactory from "@/factories/createStylesheet";
import {data, TodoDataObject} from "@/data/todos"
import TodoItem from "@/components/TodoItem";
import { useState, useContext, useEffect, useRef } from "react";
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import { ThemeContext } from "@/context/ThemeContext";
import Animated, {LinearTransition} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");
  const [loaded, error] = useFonts({Inter_500Medium});
  const {theme, colorScheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try{
        const todos = await AsyncStorage.getItem('todoApp');
        if(todos && todos !== null) setTodos(JSON.parse(todos).sort((a: TodoDataObject,b: TodoDataObject)=>b.id - a.id));
        else setTodos(data.sort((a: TodoDataObject,b: TodoDataObject)=>b.id - a.id));
      }catch(e){
        console.error(e);
      }
      setLoading(false);
    }

    fetchTodos();
  }, [data])

  if(!loaded && !error) return null;

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      const newTodos = [{ id: newId, title: text, completed: false }, ...todos];
      setLoading(true);
      AsyncStorage.setItem('todoApp', JSON.stringify(newTodos)).then(() => {
        setTodos(newTodos);
        setText("");
      }).finally(() => {
        setLoading(false);
      });
    }
  };
  const removeTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setLoading(true);
    AsyncStorage.setItem('todoApp', JSON.stringify(newTodos)).then(()=>{
      setTodos(newTodos);
    }).finally(() => {
      setLoading(false);
    });
  };
  const toggleTodo = (id: number) => {
    setLoading(true);
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    AsyncStorage.setItem('todoApp', JSON.stringify(updatedTodos)).then(() => {
      setTodos(updatedTodos);
    }).finally(() => {
      setLoading(false);
    });
  }

  const viewStyles = getStyles(colorScheme);
  const textStyles = getTextStyles(colorScheme);
  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;
  const renderTodoItem = ({item, index}:{ item: TodoDataObject , index: number}) => {
    return <TodoItem item={item} index={index} toggleTodo={toggleTodo} removeTodo={removeTodo} />;
  };
  
  return (
    <Container
      contentContainerStyle={Platform.OS === 'web' ? {...viewStyles.container, paddingVertical: 16} : {}} style={Platform.OS === 'web' ? {} : viewStyles.container}
    >
      <View style={viewStyles.inputContainer}>
        <TextInput 
          style={[viewStyles.input, textStyles.input]} 
          onChangeText={setText} 
          value={text}
          placeholder="Add todo task"
          placeholderTextColor={COLORS[colorScheme].placeholder}
        />
        <Pressable onPress={addTodo} style={viewStyles.button}>
          {loading ? <ActivityIndicator color={theme.primary}/>: <Text style={textStyles.button}>Add</Text>}
        </Pressable>
        <ColorSchemeToggle />
      </View>
      <Animated.FlatList 
        contentContainerStyle={viewStyles.container}
        data={todos} 
        renderItem={(item)=>renderTodoItem(item)}
        keyExtractor={(item) => item.id.toString()}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode={"on-drag"}
      />
      <StatusBar barStyle={colorScheme === 'dark' ? 'dark-content' : 'light-content'} />
    </Container>
  );
}

const getStyles = createGetStylesFactory((themeStyles: ColorsTheme) =>({
    container: {
      justifyContent: "flex-start",
      gap: 16,
      backgroundColor: themeStyles.background,
      paddingHorizontal: 8,
      height: '100%'
    },
    inputContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingHorizontal: 8,
      // maxWidth: '100%'
    },
    input:{
      flexGrow: 1,
      padding: 8,
      fontSize: 18,
      backgroundColor: themeStyles.primary,
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: themeStyles.placeholder,
      // maxWidth: '100%',
      minWidth: 0
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
    fontSize: 18,
    color: themeStyles.buttonContent,
    fontWeight: 'bold'
  },
  input:{
    color: themeStyles.text,
    fontFamily: 'Inter_500Medium'
  }
}));