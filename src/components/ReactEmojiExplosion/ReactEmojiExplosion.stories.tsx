import type { Meta, StoryObj } from "@storybook/react";
import ReactEmojiExplosion, {
  type ReactEmojiExplosionProps,
} from "./ReactEmojiExplosion";

const meta: Meta = {
  title: "ReactEmojiExplosion",
  component: ReactEmojiExplosion,
};

export default meta;

type Story = StoryObj<ReactEmojiExplosionProps>;

export const Default: Story = {
  args: {
    rootElement: document.querySelector("#custom-root") as HTMLElement,
    emojis: ["Testing", "123", "🎉"],
    bounce: true,
  },
};
