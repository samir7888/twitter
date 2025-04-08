import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='min-h-screen w-full flex  bg-black text-white'>
        <div className='hidden sm:flex w-1/3 h-full'>
        {/* siderbar */}

        </div>

        {/* maincontent */}
        <div className='w-full min-h-screen max:p-12 border border-gray-500'  >
            <Outlet />
        </div>
    </div>
  )
}

export default HomeLayout