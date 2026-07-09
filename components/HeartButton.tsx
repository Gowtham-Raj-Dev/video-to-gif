"use client";

import { useState } from "react";
import { HeartIcon } from "@/components/Icons";

export function HeartButton() {
  const [clicked, setClicked] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; tx: number; ty: number; rot: number; duration: number; size: number }[]>([]);

  const handleClick = () => {
    setClicked(true);

    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      tx: (Math.random() - 0.5) * 100, // random x between -50px and 50px
      ty: (Math.random() - 0.5) * 100 - 40, // random y mostly upwards
      rot: (Math.random() - 0.5) * 90, // random rotation
      duration: Math.random() * 0.8 + 0.8, // 0.8s to 1.6s
      size: Math.random() * 10 + 8, // 8px to 18px
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((n) => n.id === h.id)));
    }, 1600);
  };

  return (
    <span className="relative inline-flex items-center justify-center">
      <button
        onClick={handleClick}
        className={`relative z-10 transition-colors ${clicked ? "text-red-500" : "text-accent hover:text-red-500"}`}
        aria-label="love"
      >
        <HeartIcon
          className="h-4 w-4 transition-colors"
          style={clicked ? { fill: "currentColor" } : {}}
        />
      </button>

      {/* Flying hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pointer-events-none absolute left-1/2 top-1/2 text-red-500 animate-fly-up"
          style={{
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            "--tx": `${h.tx}px`,
            "--ty": `${h.ty}px`,
            "--r": `${h.rot}deg`,
          } as React.CSSProperties}
        >
          ❤️
        </span>
      ))}
    </span>
  );
}
