import type { Emoji } from "emoji-type";
import { type MouseEvent, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  animateParticles,
  animationId,
  createParticle,
  particles,
} from "./utils";

export type Emojis = Emoji[];

export interface ReactEmojiExplosionProps {
  rootElement: HTMLElement;
  emojis: Emojis;
  bounce?: boolean;
}

const ReactEmojiExplosion = ({
  rootElement,
  emojis,
  bounce = false,
}: ReactEmojiExplosionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCanvasClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        for (let i = 0; i < emojis.length; i++) {
          particles.push(createParticle(x, y, emojis));
        }
        if (!animationId) {
          animateParticles(
            ctx,
            canvas.width / window.devicePixelRatio,
            canvas.height / window.devicePixelRatio,
            bounce
          );
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);
      }
    }
    return () => cancelAnimationFrame(animationId);
  }, []);

  return ReactDOM.createPortal(
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{ position: "absolute", top: 0, left: 0 }}
      onKeyUp={(event) => {
        if (event.key === "Escape") {
          cancelAnimationFrame(animationId);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          cancelAnimationFrame(animationId);
        }
      }}
    />,
    rootElement
  );
};

export default ReactEmojiExplosion;
