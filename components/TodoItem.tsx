import { View, Text, Appearance, Pressable } from 'react-native'
import React from 'react'
import createGetStylesFactory from '@/factories/createStylesheet'
import COLORS, { ColorsTheme } from '@/constants/Colors'
import { TodoDataObject } from '@/data/todos'
import Ionicons from '@expo/vector-icons/Ionicons'

const TodoItem = ({item, index, toggleTodo, removeTodo} : {item: TodoDataObject, index: number, toggleTodo: (id: number) => void, removeTodo: (id: number) => void}) => {
  const colorScheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  const viewStyles = getViewStyles(colorScheme);
  const textStyles = getTextStyles(colorScheme);
  return (
    <View style={viewStyles.container}>
        <Pressable style={viewStyles.actionButton} onPress={()=>toggleTodo(item.id)}>
          <Ionicons style={viewStyles.actionButtonIcon} name={item.completed ? 'checkmark-circle-outline' : 'ellipse-outline'} size={32} color={COLORS[colorScheme].primary}/>
        </Pressable>
        <Text style={[textStyles.text, item.completed ? {textDecorationLine: 'line-through', color: 'gray'} : {}]}>{item.title}</Text>
        <Pressable style={viewStyles.actionButton} onPress={()=>removeTodo(item.id)}>
          <Ionicons name={'trash'} size={32} color={COLORS[colorScheme].error} selectable={undefined}/>
        </Pressable>
    </View>
  )
}

export default TodoItem

const getViewStyles = createGetStylesFactory((themeStyles: ColorsTheme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: themeStyles.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8
  }, 
  actionButtonIcon: {
    backgroundColor: themeStyles.secondary,
    borderRadius: '100%'
  }
}))

const getTextStyles = createGetStylesFactory((themeStyles: ColorsTheme) => ({
  actionButton: {
    color: themeStyles.text
  },
  text: {
    color: themeStyles.text,
    fontSize: 14
  }
}))