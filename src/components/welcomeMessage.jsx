// welcomeMessage.js
import React from 'react';

const getWelcomeMessage = (name) => [
  <div className=' overflow-hidden'>
    <pre className='font-mono  m-3 font-bold text-sm sm:text-base min-w-max'>
      {`███╗   ███╗████████╗██╗   ██╗
████╗ ████║╚══██╔══╝██║   ██║
██╔████╔██║   ██║   ██║   ██║
██║╚██╔╝██║   ██║   ██║   ██║
██║ ╚═╝ ██║██╗██║   ╚██████╔╝
╚═╝     ╚═╝╚═╝╚═╝    ╚═════╝ 
                             `}
    </pre>
  </div>,
  <div className='mt-5' key='welcome-text'>
    Welcome to <strong className='text-[hsl(var(--primary))]'>{name}</strong>
    's Portfolio
  </div>,
  <div key='help-text' className='my-4'>
    Type <code className='text-[hsl(var(--primary))]'>help</code> to learn more
    about me !
  </div>,
];

export default getWelcomeMessage;
