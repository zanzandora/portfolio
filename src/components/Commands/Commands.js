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
      description: 'Giới thiệu về tôi',
      usage: 'about',
      fn: () => `Xin chào! Tôi là ${name} - ${role}.`,
    },
    ski: {
      description: 'Xem kỹ năng lập trình',
      usage: 'skills',
      fn: () => skills.map((s) => `- ${s}`).join('\n'),
    },
    pro: {
      description: 'Xem danh sách dự án',
      usage: 'projects',
      fn: () => {
        if (projects.length > 0 && typeof projects[0] === 'object') {
          return projects
            .map(
              (p, i) => `
      <div class="mt-2">
        <span class="${p.icon ? '' : 'hidden'} text-xl">${
                p.icon ? p.icon : ''
              }</span>
        <span class="font-bold text-[#8be9fd]">${p.name}</span><br>
        <span class="text-[#bfbfbf]">- ${p.description || ''}</span><br>
        <span class="text-[#bfbfbf]">- Stack: ${
          Array.isArray(p.stack) ? p.stack.join(', ') : p.stack || ''
        }</span><br>
        <span class="text-[#bfbfbf]">- Link: <a href="${
          p.url
        }" target="_blank" rel="noopener noreferrer" class="text-[#8be9fd] underline">${
                p.url
              }</a></span>
      </div>

              `
            )
            .join('');
        }
        // Fallback cho mảng chuỗi đơn giản
        return projects.map((p, i) => `${i + 1}. ${p}`).join('\n');
      },
    },
    con: {
      description: 'Thông tin liên hệ',
      usage: 'contact',
      fn: () =>
        `📧 Email: ${contact.email}<br>🔗 LinkedIn: <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" style="color:#8be9fd;">${contact.linkedin}</a><br>🐱 GitHub: <a href="${contact.github}" target="_blank" rel="noopener noreferrer" style="color:#8be9fd;">${contact.github}</a>`,
    },
    echo: {
      description: 'Echo một chuỗi truyền vào.',
      usage: 'echo <string>',
      fn: (...args) => args.join(' '),
    },

    clear: {
      description: 'Xóa màn hình terminal',
      usage: 'clear',
      fn: () => terminalRef.current.clearStdout(),
    },
  };

  // Thêm lệnh help sau khi có đủ commands
  commands.help = {
    description: 'Hiển thị các lệnh khả dụng',
    usage: 'help',
    fn: () =>
      Object.entries(commands)
        .map(([cmd, { description }]) => `${cmd} - ${description}`)
        .join('\n'),
  };

  return commands;
};

export default createCommands;
