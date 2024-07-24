"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
  
const Page = ({params}) => {
   const [feedbackList, setFeedbackList] = useState([])
   const router = useRouter()

   useEffect(()=>{
       GetFeedback();
   },[])

   const GetFeedback = async () => {
       const result = await db.select()
           .from(UserAnswer)
           .where(eq(UserAnswer.mockIdRef, params.interviewId))
           .orderBy(UserAnswer.id);
       console.log('Fetched feedback:', result);
       setFeedbackList(result);
   }

   console.log('Feedback list:', feedbackList);
   
   return (
       <div className='p-10'>
           <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
           <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
          {feedbackList.length==0?
          <h2 className='text-gray-400'>
            No interview perform
          </h2>:(
            <>
             <h2 className='text-primary text-lg my-3'>Your overall interview rating</h2>
           <h2 className='text-sm text-gray'>Find below interview with correct answer, your answer, and feedback for improvement</h2>
           {feedbackList && feedbackList.map((item, index) => (
               <Collapsible key={index} className='my-10'>
                   <CollapsibleTrigger className='flex justify-between gap-7 p-2 bg-secondary rounded-lg my-2 text-left w-full'>
                   {index + 1}. {" "}   {item.question}  <ChevronsUpDownIcon className='h-5 w-5' />
                   </CollapsibleTrigger>
                   <CollapsibleContent>
                       <div className='flex flex-col gap-2'>
                           <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                           <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                           <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                           <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
                       </div>
                   </CollapsibleContent>
               </Collapsible>
           ))}
            </>
          )
        }
          
          
           <Button onClick={() => router.replace("/dashboard")}>Exit</Button>
       </div>
   )
}

export default Page
