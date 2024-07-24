"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockAI } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const InterviewList = () => {
    const [interviewList, setInterviewList] = useState([])
    const {user} =useUser()
    const router=useRouter()
    useEffect(() => {
      user&&GetInterviewList()
 
    }, [user])
    
    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockAI)
        .where(eq(MockAI.createdBy,user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockAI.id))

        console.log(result)
        setInterviewList(result)
    }
    const onStart=(id)=>{
      router.push("/dashboard/interview/"+id)
    }
    const onFeedBack=(id)=>{
        router.push("/dashboard/interview/"+id+"/feedback")
      }
  return (
    <div>
        <h2 className="font-medium text-xl ">Previous Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4'>
        {interviewList&&interviewList.map((interview,index)=>(
            <div className='border shadow-sm rounded-lg p-3' >
               <h2 className="font-bold text-primary">
                {interview?.jobPosition}
               </h2>
               <h2 className="text-sm  text-gray-700">
                Experience: {" "}
                {interview?.jobExperience}
               </h2>
               <h2 className="text-xs  text-gray-500">
                Created At: {" "}
                {interview?.createdAt}
               </h2>
               <div className='flex justify-between mt-4 gap-3'>
      
                   <Button size="sm" variant="outline" className="w-full " onClick={()=>onFeedBack(interview?.mockId)} >Feedback</Button>
                
                   <Button size="sm"  className="w-full" onClick={()=>onStart(interview?.mockId)}>Start</Button>
              

               </div>
            </div>

        ))}
      </div>
    </div>
  )
}

export default InterviewList