import { useEffect, useState } from 'react';

const themes = ['nord', 'monokai', 'dracula', 'github', 'material'];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('nord');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && themes.includes(storedTheme)) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }, []);

  const handleChangeTheme = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  return (
    <div className='p-4 flex gap-4 items-center'>
      <select
        className='select select-bordered'
        value={theme}
        onChange={handleChangeTheme}
      >
        {themes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
