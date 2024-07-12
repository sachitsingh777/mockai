import React from 'react'
import AddNewMock from './_components/AddNewMock'

const page = () => {
  return (
    <div className='p-10'>
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2>Create and Start your Mock Interview</h2>
     <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      <AddNewMock />
     </div>
      </div>
  )
}

export default page