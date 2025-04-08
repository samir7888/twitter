import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='h-screen w-full flex  bg-black text-white'>
        <div className='w-1/3'>
        {/* siderbar */}

        </div>

        {/* maincontent */}
        <div className='w-full p-12 border border-gray-500'  >
            <Outlet />
        </div>
    </div>
  )
}

export default HomeLayout