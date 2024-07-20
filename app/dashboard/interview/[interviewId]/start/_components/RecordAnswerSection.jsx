"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/geminiAiModel'
const RecordAnswerSection = ({mockInterviewQuestion,activeQuestionIndex}) => {
    const [userAnswer, setUserAnswer] = useState('')
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(()=>{
             results.map((result)=>setUserAnswer(prev=>prev+result?.transcript))
      },[results])

      const saveUserAnswer=async()=>{
        if(isRecording){
            stopSpeechToText()
            if(userAnswer?.length<10){
                toast('Error while saving your answer ,Please record again')
                return 
            }
            const feedbackPrompt="Question" +
            mockInterviewQuestion[activeQuestionIndex]?.question +
            ", User Answer:"+userAnswer+',Depends on question and user answer for give interview question'+
            "Please give us rating for answer and feedback as area of improvement if any"+
            "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
            const result=await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp= (result.response.text()).replace('```json', '').replace('```', '')
              console.log(mockJsonResp)
            const JsonFeedbackResp=JSON.parse(mockJsonResp)
        }else{
            startSpeechToText()
        }
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
            onCLick={saveUserAnswer}
            >
                {isRecording?(<h2 className='text-red-700 flex gap-2'>
                    <Mic />Stop Recording....
                </h2> ):"Recorded Answer"}
                
                </Button>
                <Button onClick={()=>console.log(userAnswer)}>SHow Answer</Button>
        </div>

    )
}

export default RecordAnswerSection