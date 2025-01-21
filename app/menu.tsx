import { View, Text, StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, ColorSchemeName, Image, FlatList,  StyleProp, TextStyle } from 'react-native'
import { Colors, ColorTheme } from '@/constants/Colors'
import React from 'react'
import { MENU_ITEMS } from '@/constants/MenuItems'
import MENU_IMAGES from '@/constants/MenuImages'

const MenuScreen = () => {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = createStyles(theme, colorScheme);
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;
    const separatorComponent = ()=><View style={styles.separator} />
    const headerComp = ()=><Text>Header of the list</Text>
    const footerComp = ()=><Text style={styles.text}>Footer of the list</Text>
  return (
    <Container style={styles.container}>
        <FlatList data={MENU_ITEMS} 
        keyExtractor={(item)=>item.id.toString()} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={separatorComponent}
        ListHeaderComponent={headerComp}  
        ListFooterComponent={footerComp}
        ListFooterComponentStyle={{...styles.text, ...styles.footerComponent}}
        ListEmptyComponent={<Text>No items</Text>}
        renderItem={({item})=>(
            <View style={styles.row}>
                <View style={styles.menuTextRow}>
                    <Text style={[styles.text, styles.menuItemTitle]}>{item.title}</Text>
                    <Text style={styles.text}>{item.description}</Text>
                </View>
                <Image style={styles.menuItemImage} source={MENU_IMAGES[item.id]}/>
            </View>
        )}>

        </FlatList>
    </Container>
  )
}

export default MenuScreen;

function createStyles(theme: ColorTheme, colorScheme: ColorSchemeName){
    return StyleSheet.create({
        container: {
            backgroundColor: theme.background
        },
        contentContainer: {
            paddingTop: 8,
            paddingBottom: 16,
            paddingHorizontal: 12,
        },
        separator: {
            height: 1,
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
            width: '50%',
            maxWidth: 300,
            marginHorizontal: 'auto',
            marginBottom: 8,
        },
        footerComponent: {
            marginHorizontal: 'auto',
        },
        text: {
            color: theme.text
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            maxWidth: 600,
            height: 100,
            marginBottom: 8,
            borderStyle: 'solid',
            borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
            borderWidth: 1,
            borderRadius: 16,
            overflow: 'hidden',
            marginHorizontal: 'auto'
        }, 
        menuTextRow:{
            width: '65%',
            paddingTop: 8,
            paddingLeft: 8,
            paddingRight: 4,
            flexGrow: 1
        },
        menuItemTitle:{
            fontWeight: 'bold',
            fontSize: 18,
            textDecorationLine: 'underline'
        },
        menuItemImage: {
            width: 100,
            height: 100
        }
    });
}