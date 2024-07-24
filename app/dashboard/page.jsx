import React from 'react'
import AddNewMock from './_components/AddNewMock'
import InterviewList from './_components/InterviewList'

const Page = () => {
  return (
    <div className='p-10'>
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2>Create and Start your Mock Interview</h2>
     <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      <AddNewMock />
     </div>
     <div>
      <InterviewList/>
     </div>
      </div>
  )
}

export default Page