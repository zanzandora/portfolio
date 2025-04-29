const createCommands = ({
  name,
  role,
  skills,
  projects,
  contact,
  terminalRef,
}) => {
  const commands = {
    about: {
      description: 'About Me',
      usage: 'about',
      fn: async () =>
        `<span class='font-bold text-lg/8'>\tHi, I'm ${name} - (${role}).</span> \n\tI'm a 4th year student majoring in software development, with basic knowledge of FE and BE development. Although I do not have much experience, I am always proactive in learning and improving my skills. My goal is to become a professional web developer, participating in creative projects and bringing real value to my work.`,
    },
    ski: {
      description: 'Display Skills',
      usage: 'skills',
      fn: () =>
        skills
          .map(
            (s) =>
              ` <ul class="font-bold">${s.name}:</ul>  ${s.stacks
                .map(
                  (stack) =>
                    `<li class="text-[hsl(var(--commands))] mx-6 text-sm/8  leading-3 -my-1">${stack}</li>`
                )
                .join(' ')}`
          )
          .join('<br>'),
    },
    pro: {
      description: 'Display Projects',
      usage: 'projects',
      fn: () => {
        if (projects.length > 0 && typeof projects[0] === 'object') {
          return projects
            .map(
              (p, i) => `
      <div class="-my-2">
        <a href="${
          p.url
        }" target="_blank"  class="font-bold text-xl text-[hsl(var(--commands))] hover:text-[#8be9fd]">${
                p.name
              }</a>
        <span class="text-[hsl(var(--commands)) text-gray-300 mx-[72px] flex -my-4 ">${
          p.description || ''
        }</span>
        <div class= "text-[hsl(var(--commands))] mt-2">
        ${p.stack
          .map(
            (tech) =>
              `<span class="text-xs bg-accent/10 px-2 py-1 rounded">${tech}</span>`
          )
          .join(' ')}
        </div>
      </div>  `
            )
            .join('');
        }
        // Fallback cho mảng chuỗi đơn giản
        return projects.map((p, i) => `${i + 1}. ${p}`).join('\n');
      },
    },
    con: {
      description: 'Display Contact Informations',
      usage: 'contact',
      fn: () =>
        `📧 Email: <a href="mailto:${contact.email}" class=" text-[hsl(var(--commands))] hover:text-[#8be9fd]">${contact.email}</a><br>🔗 LinkedIn: <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer"  class=" text-[hsl(var(--commands))] hover:text-[#8be9fd]">${contact.linkedin}</a><br>🐱 GitHub: <a href="https://${contact.github}" target="_blank" rel="noopener noreferrer"  class=" text-[hsl(var(--commands))] hover:text-[#8be9fd]">${contact.github}</a>`,
    },
    echo: {
      description:
        'Prints the given text to the console | echo <<code>string</code>>',
      usage: 'echo <string>',
      fn: (...args) => args.join(' '),
    },

    clear: {
      description: 'Clear the Terminal',
      usage: 'clear',
      fn: () => terminalRef.current.clearStdout(),
    },
  };

  // Thêm lệnh help sau khi có đủ commands
  commands.help = {
    description: 'Show Available Commands',
    usage: 'help',
    fn: () =>
      Object.entries(commands)
        .map(([cmd, { description }]) => `${cmd} - ${description}`)
        .join('\n'),
  };

  return commands;
};

export default createCommands;
