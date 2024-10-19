import React, { useRef, useEffect, useCallback } from "react";
import useSound from "use-sound";

interface SoundInteractionProps extends React.HTMLAttributes<HTMLDivElement> {
  sounds?: {
    click?: string;
    clickDown?: string;
    clickOn?: string;
    clickOff?: string;
    hover?: string;
    swipe?: string;
    [key: string]: string | undefined;
  };
  volume?: number;
  disabled?: boolean;
}

type SoundType =
  | "click"
  | "clickDown"
  | "clickOn"
  | "clickOff"
  | "hover"
  | "swipe";

const SonicInteract: React.FC<SoundInteractionProps> = ({
  children,
  sounds = {},
  volume = 0.25,
  disabled = false,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [playClick] = useSound(sounds.click || "", {
    volume,
    soundEnabled: !disabled && !!sounds.click,
  });
  const [playClickDown] = useSound(sounds.clickDown || "", {
    volume,
    soundEnabled: !disabled && !!sounds.clickDown,
  });
  const [playClickOn] = useSound(sounds.clickOn || "", {
    volume,
    soundEnabled: !disabled && !!sounds.clickOn,
  });
  const [playClickOff] = useSound(sounds.clickOff || "", {
    volume,
    soundEnabled: !disabled && !!sounds.clickOff,
  });
  const [playHover] = useSound(sounds.hover || "", {
    volume,
    soundEnabled: !disabled && !!sounds.hover,
  });
  const [playSwipe] = useSound(sounds.swipe || "", {
    volume,
    soundEnabled: !disabled && !!sounds.swipe,
  });

  const playSound = useCallback(
    (type: SoundType) => {
      const soundMap = {
        click: playClick,
        clickDown: playClickDown,
        clickOn: playClickOn,
        clickOff: playClickOff,
        hover: playHover,
        swipe: playSwipe,
      };
      if (soundMap[type]) soundMap[type]();
    },
    [playClick, playClickDown, playClickOn, playClickOff, playHover, playSwipe]
  );

  const handleInteraction = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (disabled) return;

      const target = e.target as HTMLElement;

      if (["BUTTON", "A", "INPUT"].includes(target.tagName)) {
        switch (e.type) {
          case "click":
            playSound("click");
            break;
          case "mousedown":
          case "touchstart":
            playSound("clickDown");
            break;
          case "mouseup":
          case "touchend":
            if ((target as HTMLInputElement).checked) {
              playSound("clickOn");
            } else {
              playSound("clickOff");
            }
            break;
          case "mouseenter":
            playSound("hover");
            break;
        }
      }
    },
    [disabled, playSound]
  );

  const handleSwipe = useCallback(
    (startX: number, endX: number) => {
      if (disabled) return;
      if (Math.abs(startX - endX) > 50 && sounds.swipe) playSwipe();
    },
    [disabled, playSwipe, sounds.swipe]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startX: number;

    const touchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const touchEnd = (e: TouchEvent) => {
      handleSwipe(startX, e.changedTouches[0].clientX);
      handleInteraction(e);
    };

    element.addEventListener("click", handleInteraction);
    element.addEventListener("mousedown", handleInteraction);
    element.addEventListener("mouseup", handleInteraction);
    element.addEventListener("mouseenter", handleInteraction, true);
    element.addEventListener("touchstart", touchStart);
    element.addEventListener("touchend", touchEnd);

    return () => {
      element.removeEventListener("click", handleInteraction);
      element.removeEventListener("mousedown", handleInteraction);
      element.removeEventListener("mouseup", handleInteraction);
      element.removeEventListener("mouseenter", handleInteraction, true);
      element.removeEventListener("touchstart", touchStart);
      element.removeEventListener("touchend", touchEnd);
    };
  }, [handleInteraction, handleSwipe]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};

export default React.memo(SonicInteract);
