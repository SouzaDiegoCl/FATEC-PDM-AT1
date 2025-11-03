import { useRef, useState } from "react";

import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WebView from "react-native-webview";
import Button from "../componentes/MyButton";

export default function Index() {
  const [showWebView, setShowWebView] = useState(false);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [showSkeleton, setShowSkeleton] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleWebViewVisibility = () => {
    setShowWebView(!showWebView);
  };

  const rotateImage = () => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => rotateValue.setValue(0));
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setShowSkeleton(true);
    });
  };

  const fadeIn = () => {
    setShowSkeleton(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        paddingVertical: 48,
        paddingHorizontal: 32,
        gap: 48,
      }}
    >
      {/* JSX - HTML Javascript */}
      <View style={{ flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Animated.Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/99719728?v=4",
          }}
          style={[styles.image, { transform: [{ rotate }] }]}
        />
        <Text style={{ fontSize: 36, fontStyle: "italic", fontWeight: 900 }}>
          Diego Baltazar
        </Text>
        <Button
          label={showWebView ? "Fechar Perfil" : "Abrir Perfil"}
          onClick={toggleWebViewVisibility}
        />
      </View>
      {showWebView ? (
        <>
          <View style={{ flex: 1, borderWidth: 1, borderRadius: 2 }}>
            <WebView
              source={{ uri: "https://github.com/SouzaDiegoCl " }}
              scrollEnabled={true}
              style={styles.container}
            />
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: "#1d1d1d",
              padding: 16,
              alignItems: "center",
            }}
            onPress={() => rotateImage()}
          >
            <Text style={{ color: "#dfdfdf" }}>Rodar Imagem</Text>
          </TouchableOpacity>
          <Pressable
            style={{
              backgroundColor: "#1d1d1d",
              padding: 16,
              alignItems: "center",
            }}
            onPress={() => fadeOut()}
          >
            <Text style={{ color: "#dfdfdf" }}>Fade Out</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#1d1d1d",
              padding: 16,
              alignItems: "center",
            }}
            onPress={() => fadeIn()}
          >
            <Text style={{ color: "#dfdfdf" }}>Fade In</Text>
          </Pressable>
          {!showSkeleton ? (
            <Animated.View style={[styles.obj, { opacity: fadeAnim }]}>
              <Animated.Text style={[styles.txt, { opacity: fadeAnim }]}>
                AA
              </Animated.Text>
            </Animated.View>
          ) : (
            <Animated.View style={styles.skeleton}>
              <Text style={{ color: "#999" }}>🦴 Carregando...</Text>
            </Animated.View>
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  obj: {
    backgroundColor: "#f0f",
    color: "#fff",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontWeight: "semibold",
    color: "#fff",
  },
  skeleton: {
    color: "#797979ff",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#999",
  },
});
