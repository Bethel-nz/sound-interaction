import { useRef, useEffect, useCallback } from "react";
type Modifiers = {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
};

type KeyCombo = string | (Modifiers & { key: string });
type Handler = (event: KeyboardEvent) => void;
type Bindings = Record<string, Handler>;

const useKeyboardBindings = (initialBindings: Bindings) => {
  const bindingsRef = useRef<Record<string, Handler>>({});
  const setBindings = useCallback((bindings: Bindings) => {
    bindingsRef.current = {};
    (Object.entries(bindings) as [string, Handler][]).forEach(
      ([combo, handler]) => {
        bindingsRef.current[normalizeCombo(combo)] = handler;
      }
    );
  }, []);

  useEffect(() => {
    setBindings(initialBindings);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const combo = getComboFromEvent(event);
      const handler = bindingsRef.current[combo];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (newBindings: Bindings) => {
    setBindings(newBindings);
  };
};

const normalizeCombo = (combo: KeyCombo): string => {
  if (typeof combo === "string") {
    const parts = combo.toLowerCase().split("+");
    const key = parts.pop() as string;
    const modifiers = parts.sort().join("+");
    return modifiers ? `${modifiers}+${key}` : key;
  } else {
    const { ctrl, alt, shift, meta, key } = combo;
    const modifiers = [
      ctrl && "ctrl",
      alt && "alt",
      shift && "shift",
      meta && "meta",
    ]
      .filter(Boolean)
      .sort()
      .join("+");
    return modifiers ? `${modifiers}+${key.toLowerCase()}` : key.toLowerCase();
  }
};

const getComboFromEvent = (event: KeyboardEvent): string => {
  const modifiers = [];
  if (event.ctrlKey) modifiers.push("ctrl");
  if (event.altKey) modifiers.push("alt");
  if (event.shiftKey) modifiers.push("shift");
  if (event.metaKey) modifiers.push("meta");
  const key = event.key.toLowerCase();
  return modifiers.length > 0 ? `${modifiers.sort().join("+")}+${key}` : key;
};

export default useKeyboardBindings;
