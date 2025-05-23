export default function MacbookWindowHeader({ title = '', className = '' }) {
  return (
    <div
      className={`select-none  z-20 flex items-center px-4 py-2 backdrop-blur-md bg-[hsl(var(--muted)/0.7)]  rounded-t-lg ${className}`}
    >
      <div className='flex space-x-2 mr-4'>
        <span
          className='w-3 h-3 rounded-full bg-red-500 border border-red-400 inline-block'
          title='Close'
        />
        <span
          className='w-3 h-3 rounded-full bg-yellow-400 border border-yellow-300 inline-block'
          title='Minimize'
        />
        <span
          className='w-3 h-3 rounded-full bg-green-500 border border-green-400 inline-block'
          title='Zoom'
        />
      </div>
      <span className='text-base-content font-medium text-sm'>{title}</span>
    </div>
  );
}
