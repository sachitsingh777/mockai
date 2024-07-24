"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/geminiAiModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
const RecordAnswerSection = ({ interviewData, mockInterviewQuestion, activeQuestionIndex }) => {
  const [userAnswer, setUserAnswer] = useState('')
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });



  useEffect(() => {
    results.map((result) => setUserAnswer(prev => prev + result?.transcript))
  }, [results])

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
      console.log("done")
    }
    if (userAnswer?.length < 10) {
      setLoading(false)
      toast('Error while saving your answer ,Please record again')
      return
    }
  }, [userAnswer])


  const saveUserAnswer = async () => {
    if (isRecording) {

      stopSpeechToText()

    } else {
      startSpeechToText()
    }
  }
  const UpdateUserAnswer = async () => {
    setLoading(true)
    const feedbackPrompt = "Question" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" + userAnswer + ',Depends on question and user answer for give interview question' +
      "Please give us rating for answer and feedback as area of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
    console.log(mockJsonResp)
    const JsonFeedbackResp = JSON.parse(mockJsonResp)
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    })

    if (resp) {
      toast('user answer recorded successfully')
      setUserAnswer('');
      setResults([]);
   
    }
    setResults([]);
    setLoading(false)
    console.log(userAnswer)
  }
  return (
    <div className='flex items-center justify-center flex-col' >
      <div className='flex flex-col bg-black  mt-20 p-5 justify-center items-center bg-secondary rounded-lg'>
        <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,

          }}

        />
      </div>
      <Button variant="outline" className="my-10"
        onClick={saveUserAnswer}
      >
        {isRecording ? (<h2 className='text-red-700 flex gap-2'>
          <Mic />Stop Recording....
        </h2>) : "Recorded Answer"}

      </Button>
     
    </div>

  )
}

export default RecordAnswerSection