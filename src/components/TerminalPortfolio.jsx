import React, { useRef, useState, useEffect } from 'react';
import Terminal from 'react-console-emulator';
import profileData from '../lib/mockdata';
import createCommands from './Commands/Commands';
import MacbookWindowHeader from './WindowHeader';
import ThemeSwitcher from './ThemeSwitcher';
import getWelcomeMessage from './welcomeMessage';

/**
 * TerminalPortfolio
 * A customizable terminal-style portfolio component.
 *
 * @param {Object} props
 * @param {string} props.name - Your name.
 * @param {string} props.role - Your role/title.
 * @param {string[]} props.skills - List of skills.
 * @param {string[]} props.projects - List of project names.
 * @param {Object} props.contact - Contact info (email, linkedin, github).
 */

const MIN_HEIGHT = 300;
const MAX_HEIGHT = 600;

export default function TerminalPortfolio(props) {
  const {
    name = profileData.name,
    role = profileData.role,
    skills = profileData.skills,
    projects = profileData.projects,
    contact = profileData.contact,
  } = props;

  const terminalRef = useRef();
  const contentRef = useRef();
  const [containerHeight, setContainerHeight] = useState(300);
  const [overflow, setOverflow] = useState('hidden');

  const commands = createCommands({
    name,
    role,
    skills,
    projects,
    contact,
    terminalRef,
  });

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current && terminalRef.current) {
        const terminalContent = terminalRef.current.terminalRoot.current;
        const contentHeight = terminalContent.scrollHeight;

        // Kiểm tra nếu nội dung vượt quá chiều cao tối đa
        if (contentHeight > MAX_HEIGHT) {
          setContainerHeight(MAX_HEIGHT);
          setOverflow('auto'); // Cho phép scroll khi overflow
        } else {
          setContainerHeight(Math.max(contentHeight, MIN_HEIGHT));
          setOverflow('hidden');
        }
      }
    };

    // Check height after terminal updates
    const interval = setInterval(checkHeight, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='max-w-4xl mx-auto px-2 sm:px-4 '>
      <div className='rounded-lg   flex flex-col mt-4 sm:mt-10 leading-snug transition-all duration-300'>
        <div ref={contentRef} className='flex-1 h-full relative'>
          <MacbookWindowHeader
            title='>_ terminal'
            className=' absolute w-full'
          />
          <Terminal
            ref={terminalRef}
            commands={commands}
            welcomeMessage={getWelcomeMessage(name)}
            promptLabel='user@portfolio:~$'
            dangerMode={true}
            noDefaults={true}
            autoFocus
            styleEchoBack='fullInherit'
            className='font-mono h-full min-h-[300px] max-h-[500px] pt-12 overflow-hidden w-full
            selection:bg-[hsl(var(--selection-bg))] selection:text-[hsl(var(--selection-text))] text-xs sm:text-base'
            contentStyle={{
              color: 'hsl(var(--commands))',
              fontWeight: 'normal',
              paddingLeft: null,
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '1.25em',
              lineHeight: '1.6',
            }}
            style={{
              minHeight: `${MIN_HEIGHT}px`,
              maxHeight: `${MAX_HEIGHT}px`,
              overflow: overflow,
              backgroundColor: 'hsl(var(--background))',
              border: '1.5px solid hsl(var(--muted))',
              borderRadius: '0.75rem',
            }}
            inputStyle={{
              height: '30px',
              color: '#e9eae5',
            }}
            promptLabelStyle={{
              color: 'hsl(var(--primary))',
            }}
            inputAreaStyle={{
              marginTop: '10px',
            }}
            inputTextClassName='focus:outline-none bg-transparent'
          />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
