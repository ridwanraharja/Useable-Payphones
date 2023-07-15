<template>
  <div style="display: block; height: 100%">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, provide, inject, onMounted, onUnmounted } from "vue";

// utils
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

// other
import useNuiEvent from "../hooks/useNuiEvent.js";

const VisibilityCtx = Symbol();
const visible = ref(isEnvBrowser());

const setVisible = (isVisible) => {
  visible.value = isVisible;
};

useNuiEvent("setVisible", setVisible);

const handleKeyDown = (event) => {
  if (!visible.value) return;
  if (event.code === "Escape") {
    CloseUI({ visible, setVisible });
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

provide(VisibilityCtx, {
  visible,
  setVisible,
});

const useVisibility = () => {
  const visibility = inject(VisibilityCtx);

  if (!visibility) {
    throw new Error("useVisibility must be used within VisibilityProvider");
  }

  return visibility;
};

function CloseUI(visibility) {
  if (!visibility.visible.value) return;

  if (!isEnvBrowser()) {
    fetchNui("hideFrame").then();
  } else {
    visibility.setVisible(false);
  }
}
</script>
