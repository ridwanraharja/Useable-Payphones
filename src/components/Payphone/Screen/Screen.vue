<template>
  <div id="screen-container">
    <div id="screen">
      {{ content }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import "./Screen.css";

const props = defineProps({
  content: String,
});
</script>
