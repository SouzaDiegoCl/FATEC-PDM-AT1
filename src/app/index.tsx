import { useRef, useState } from "react";

import { Animated, Easing, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import Button from "../componentes/MyButton";


export default function Index() {
    const [showWebView, setShowWebView] = useState(false);
    const rotateValue = useRef(new Animated.Value(0)).current;
    const [showSkeleton, setShowSkeleton] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const toggleWebViewVisibility = () => {
        setShowWebView(!showWebView)
    }

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

    return (

        < View style={{ flex: 1, flexDirection: "column", paddingVertical: 48, paddingHorizontal: 32, gap: 48 }
        }>
            {/* JSX - HTML Javascript */}
            <View style={{ flexDirection: "column", alignItems: "center", gap: 16 }}>
                <Animated.Image source={{ uri: "https://avatars.githubusercontent.com/u/99719728?v=4" }} style={[styles.image, { transform: [{ rotate }] }]} />
                <Text style={{ fontSize: 36, fontStyle: "italic", fontWeight: 900 }}>Diego Baltazar</Text>
                <Button label={showWebView ? "Fechar Perfil" : "Abrir Perfil"} onClick={toggleWebViewVisibility} />
            </View>
            {showWebView ?
                (
                    <>
                        <View style={{ flex: 1 }}>
                            <WebView
                                source={{ uri: 'https://github.com/SouzaDiegoCl ' }}
                                scrollEnabled={true}
                                style={styles.container}
                            />
                        </View>
                        {!showSkeleton ? (
                            <Animated.View style={{ opacity: fadeAnim }}>
                                <Image
                                    source={{ uri: 'https://avatars.githubusercontent.com/u/99719728?v=4' }}
                                    style={styles.image}
                                />
                            </Animated.View>
                        ) : (
                            <Animated.View style={[styles.skeleton, { opacity: 1 }]}>
                                <Text style={{ color: "#999" }}>🦴 Carregando...</Text>
                            </Animated.View>
                        )}
                    </>

                )
                : <>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{ backgroundColor: "#1d1d1d", padding: 16, alignItems: "center" }}
                        onPress={() => rotateImage()}
                    >
                        <Text style={{ color: "#dfdfdf" }}>Rodar Imagem</Text>
                    </TouchableOpacity>
                    <Pressable style={{ backgroundColor: "#1d1d1d", padding: 16, alignItems: "center" }}>
                        <Text style={{ color: "#dfdfdf" }}>aa</Text>
                    </Pressable>
                </>
            }
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#F0F",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 25
    },
    skeleton: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#2a2a2a",
        alignItems: "center",
        justifyContent: "center",
    },
});