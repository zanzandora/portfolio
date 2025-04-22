# TerminalPortfolio Component

A customizable terminal-style portfolio React component built with [react-console-emulator](https://github.com/linuswillner/react-console-emulator).

## Features

- Terminal-like interface for your portfolio
- Customizable commands: about, skills, projects, contact, theme, clear, help
- Light/dark theme toggle
- Easily configurable via props

## Usage

```jsx
import TerminalPortfolio from './TerminalPortfolio';

export default function App() {
  return (
    <TerminalPortfolio
      name='Nguyễn Văn A'
      role='Full Stack Developer'
      skills={[
        'HTML/CSS',
        'JavaScript/TypeScript',
        'React/Next.js',
        'Node.js/Express',
        'SQL/NoSQL',
      ]}
      projects={[
        'Portfolio Website',
        'E-commerce Platform',
        'Chat Application',
      ]}
      contact={{
        email: 'youremail@example.com',
        linkedin: 'linkedin.com/in/yourprofile',
        github: 'github.com/yourusername',
      }}
      initialTheme='dark'
    />
  );
}
```

## Available Commands

- `about` — Show about info
- `skills` — List skills
- `projects` — List projects
- `contact` — Show contact info
- `theme [light/dark]` — Switch theme
- `clear` — Clear the terminal
- `help` — List available commands

## Customization

You can add or modify commands by editing the `commands` object in `TerminalPortfolio.jsx`.

---

**Enjoy your interactive terminal portfolio!**
