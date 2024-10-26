import { motion } from "framer-motion";
import { useState } from "react";

interface EmojiExplosionProps {
  emojis: string[];
  count?: number;
}

const EmojiExplosion = ({ emojis, count = 10 }: EmojiExplosionProps) => {
  const [exploded, setExploded] = useState(false);

  const handleExplosion = () => {
    setExploded(true);
    setTimeout(() => setExploded(false), 1000);
  };

  const explosionVariants = {
    initial: { opacity: 1 },
    explode: {
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const emojiVariants = {
    initial: { y: 0, opacity: 1 },
    explode: (index: number) => ({
      y: Math.random() * 100 - 50,
      x: Math.random() * 100 - 50,
      opacity: 0,
      transition: { delay: index * 0.1 },
    }),
  };

  return (
    exploded && (
      <motion.div
        variants={explosionVariants}
        initial="initial"
        animate="explode"
      >
        {Array.from({ length: count }, (_, index) => (
          <motion.span key={index} variants={emojiVariants} custom={index}>
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </motion.span>
        ))}
      </motion.div>
    )
  );
};

export default EmojiExplosion;
