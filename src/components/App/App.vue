<template>
  <VisibilityProvider>
    <Payphone v-if="ready" />
  </VisibilityProvider>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "./App.css";

// component
import Payphone from "../Payphone/Payphone.vue";

// utils
import { fetchNui } from "../../utils/fetchNui";
import { debugData } from "../../utils/debugData";

// other
import useNuiEvent from "../../hooks/useNuiEvent.js";
import VisibilityProvider from "../../providers/VisibilityProvider.vue";

const ready = ref(false);

onMounted(() => {
  setTimeout(() => {
    fetchNui("ready", {}, {}).then();
  }, 2000);
});

useNuiEvent("init", async () => {
  ready.value = true;
});

debugData([
  {
    action: "init",
    data: null,
  },
]);
</script>
