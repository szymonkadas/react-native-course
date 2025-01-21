import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import {Link} from 'expo-router'
// @ts-ignore
import icedCoffeeImg from "@/assets/images/iced-coffee.png"
import React from 'react'

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={icedCoffeeImg} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Coffee Shop</Text>
        <Link href={"/contact"} style={{marginHorizontal: 'auto'}} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Contact us</Text>
          </Pressable>
        </Link>
        <Link href={"/menu"} style={{marginHorizontal: 'auto'}} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Our Menu</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text:{
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120
  },
  link:{
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    textDecorationLine: 'underline',
    padding: 4
  },
  button:{
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 6,
    marginBottom: 32,
    width: 160
  },
  buttonText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4
  },
  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1,
  },
})

export default app