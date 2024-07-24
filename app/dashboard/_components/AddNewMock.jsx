"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/geminiAiModel'
import { Loader2 } from 'lucide-react'
import { MockAI } from '@/utils/schema'
import { v4 as uuidv4 } from "uuid"
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'

const AddNewMock = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobExperience, setJobExperience] = useState("")
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const { user } = useUser()
    const router=useRouter()

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDescription, jobExperience)
        const InputPrompt = `Please generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in JSON format for the following job position. The job title is "${jobPosition}", the description is "${jobDescription}", and the required experience is "${jobExperience}". Format the output as a JSON array, where each object contains a "question" and "answer" field, both as strings`
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        console.log(JSON.parse(MockJsonResp))
        setJsonResponse(MockJsonResp)
        if (MockJsonResp) {
            const resp = await db.insert(MockAI).values({
                mockId: uuidv4(),
                jsonMockResp: jsonResponse,
                jobPosition: jobPosition,
                jobDescription: jobDescription,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY'),
            }).returning({ mockId: MockAI.mockId })
            console.log("Inserted ID:", resp)
            if(resp){
                setOpenDialog(false)
                router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
        } else {
            console.log("Error")
        }

        setLoading(false)
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary text-center hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                <h2 className="font-bold text-lg" onClick={() => setOpenDialog(true)}>+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <div className='font-extrabold'>Add Details about your job position/role, job description, and years of experience</div>
                            <form onSubmit={onSubmit}>
                                <div className='mt-7 my-2'>
                                    <label>Job Role/Job Position</label>
                                    <Input placeholder="Ex. Full Stack Developer" onChange={(e) => setJobPosition(e.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Job Description/Tech Stack (In Short)</label>
                                    <Textarea placeholder="Ex. React, Angular, Node.js MySql" required onChange={(e) => setJobDescription(e.target.value)} />
                                </div>
                                <div className='my-3'>
                                    <label>Year of Experience</label>
                                    <Input placeholder="ex. 2" type="number" max="30" required onChange={(e) => setJobExperience(e.target.value)} />
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className='animate-spin' />'Generating from AI'
                                            </>
                                        ) : "Start Interview"}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewMock
