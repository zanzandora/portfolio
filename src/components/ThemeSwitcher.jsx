import { useEffect, useRef, useState } from 'react';

const themes = ['nord', 'monokai', 'dracula'];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('dracula');
  const [showSelector, setShowSelector] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Đọc theme từ localStorage hoặc sử dụng mặc định
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = themes.includes(storedTheme) ? storedTheme : 'dracula';

    // Cập nhật state và thiết lập data-theme
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    setIsThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!showSelector) return;

    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSelector(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSelector]);

  const handleToggleSelector = () => {
    setShowSelector((prev) => !prev);
  };

  if (!isThemeLoaded) return null;

  return (
    <div className='fixed bottom-5 right-5 z-10' ref={containerRef}>
      <div className=' flex gap-4 items-center   shadow-lg p-2'>
        <button
          className='appearance-none focus:outline-none focus:ring-0 active:bg-transparent 
             p-2 text-white rounded-full btn bg-[hsl(var(--background))] 
             border focus:bg-[hsl(var(--muted))] transition-colors'
          onClick={handleToggleSelector}
        >
          THEME
        </button>

        {showSelector && (
          <div className='absolute  bottom-full right-0 mb-2 p-2  bg-[hsl(var(--background))]  rounded-sm bg-background border-white border shadow-lg min-w-[200px]'>
            {themes.map((themeName) => (
              <button
                key={themeName}
                className={`w-full hover:bg-[hsl(var(--muted))] bg-[hsl(var(--background))] text-white h-full px-4 py-2 text-left rounded  transition-colors ${
                  theme === themeName ? 'bg-muted font-bold' : ''
                }`}
                onClick={() => {
                  setTheme(themeName);
                  document.documentElement.setAttribute(
                    'data-theme',
                    themeName
                  );
                  localStorage.setItem('theme', themeName);
                  setShowSelector(false);
                }}
              >
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
