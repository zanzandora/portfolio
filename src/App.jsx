import React from 'react';
import TerminalPortfolio from './components/TerminalPortfolio';
import LetterGlitch from './components/background/LetterGlitch';

export default function App() {
  return (
    <>
      <div className='relative w-screen h-screen overflow-hidden'>
        {/* LetterGlitch làm background */}
        <div className='absolute inset-0 z-0 opacity-20'>
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={false}
            outerVignette={false}
            smooth={true}
          />
        </div>
        {/* Nội dung phía trên */}
        <div className='relative z-10   h-full'>
          <TerminalPortfolio />
        </div>
      </div>
    </>
  );
}
