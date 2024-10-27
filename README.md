# react-emoji-explosion

`react-emoji-explosion` is a React component that creates a fun and interactive emoji explosion effect. This component can be used to add a playful touch to your web applications by displaying animated emojis that explode and bounce around the screen.

## Features

- Can use strings or emojis
- Bouncing effect

### Coming soon

- Customizable colors, sizes, and speeds
- More animations and effects
- Support for any HTML element
- Performance optimizations for lots of items

## Installation

You can install the package using npm or yarn:

```bash
npm install react-emoji-explosion
pnpm add react-emoji-explosion
yarn add react-emoji-explosion
```

## Usage

Here's an example of how to use the ReactEmojiExplosion component in your React application:

```jsx
import React from "react";
import ReactEmojiExplosion from "react-emoji-explosion";

const App = () => {
  return (
    <div>
      <h1>Click anywhere to see the emoji explosion!</h1>
      <ReactEmojiExplosion
        rootElement={document.getElementById("root")}
        numberOfItems={100}
        emojis={["🎉", "✨", "💥", "😍", "😂"]}
        bounce={true}
      />
    </div>
  );
};

export default App;
```

## Props

The ReactEmojiExplosion component accepts the following props:

| Prop          | Type        | Description                                            | Default |
| ------------- | ----------- | ------------------------------------------------------ | ------- |
| `rootElement` | HTMLElement | The root element where the canvas will be attached.    | -       |
| `emojis`      | string[]    | An array of emojis or strings to use in the explosion. | -       |
| `bounce`      | boolean     | Whether the emojis should bounce.                      | false   |

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
