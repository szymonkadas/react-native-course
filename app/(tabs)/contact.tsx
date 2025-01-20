import { StyleSheet, Image, Platform, TouchableOpacity, View, useColorScheme } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Contact us!</ThemedText>
      </ThemedView>
      <ThemedText>
        We're thrilled to have you cooperate with us.{"\n"}
        Please fill out these fields to send a message.
      </ThemedText>
      <View style={{...styles.formContainer, backgroundColor: colorScheme === 'dark' ? '#353636' : '#D0D0D0'}}>
        <TextInput
          placeholder="Name"
          style={{...styles.inputField , color: Colors[colorScheme ?? 'light'].text}}
        />
        <TextInput
          placeholder="Email"
          style={{...styles.inputField , color: Colors[colorScheme ?? 'light'].text}}
        />
        <TextInput
          placeholder="Message"
          multiline
          numberOfLines={4}
          style={{...styles.inputField , color: Colors[colorScheme ?? 'light'].text}}
        />
        <TouchableOpacity style={styles.submitButton}>
          <ThemedText style={styles.submitButtonText}>Submit</ThemedText>
        </TouchableOpacity>
      </View>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          Guess what
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              On Ios it also shows this :D
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  submitButtonText: {
    fontSize: 18,
  },
});
