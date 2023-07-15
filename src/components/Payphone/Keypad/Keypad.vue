<template>
  <div id="keypad-container">
    <div class="keypadButton one" @click="() => keypadPressed(1)" />

    <div class="keypadButton two" @click="() => keypadPressed(2)" />

    <div class="keypadButton three" @click="() => keypadPressed(3)" />

    <div class="keypadButton four" @click="() => keypadPressed(4)" />

    <div class="keypadButton five" @click="() => keypadPressed(5)" />

    <div class="keypadButton six" @click="() => keypadPressed(6)" />

    <div class="keypadButton seven" @click="() => keypadPressed(7)" />

    <div class="keypadButton eight" @click="() => keypadPressed(8)" />

    <div class="keypadButton nine" @click="() => keypadPressed(9)" />

    <div class="keypadButton asterisk" @click="() => keypadPressed('*')" />

    <div class="keypadButton zero" @click="() => keypadPressed(0)" />

    <div class="keypadButton hash" @click="() => keypadPressed('#')" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, defineEmits } from "vue";
import "./Keypad.css";

const emit = defineEmits(["keypadPressed"]);

const keypadPressed = (key) => {
  // Handle the keypad press event
  console.log(`Keypad key pressed: ${key}`);
  emit("keypadPressed", key);
};

const keyHandler = (event) => {
  switch (event.key) {
    case "1":
      keypadPressed(1);
      break;
    case "2":
      keypadPressed(2);
      break;
    case "3":
      keypadPressed(3);
      break;
    case "4":
      keypadPressed(4);
      break;
    case "5":
      keypadPressed(5);
      break;
    case "6":
      keypadPressed(6);
      break;
    case "7":
      keypadPressed(7);
      break;
    case "8":
      keypadPressed(8);
      break;
    case "9":
      keypadPressed(9);
      break;
    case "0":
      keypadPressed(0);
      break;
    case "*":
      keypadPressed("*");
      break;
    case "#":
      keypadPressed("#");
      break;
  }
};

onMounted(() => {
  window.addEventListener("keydown", keyHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", keyHandler);
});
</script>
