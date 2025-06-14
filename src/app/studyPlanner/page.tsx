'use client';
import React from "react";
import { useState } from "react";
export default function StudyPlanner() {
    const[activeForm,setActiveForm]=useState<'form1' | 'form2' | null>(null);
    //const [subject,setsubject]=useState<string []>
    //const [selected,setSelected]= useState('')
    //const missing=useState<string[]>
    //const upcoming=useState<string[]>
    //const done=useState<string[]>

    

    const topics=[{title: 'LA',deadline: '2023-10-30',status: 'Pending',reminder: 'Yes'},
                 {title: 'Maths',deadline: '2023-11-01',status: 'Completed',reminder: 'Yes'},
                  {title: 'Physics',deadline: '2023-11-05',status: 'Pending',reminder: 'Yes'},
                  {title: 'LA',deadline: '2023-10-30',status: 'Pending',reminder: 'Yes'},
                 {title: 'Maths',deadline: '2023-11-01',status: 'Completed',reminder: 'Yes'},
                  {title: 'Physics',deadline: '2023-11-05',status: 'Pending',reminder: 'Yes'},
                  {title: 'LA',deadline: '2023-10-30',status: 'Pending',reminder: 'Yes'},
                 {title: 'Maths',deadline: '2023-11-01',status: 'Completed',reminder: 'Yes'},
                  {title: 'Physics',deadline: '2023-11-05',status: 'Pending',reminder: 'Yes'}
    ];
    const subject=[{id:1,title: 'Maths'},{id:2,title: 'Database'},{id:3,title: 'English'}]
     
      

    const Card = ({title}: {title: string; }) => (
         <div className="cusrsor-pointer ml-4  mr-2 mt-3 rounded-md text-center justify-center text-black text-bold bg-blue-300 md:h-[2rem] w-[8rem] ">
             {title}
         </div>
      );
      const DCard = ({ title}: {title:string,}) => (
        <div className="flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-md text-center md:w-[15rem] md:h-[12rem] md:ml-2 md:mt-2 md:mr-2">
          <p className="bg-blue-950 w-[9rem] rounded-md h-[2rem] mx-auto mt-2">{title}</p>
          {title === 'Missing' && (
            <div>
              {topics.map((topic, index) => {
                //const nowDate = new Date();
                //const deadline = new Date(topic.deadline);
      
                // Only render if status is 'Pending'
                return topic.status === 'Pending' ? (
                  <p key={index} >{topic.title}</p>
                ) : null;
              })}
            </div>
          )}
          {title === 'in_progress' && (
            <div>
              {topics.map((topic, index) => {
                //const nowDate = new Date();
                //const deadline = new Date(topic.deadline);
      
                // Only render if status is 'Pending'
                return topic.status === 'In progress' ? (
                  <p key={index} >{topic.title}</p>
                ) : null;
              })}
            </div>
          )}
          {title === 'Completed' && (
            <div>
              {topics.map((topic, index) => {
                //const nowDate = new Date();
                //const deadline = new Date(topic.deadline);
      
                // Only render if status is 'Pending'
                return topic.status === 'Completed' ? (
                  <p key={index} >{topic.title}</p>
                ) : null;
              })}
            </div>
          )}
        </div>
      );
    
return(
 
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col sm:flex-col md:flex-row items-center justify-end px-4 max-w-full">
  
<div className="min-h-96 w-full   ml-3 lg:w-1/2 mt-0 md: h-[35rem] max-w-4xl bg-yellow-100 flex flex-col rounded-md shadow-lg">
    <h1 className="text-4xl font-bold text-center text-gray-800 p-8 font-cursive">
      StudyPlanner
    </h1>
    <div className="flex justify-center items-center space-x-4 mt-2 mb-2">
        <button className="w-[10rem] h-[3rem] bg-amber-600 rounded-md " onClick={() =>setActiveForm('form1')} >Add Subject</button>
        <button className="w-[10rem] h-[3rem] bg-amber-600 rounded-md" onClick={() =>setActiveForm('form2')}>Add Topic</button>
    </div>
    <div className=" bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-md mx-auto sm:w-sm md:w-sm ">
    {activeForm === 'form1' && (
        <form action="">
            <div className="flex flex-col p-1.5 items-center justify-center  h-[20rem] space-y-4">
                <input
                 placeholder=" Subject Name" 
                 className="bg-blue-300 text-black sm:w-[18rem]  md: w-[18rem] h-[3rem] rounded-md"
                 type="text"
                 required
                 />
                 <input
                 placeholder=" Subject Description (optional)" 
                 className="bg-blue-300 text-black md: w-[18rem] h-[5rem] rounded-md"
                 type="text" />
                 <button className="bg-blue-600 md:w-[9rem] h-[3rem] rounded-md hover:bg-red-500">
                    Add Subject</button>
                  
            </div>
        </form>
    )}
    {activeForm === 'form2' && (
         <form action="">
         <div className="flex flex-col p-1.5 items-center justify-center   h-[20rem] space-y-4">
             <input
              placeholder=" Title" 
              className="bg-blue-300 text-black md: w-[18rem] h-[3rem] rounded-md"
              type="text" />
                <select className="bg-blue-300 text-black md: w-[18rem] h-[3rem] rounded-md" name="Subject" id="Subject">
                    
                    {subject.map((sub, index) => (
                        <option key={index} value={sub.title}>{sub.title}</option>
                    ))}
                    </select>
              <input
              placeholder="DeadLine" 
              className="bg-blue-300 text-black md: w-[18rem] h-[3rem] rounded-md"
              type="Date" />
              <button className="bg-blue-600 sm:w-[12rem] md:w-[9rem] h-[3rem] rounded-md hover:bg-red-500">
                 Add Topic</button>
               
         </div>
     </form>
    )}
    </div>
  </div>
  <div className="min-h-96 w-full  sm:w-3/4 mt-0 md : h-[35rem] ml-3.5 mb-2 lg:w-1/2 max-w-4xl bg-yellow-100 flex flex-col rounded-md shadow-lg">
    
    <div className="flex flex-row">
     <div className=" overflow-y-auto h-85 flex flex-col  mt-3 ml-3  rounded-md md: w-[10rem] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {subject.map((sub, index) => (
        <Card key={index} title={sub.title} />
      ))}
        
       
     </div>
     <div className="flex flex-col"> 
     <h1 className="text-4xl font-bold text-center text-gray-800 p-8 font-cursive">
      StudyPlanner
    </h1>
     <div className="flex  ml-5 overflow-y-auto bg-white rounded-md shadow-blue-950 md: w-[27rem] h-[15rem]">
        <table className="flex flex-col text-black">
            
            <thead>
            <tr className="flex p-1 ">
                <th className="ml-2 border-2 md: w-[6rem] ">Topic</th>
                <th className="ml-2 border-2 md: w-[6rem]">Deadline</th>
                <th className="ml-2 border-2 md: w-[6rem] ">Status</th>
                <th className="ml-2 border-2 md: w-[6rem]">Reminder</th>
            </tr>
            </thead>
            <tbody>
            {topics.map((topic, index) => (
              <tr key={index} className="flex p-1">
                <td className="ml-2   md: w-[6rem] ">{topic.title}</td>
                <td className="ml-2   md: w-[6rem]">{topic.deadline}</td>
                <td className="ml-2   md: w-[6rem] ">
                  <select name="status" id="status">
                    <option value="pendign">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="flex ml-2  mx-auto justify-center md: w-[6rem]">
                  <input type="checkbox" />
                </td>
            </tr>
            ))}
            </tbody>
             
        </table>
     </div>
     </div>
     </div>
     <div className="flex">
        <DCard title="Missing" />
        <DCard title="Upcoming" />
        <DCard title="Done" />
     </div>
  </div>
</div>
 

    );
}