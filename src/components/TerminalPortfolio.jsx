import React, { useRef, useState, useEffect } from 'react';
import Terminal from 'react-console-emulator';
import profileData from './profileData';
import createCommands from './Commands/Commands';
import MacbookWindowHeader from './WindowHeader';
// import ThemeSwitcher from './ThemeSwitcher';

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
const MAX_HEIGHT = 500;

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
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        if (contentHeight < MIN_HEIGHT) {
          setContainerHeight(MIN_HEIGHT);
          setOverflow('hidden');
        } else if (contentHeight >= MIN_HEIGHT && contentHeight < MAX_HEIGHT) {
          setContainerHeight(contentHeight);
          setOverflow('hidden');
        } else {
          setContainerHeight(MAX_HEIGHT);
          setOverflow('auto');
        }
      }
    };

    // Check height after terminal updates
    const interval = setInterval(checkHeight, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='rounded-lg shadow-lg flex flex-col mt-10 leading-snug transition-all duration-300'>
        <MacbookWindowHeader title='>_ terminal' />
        <div ref={contentRef} className='flex-1 h-full'>
          <Terminal
            ref={terminalRef}
            commands={commands}
            welcomeMessage={[
              `██╗      █████╗ ███████╗██╗   ██╗    ██████╗  ██████╗ ██╗███████╗
██║     ██╔══██╗╚══███╔╝╚██╗ ██╔╝    ██╔══██╗██╔═══██╗██║╚══███╔╝
██║     ███████║  ███╔╝  ╚████╔╝     ██████╔╝██║   ██║██║  ███╔╝ 
██║     ██╔══██║ ███╔╝    ╚██╔╝      ██╔══██╗██║   ██║██║ ███╔╝  
███████╗██║  ██║███████╗   ██║       ██████╔╝╚██████╔╝██║███████╗
╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝       ╚═════╝  ╚═════╝ ╚═╝╚══════╝`,
              `Welcome to ${name}'s Terminal Portfolio 🚀`,
              'Gõ "help" để xem các lệnh có sẵn!',
            ]}
            promptLabel='user@portfolio:~$'
            dangerMode={true}
            noDefaults={true}
            className='font-mono h-full min-h-[300px] max-h-[500px]'
            contentStyle={{
              color: '#ffb86c',
              fontWeight: 'normal',
              paddingLeft: null,
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.4',
            }}
            style={{
              minHeight: `${MIN_HEIGHT}px`,
              maxHeight: `${MAX_HEIGHT}px`,
              overflowY: overflow,
            }}
            inputTextClassName='focus:outline-none bg-transparent'
          />
        </div>
      </div>
    </div>
  );
}
