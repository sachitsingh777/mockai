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

const AddNewMock = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition,setJobPosition]=useState()
    const [jobDescription,setjobDescription]=useState()
    const [jobExperience,setjobExperience]=useState()
   const onSubmit=(e)=>{
    e.preventDefault()
    console.log(jobPosition,jobDescription,jobExperience)
   }
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary text-center
        hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                <h2 className="font-bold text-lg" onClick={() => setOpenDialog(true)}>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>

                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="txt-2xl">Tell us more about your job interviewing </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                 <div>
                           
                            <h2>Add Details about your job position/role ,job description and years of experience </h2>
                             <div className='mt-7 my-2'>
                                <label >Job Role/Job Position</label>
                                <Input placeholder="Ex. Full Stack Developer"
                                onChange={(e)=>setJobPosition(e.target.value)}
                                />
                             </div>
                             <div className=' my-3'>
                                <label >Job Description/Tech Stack (In Short)</label>
                                <Textarea placeholder="Ex. React,Angular,Node.js MySql "
                                  type="text"
                                   required
                                   onChange={(e)=>setjobDescription(e.target.value)}
                                   />
                             </div>
                             <div className='my-3'>
                                <label >Year of Experience</label>
                                <Input placeholder="ex. 2"
                                 type="numbr"
                                  max="30"
                                   required
                                   onChange={(e)=>setjobExperience(e.target.value)}
                                   />
                             </div>
                          </div>
                           <div className='flex gap-5 justify-end'>
                             <Button variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                            <Button type="submit">Start Interview</Button>
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