'use client';
import React from "react";
import { useState } from "react";
export default function StudyPlanner() {
    const[activeForm,setActiveForm]=useState<'form1' | 'form2' | null>(null);
return(

<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col sm:flex-col md:flex-row items-center justify-end px-4 max-w-full">
<div className="min-h-96 w-full sm:w-3/4 ml-3 lg:w-1/2 mt-1 md:h-[35rem] max-w-4xl bg-yellow-100 flex flex-col rounded-md shadow-lg">
    <h1 className="text-4xl font-bold text-center text-gray-800 p-8 font-cursive">
      StudyPlanner
    </h1>
    <div className="flex justify-center items-center space-x-4 mt-2 mb-2">
        <button className="md:w-[10rem] h-[3rem] bg-amber-600 rounded-md " onClick={() =>setActiveForm('form1')} >Add Subject</button>
        <button className="md:w-[10rem] h-[3rem] bg-amber-600 rounded-md" onClick={() =>setActiveForm('form2')}>Add Topic</button>
    </div>
    <div className=" bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-md mx-auto sm: w-sm md:w-sm ">
    {activeForm === 'form1' && (
        <form action="">
            <div className="flex flex-col p-1.5 items-center justify-center  sm:h-[20rem] md:h-[20rem] space-y-4">
                <input
                 placeholder=" Subject Name" 
                 className="bg-blue-300 text-black md: w-[18rem] h-[3rem] rounded-md"
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
         <div className="flex flex-col p-1.5 items-center justify-center  sm:h-[20rem] md:h-[20rem] space-y-4">
             <input
              placeholder=" Title" 
              className="bg-blue-300 text-black md: w-[18rem] h-[3rem] rounded-md"
              type="text" />
                <select className="bg-blue-300 text-black md: w-[18rem] h-[3rem] rounded-md" name="Subject" id="Subject">
                    <option value="Maths">Maths</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    </select>
              <input
              placeholder=" DeadLine" 
              className="bg-blue-300 text-black md: w-[18rem] h-[3rem] rounded-md"
              type="Date" />
              <button className="bg-blue-600 md:w-[9rem] h-[3rem] rounded-md hover:bg-red-500">
                 Add Topic</button>
               
         </div>
     </form>
    )}
    </div>
  </div>
  <div className="min-h-96 w-full  sm:w-3/4 mt-3.5 md : h-[35rem] ml-3.5 mb-2 lg:w-1/2 max-w-4xl bg-yellow-100 flex flex-col rounded-md shadow-lg">
    <h1 className="text-4xl font-bold text-center text-gray-800 p-8 font-cursive">
      StudyPlanner
    </h1>
  </div>
</div>

    );
}