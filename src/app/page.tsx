 import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <img src="/logo.jpeg" alt="logo" className="ml-3.5 mt-3.5 w-20 h-20 rounded-lg object-cover shadow-md"/>


      <div className='flex justify-center'>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 sm:py-2 sm:px-4 md:py-3
          md:px-6 rounded alig shadow-lg transition duration-300 ease-in-out">
           Responsive Button
        </button>
      </div>

    </div>
      
  );
}
