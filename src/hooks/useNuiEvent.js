import { ref, onMounted } from "vue";
import { noop } from "../utils/misc";

const useNuiEvent = (action, handler) => {
  const savedHandler = ref(noop);

  onMounted(() => {
    savedHandler.value = handler;
  });

  onMounted(() => {
    const eventListener = (event) => {
      const { action: eventAction, data } = event.data;

      if (savedHandler.value && eventAction === action) {
        savedHandler.value(data);
      }
    };

    window.addEventListener("message", eventListener);
    // Remove Event Listener on component cleanup
    return () => window.removeEventListener("message", eventListener);
  });
};

export default useNuiEvent;
