<template>
  <div id="payphone-outer">
    <div id="payphone-background">
      <Keypad @keypadPressed="keypadPressed" />
      <Screen :content="formatNumber(number)" />
      <div class="payphoneFunctions">
        <div class="keypadButton answer" @click="answer"></div>
        <div class="keypadButton decline" @click="decline"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "./Payphone.css";

// component
import Keypad from "./Keypad/Keypad.vue";
import Screen from "./Screen/Screen.vue";

// utils
import { fetchNui } from "../../utils/fetchNui";

const number = ref("");

const formatNumber = (number) => {
  const cleaned = `${number}`.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return number;
};

const keypadPressed = (key) => {
  if (number.value.length >= 10) return;
  number.value += key;
};

const keyHandler = (event) => {
  switch (event.key) {
    case "Backspace":
      number.value = number.value.slice(0, number.value.length - 1);
      break;

    case "Enter":
      if (number.value.length !== 10) return;
      console.log("make call");
      break;

    case "v":
      if (event.ctrlKey) {
        navigator.clipboard.readText().then((text) => {
          if (isNaN(parseInt(text)) || text.length > 10) return;
          number.value = text;
        });
      }
      break;
  }
};

const answer = () => {
  console.log("answer phone");
};

const decline = () => {
  console.log("hang up phone");
};

onMounted(() => {
  fetchNui("payphoneReady", {}, {}).then();
  window.addEventListener("keydown", keyHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", keyHandler);
});
</script>
