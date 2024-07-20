"use client"
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'

const StartInterview = () => {
  const [interviewData, setInterviewData] = useState([])
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([])
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  
  useEffect(() => {
    getInterviewDetails()
  }, [])

  const getInterviewDetails = async () => {
    const result = await db.select().from(MockAI)
      .where(eq(MockAI.mockId, params.interviewId))

    const jsonMockResp = JSON.parse(result[0].jsonMockResp)
    console.log(jsonMockResp)
    setMockInterviewQuestion(jsonMockResp)
    setInterviewData(result[0])

  }
   


  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
         <QuestionsSection 
          activeQuestionIndex={activeQuestionIndex}
         mockInterviewQuestion={mockInterviewQuestion} 
          />
          <RecordAnswerSection
           activeQuestionIndex={activeQuestionIndex}
           mockInterviewQuestion={mockInterviewQuestion}
          />
      </div>
    </div>

  )
}

export default StartInterview;