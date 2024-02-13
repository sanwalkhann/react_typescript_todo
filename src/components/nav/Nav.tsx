import { IoHome } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoLogoMicrosoft } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
function Nav() {
  return (
    <div className='bg-slate-800 p-1 grid  grid-cols-2 md:grid-cols-3 max-w-screen'>
        {/* home icon */}
        <div className="flex justify-start items-center gap-1 w-max">
            <div className='h-[40px] flex justify-center items-center text-start w-[40px] border cursor-pointer hover:border-gray-400 border-gray-300'>
                <IoHome className='text-4xl text-gray-300 hover:text-gray-300 opacity-70' />
            </div>
            <div className='h-[40px] flex justify-center items-center text-start w-[40px] border cursor-pointer hover:border-gray-400 border-gray-300'>
                <FaPlus className='text-4xl text-gray-300 hover:text-gray-300 opacity-70' />
            </div>
        </div>
        {/* logo */}
        <div className="text-center md:flex justify-center items-center mx-auto w-max hidden">
            <IoLogoMicrosoft className='text-4xl text-gray-300 opacity-70' />
        </div>
        {/* search */}
        <div className='h-[40px] lg:w-72 sm:w-44 w-36 relative flex justify-end items-center ml-auto'>
            <input className='outline-none px-2 bg-gray-300 opacity-70 block h-full w-full' type="text" placeholder='Search...' />
            <CiSearch className='absolute top-[50%] translate-y-[-50%] right-3' />
        </div>
    </div>
  )
}

export default Nav