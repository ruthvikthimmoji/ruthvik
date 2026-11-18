import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** true on Apple devices: used to show ⌘K vs Ctrl K */
export function useIsMac() {
  return useSyncExternalStore(
    subscribe,
    () => /Mac|iPhone|iPad/i.test(navigator.platform),
    () => true
  );
}