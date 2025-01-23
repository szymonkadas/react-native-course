import { useLocalSearchParams } from "expo-router";
import {Text, View } from "react-native";
import {useState, useEffect, useContext} from "react"
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
import {TodoDataObject} from "@/data/todos"
import { GestureHandlerRootView, Pressable, TextInput } from "react-native-gesture-handler";
import createGetStylesFactory from "@/factories/createStylesheet";
import { ColorsTheme } from "@/constants/Colors";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";

export default function EditScreen(){
    const { id } = useLocalSearchParams();
    const [todo, setTodo] = useState<TodoDataObject>({
        id: Array.isArray(id) ? parseInt(id[0]) : parseInt(id),
        title: '',
        completed: false
    });
    
    const router = useRouter();
    const [loaded, error] = useFonts({Inter_500Medium});
    const {colorScheme, theme } = useContext(ThemeContext);
    const viewStyles = getViewStyles(colorScheme);
    const textStyles = getTextStyles(colorScheme);

    /**
     * Updates the todos in the AsyncStorage.
     * @param {TodoDataObject[]} [todos] The todos to add.
     * @param {(todo: TodoDataObject) => boolean} [predicate] The predicate to filter the todos.
     * @return {Promise<void>} A promise that resolves when the operation is complete.
     */
    const updateTodosInStorage = async (todos: TodoDataObject[] = [], predicate?: (todo: TodoDataObject) => boolean) => {
        const storageTodos = await AsyncStorage.getItem('todoApp');
        const updatedTodos = storageTodos && storageTodos !== null
          ? [...(predicate ? 
                JSON.parse(storageTodos).filter(predicate) : 
                JSON.parse(storageTodos))
                , ...todos
            ]
          : todos || [];
        await AsyncStorage.setItem('todoApp', JSON.stringify(updatedTodos));
    };
      
    const handleSave = async () => {
      try {
        await updateTodosInStorage([todo], (todo: TodoDataObject) => todo.id.toString() !== id);
        handleCancel();
      } catch (e) {
        console.error(e);
      }
    };
    const handleDelete = async () => {
      try {
        await updateTodosInStorage(undefined, (todo: TodoDataObject) => todo.id.toString() !== id);
        handleCancel();
      } catch (e) {
        console.error(e);
      }
    };
    const handleCancel = () => {
      router.push('/');
    }

    useEffect(() => {   
        const fetchData = async () => {
            try{
                const todos = await AsyncStorage.getItem('todoApp');
                if(todos && todos !== null) setTodo(
                    JSON.parse(todos).find((todo: TodoDataObject) => todo.id.toString() === id)
                );
            }catch(e){
                console.error(e);
            }
        }
        fetchData()
    }, [id]);

    if(!loaded && !error) return null;

    return (
        <GestureHandlerRootView>
        <SafeAreaView style={viewStyles.container}>
            <View style={viewStyles.header}>
                <Pressable 
                    onPress={handleCancel}
                    style={[viewStyles.cancelButton]}
                >
                    <Octicons name="x" size={36} selectable={undefined} color={colorScheme === 'dark' ? theme.text : theme.primary} style={{width: 36}}/>
                    <Text style={[textStyles.text, textStyles.button]}>Cancel</Text>
                </Pressable>
                <ColorSchemeToggle />
            </View>
            <View style={viewStyles.inputContainer}>
                <TextInput 
                    style={[viewStyles.input, textStyles.text]}
                    placeholder="Edit todo"
                    placeholderTextColor={theme.placeholder}
                    value={todo.title ?? ''}
                    onChangeText={(text)=>setTodo(prev => ({...prev, title: text}))}
                    multiline
                />
            </View>
            <View style={viewStyles.actionContainer}>
                <Pressable 
                    onPress={handleSave}
                    style={[viewStyles.actionButton, viewStyles.saveButton]}
                >
                    <Text style={textStyles.button}>Save</Text>
                </Pressable>
                <Pressable 
                    onPress={handleDelete}
                    style={[viewStyles.actionButton, viewStyles.deleteButton]}
                >
                    <Text style={textStyles.button}>Delete</Text>
                </Pressable>

            </View>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const getViewStyles = createGetStylesFactory((themeStyles: ColorsTheme) => ({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: themeStyles.background,
        gap: 8,
        height: '100%'
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8
    },
    cancelButton: {
        flexDirection: 'row',
        itemsAlign: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: 8
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 8
    },
    input: {
        flexGrow: 1,
        padding: 8,
        fontSize: 18,
        backgroundColor: themeStyles.primary,
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: themeStyles.placeholder,
        height: 96,
        marginVertical: 16,
        contentAlign: 'flex-start'
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
        paddingHorizontal: 8  
    },
    actionButton: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 8,
        minWidth: 100,

    },
    actionButtonIcon: {
        backgroundColor: themeStyles.secondary,
        borderRadius: 100
    },
    saveButton: {
        backgroundColor: themeStyles.secondary,
    },
    deleteButton: {
        backgroundColor: themeStyles.error
    },
}))

const getTextStyles = createGetStylesFactory((themeStyles: ColorsTheme, colorScheme?: 'dark' | 'light') => ({
    text: {
        color: themeStyles.text
    },
    button: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        // not everything's has to be put into colors scheme, but this should be, though i'm leaving it as an example of customization
        color: colorScheme === 'dark' ? themeStyles.text : themeStyles.primary
    }
}))