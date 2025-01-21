import { Appearance, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS, { ColorsTheme } from "@/constants/Colors";
import createGetStylesFactory from "@/utils/createStylesheet";

export default function Index() {
  const colorScheme = Appearance.getColorScheme();
  const styles = getStyles(colorScheme);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </SafeAreaView>
  );
}

const getStyles = createGetStylesFactory((themeStyles: ColorsTheme) =>({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: themeStyles.background,
    },
    text: {
      fontSize: 20,
      color: themeStyles.text,
    },
}));