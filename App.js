import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.Pressable`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCRENN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const position = useRef(
    new Animated.ValueXY({
      x: -SCRENN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;
  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCRENN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCRENN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });

  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCRENN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });

  const topRight = Animated.timing(position, {
    toValue: {
      x: SCRENN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });
  const moveUp = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };
  const opacity = position.y.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: [1, 0.5, 1],
  });

  const bgColor = position.y.interpolate({
    inputRange: [-250, 250],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  const border = position.y.interpolate({
    inputRange: [-250, 250],
    outputRange: [100, 0],
  });

  return (
    <Container>
      <AnimatedBox
        onPress={moveUp}
        style={{
          borderRadius: border,
          opacity,
          backgroundColor: bgColor,
          transform: [...position.getTranslateTransform()],
        }}
      />
    </Container>
  );
}
