
'use client';
import React from 'react';
import Modal from '@/components/Modal'; 
import { useState } from 'react';
export default function GroupStudyPage() {
    const [createGroup, setCreateGroup] = useState(false);
    const [joinGroup, setJoinGroup] = useState(false);
    const [activePannel,setActivePlanner] = useState('');
     

    const GroupCard = ({
        groupId,
        title,
        totalMembers,
        totalTopics
    }: {
        groupId: number;
        title : string;
        totalMembers: number;
        totalTopics: number;
    }) => (
        <div className="cursor-pointer flex flex-col  bg-blue-900 w-[95%] lg:w-[90%]  h-[7rem] rounded-md mx-auto mb-2 p-4" key={groupId}>
            <div>
              <h3 className="group-title">{title}</h3>
            </div>
            <p className="group-info">Members: {totalMembers}</p>
            <p className="group-info">Topics: {totalTopics}</p>
        </div>
    );

    return (
        <div className=" flex flex-col md:mx-auto min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
            <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold  text-white p-4 sm:p-6 md:p-8 font-cursive">
                Collaborative Study
                <p className="text-xl">Make your Study Simple</p>
                </h1>
                <h2 className="p-0 ml-7 mt-0"></h2>
            </div>
            <div className="flex  flex-col lg:flex-row w-full ">
                 <div className="flex flex-col  bg-blue-950 lg:ml-5 mx-auto rounded-md w-[90%]  lg:w-[23%] h-auto ">
                    <div className="flex  text-2xl justify-center ">
                       <h1 className=" text-white items-center">MY Study Group</h1>
                    </div>
                    <div className="flex justify-center p-4 ">
                        <button onClick={() => setCreateGroup(true)} className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 w-[50%] h-[3rem] rounded-md">+ Create</button>
                        <button onClick={() => setJoinGroup(true)} className="cursor-pointer ml-2  bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 w-[50%] h-[3rem] rounded-md">Join</button>
                    </div>
                    <Modal isOpen={createGroup} onClose={() => setCreateGroup(false)} title="Create Group">
                        <div className='flex flex-col p-4 text-black'>
                            <div className='flex flex-row mb-2 mx-auto'>
                               <h1 className=''>Create New Study Group</h1>
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="" className=''>Group Name (Required)</label>
                                <input 
                                 placeholder='e.g Advance Math Study Group'
                                 type="text" 
                                 className='flex border bg-black-100 rounded-md p-2 mt-1 w-full text-black'
                                />
                            </div>
                            <div className='flex ml-auto mr-3'>
                                <button onClick={() => setCreateGroup(false)} className='cursor-pointer bg-white text-sm h-10 w-[7rem] rounded-md'>Cancel</button>
                                <button className='cursor-pointer text-white text-sm bg-blue-600 hover:bg-blue-700 h-10 w-[7rem] rounded-md'>Create Group</button>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={joinGroup} onClose={() => setJoinGroup(false)} title="Join Group">
                    <div className='flex flex-col p-4 text-black'>
                            <div className='flex flex-row mb-2 mx-auto'>
                               <h1 className=''>Join Study Group</h1>
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="" className=''>Invite Code</label>
                                <input 
                                 placeholder='Enter your invite code'
                                 type="text" 
                                 className='flex border text-sm font-mono bg-black-100 rounded-md p-2 mt-1 w-full text-black text-center'
                                />
                            </div>
                            <div className='flex ml-auto mr-3'>
                                <button onClick={() => setJoinGroup(false)} className='cursor-pointer bg-white text-sm h-10 w-[7rem] rounded-md'>Cancel</button>
                                <button className='cursor-pointer text-white text-sm bg-green-600 hover:bg-green-700 h-10 w-[7rem] rounded-md'>Join Group</button>
                            </div>
                        </div>
                    </Modal>
                     
                    <div className="flex flex-col  ">  
                        <GroupCard groupId={1} title="Cricket" totalMembers={5} totalTopics={3}/>
                        <GroupCard groupId={2} title="Study" totalMembers={5} totalTopics={4}/>
                         
                    </div>
                 </div>
                 <div className="lg:w-[70%] w-[90%] mx-auto"> {/* Start from righ compnent  */}
                    <div className="flex flex-col sm:mt-3 md:mt-3 lg:mt-0 mt-3  mb-3  bg-blue-950 w-[100%]  rounded-md">  {/*  compnonent 1 Group detail with code */ }
                    <div className="flex flex-col ml-3">
                        <div className="flex flex-row my-3  mb-0">
                            <div className="flex text-2xl ">
                            <h1 className=" text-white items-center ">MY Study Group</h1>
                            </div>
                            <div className="bg-blue-800 ml-auto mr-2 text-white p-2 rounded">Admin</div>
                        </div>
                        <div className="flex items-center text-sm text-white ">
                            <span className="text-sm font-normal ml-1">Code:12345</span>
                        </div>


                    </div>
                    </div>
                    <div className="flex flex-row sm:mt-3 md:mt-3 lg:mt-0 mb-3 mt-3 h-[8rem] bg-blue-950 w-[100%] lg:h-[8rem] rounded-md">  {/*  compnonent 1 Group detail with code */ }
                      <div className="flex h-[50%] w-[100%] my-auto justify-center lg:justify-start">
                        <button  onClick={() => setActivePlanner('StudyPlanner')} className="cursor-pointer outline outline-black/5 dark:bg-slate-800 dark:shadow-none ml-3 w-[20%] lg:w-[15%] rounded-xl  dark:-outline-offset-1 dark:outline-white/10">Study Planner</button>
                        <button  onClick={() => setActivePlanner('GroupTask')} className="cursor-pointer outline outline-black/5 dark:bg-slate-800 dark:shadow-none ml-3 w-[20%] lg:w-[15%] rounded-xl  dark:-outline-offset-1 dark:outline-white/10">Group Task</button>
                        <div onClick={() => setActivePlanner('GroupChat')} className="cursor-pointer  ml-3 flex w-max-sm items-center gap-x-1 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                            <img className="size-12 shrink-0" src="/chatlogo.jpeg" alt="ChitChat Logo" />
                            <div>
                                <div className="text-xl font-medium text-black dark:text-white">GroupChat</div>
                                <p className="text-gray-500 dark:text-gray-400">Message to Group</p>
                            </div>
                        </div>
                      </div>
                    </div>

                    {activePannel === 'StudyPlanner' && (
                        <div className='w-full h-[10rem] bg-amber-600'>
                         <h1>Study Planner</h1>
                       </div>
                    )}


                    {activePannel === 'GroupTask' && (
                        <div className='w-full h-[10rem] bg-green-600'>
                         <h1>Group Task</h1>
                       </div>
                    )}

                    {activePannel === 'GroupChat' && (
                        <div className='w-full h-[10rem] bg-blue-600'>
                         <h1>Group Chat</h1>
                       </div>
                    )}
                    
                 </div>
            </div>
            
        </div>
    );

}