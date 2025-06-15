'use client';
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudyPlanner() {
    const [activeForm, setActiveForm] = useState<'form1' | 'form2' | null>('form1');
    const router = useRouter();
    const topics = [
        { title: 'LA', deadline: '2023-10-30', status: 'Pending', reminder: 'Yes' },
        { title: 'Maths', deadline: '2023-11-01', status: 'Completed', reminder: 'Yes' },
        { title: 'Physics', deadline: '2023-11-05', status: 'Pending', reminder: 'Yes' },
        { title: 'LA', deadline: '2023-10-30', status: 'Pending', reminder: 'Yes' },
        { title: 'Maths', deadline: '2023-11-01', status: 'Completed', reminder: 'Yes' },
        { title: 'Physics', deadline: '2023-11-05', status: 'Pending', reminder: 'Yes' },
        { title: 'LA', deadline: '2023-10-30', status: 'Pending', reminder: 'Yes' },
        { title: 'Maths', deadline: '2023-11-01', status: 'Completed', reminder: 'Yes' },
        { title: 'Physics', deadline: '2023-11-05', status: 'Pending', reminder: 'Yes' },
        { title: 'LA', deadline: '2023-10-30', status: 'Pending', reminder: 'Yes' },
        { title: 'Maths', deadline: '2023-11-01', status: 'Completed', reminder: 'Yes' },
        { title: 'Physics', deadline: '2023-11-05', status: 'Pending', reminder: 'Yes' },
        { title: 'LA', deadline: '2023-10-30', status: 'Pending', reminder: 'Yes' },
        { title: 'Maths', deadline: '2023-11-01', status: 'Completed', reminder: 'Yes' },
        { title: 'Physics', deadline: '2023-11-05', status: 'Pending', reminder: 'Yes' },
        { title: 'LA', deadline: '2023-10-30', status: 'Pending', reminder: 'Yes' },
        { title: 'Maths', deadline: '2023-11-01', status: 'Completed', reminder: 'Yes' },
        { title: 'Physics', deadline: '2023-11-05', status: 'Pending', reminder: 'Yes' }
    ];

    type Subject = {
        id: number;
        title: string;
    };

    const subjects: Subject[]=[];


    const Card = ({ title }: { title: string }) => (
        <div className="cursor-pointer mx-auto mt-3 rounded-md text-center justify-center text-black font-bold bg-blue-300 h-[2rem] w-[15rem] md:h-[2rem] md:w-[8rem] md:ml-4 md:mr-2">
            {title}
        </div>
    );

    const DCard = ({ title }: { title: string }) => (
        <div className="flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-md text-center w-[10rem] h-[10rem] ml-2 mt-3 mb-1 md:w-[15rem] md:h-[12rem] md:ml-2 md:mt-2 md:mr-2">
            {title === 'Done' && <p className="bg-green-400 w-[7rem] rounded-md h-[2rem] mx-auto mt-2 text-sm">{title}</p>}
            {title === 'Missing' && <p className="bg-red-600 w-[7rem] rounded-md h-[2rem] mx-auto mt-2 text-sm">{title}</p>}
            {title === 'Upcoming' && <p className="bg-blue-900 w-[7rem] rounded-md h-[2rem] mx-auto mt-2 text-sm">{title}</p>}
            <div className="overflow-y-auto h-[6rem] text-white text-xs">
                {title === 'Missing' && topics.map((topic, index) => (
                    topic.status === 'Pending' ? <p key={index}>{topic.title}</p> : null
                ))}
                {title === 'Upcoming' && topics.map((topic, index) => (
                    topic.status === 'In progress' ? <p key={index}>{topic.title}</p> : null
                ))}
                {title === 'Done' && topics.map((topic, index) => (
                    topic.status === 'Completed' ? <p key={index}>{topic.title}</p> : null
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col items-center justify-end px-2 sm:px-4 md:px-4 md:flex-row md:justify-end  md:items-center">
            <div className="min-h-96 w-full mt-0 mb-4 max-w-4xl bg-blue-950 flex flex-col rounded-md shadow-lg md:min-h-[35rem] md:w-1/2  md:mt-4 md:ml-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white p-4 sm:p-6 md:p-8 font-cursive">
                    StudyPlanner
                </h1>
                <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-2 md:space-x-4 mt-2 mb-2">
                    <button 
                        className="w-[10rem]  ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20 sm:text-base md:w-[10rem] md:h-[3rem]" 
                        onClick={() => setActiveForm('form1')}
                    >
                        Add Subject
                    </button>
                    <button 
                        className="w-[10rem]  ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20 sm:text-base md:w-[10rem] md:h-[3rem]" 
                        onClick={() => setActiveForm('form2')}
                    >
                        Add Topic
                    </button>
                </div>
                <div className="bg-gradient-to-br mb-1 from-slate-900 via-slate-800 to-blue-900 rounded-md mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:w-sm">
                    {activeForm === 'form1' && (
                        <form>
                            <div className="flex flex-col p-1.5 items-center justify-center h-[18rem] sm:h-[20rem] space-y-4">
                                <input
                                    placeholder="Subject Name"
                                    className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[2.5rem] md:w-[18rem] md:h-[3rem] rounded-md text-sm"
                                    type="text"
                                    required
                                />
                                <input
                                    placeholder="Subject Description (optional)"
                                    className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[4rem] md:w-[18rem] md:h-[5rem] rounded-md text-sm"
                                    type="text"
                                />
                                <button className="w-[10rem]  ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20 md:w-[9rem] md:h-[3rem]">
                                    Add Subject
                                </button>
                            </div>
                        </form>
                        
                    )}
                    {activeForm === 'form2' && (
                        <form>
                            <div className="flex flex-col p-1.5 items-center justify-center h-[18rem] sm:h-[20rem] space-y-4">
                                <input
                                    placeholder="Title"
                                    className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[2.5rem] md:w-[18rem] md:h-[3rem] rounded-md text-sm"
                                    type="text"
                                />
                                <select 
                                    className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[2.5rem] md:w-[18rem] md:h-[3rem] rounded-md text-sm" 
                                    name="Subject" 
                                    id="Subject"
                                >
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.title}>{sub.title}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder="Deadline"
                                    className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[2.5rem] md:w-[18rem] md:h-[3rem] rounded-md text-sm"
                                    type="date"
                                />
                                <button className="w-[10rem]  ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20 md:w-[9rem] md:h-[3rem]">
                                    Add Topic
                                </button>
                            </div>
                        </form>
                    )}
                    
                </div>
                <div className="">
                      <button className="w-[10rem]  ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20" type="submit" onClick={() => router.push('./Home')}>  ← Home</button>
                    </div>
            </div>
            <div className="flex flex-col min-h-96 w-full max-w-4xl mt-3 mb-2  bg-blue-950 rounded-md  shadow-lg sm:w-3/4 md:h-[35rem] md:ml-3.5 md:w-1/2">
                <div className="flex flex-col md:flex-row">
                    <div className="overflow-y-auto h-[10rem] sm:h-[12rem] flex flex-col mt-3 ml-2 sm:ml-10 w-full max-w-[18rem] sm:max-w-[25rem] rounded-md   md:w-[10rem] md:h-85 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
                        {subjects.map((sub, index) => (
                            <Card key={index} title={sub.title} />
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white p-4 sm:p-6 md:p-8 font-cursive">
                            StudyPlanner
                        </h1>
                        <div className="overflow-x-auto bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-md shadow-blue-950 mx-2 sm:ml-5 md:w-[27rem] md:h-[15rem]">
                            <table className="w-full text-white text-xs sm:text-sm">
                                <thead>
                                    <tr className="flex p-1">
                                        <th className="ml-2 border-2 flex-1 md:w-[6rem]">Topic</th>
                                        <th className="ml-2 border-2 flex-1 md:w-[6rem]">Deadline</th>
                                        <th className="ml-2 border-2 flex-1 md:w-[6rem]">Status</th>
                                        <th className="ml-2 border-2 flex-1 md:w-[6rem]">Reminder</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topics.map((topic, index) => (
                                        <tr key={index} className="flex p-1">
                                            <td className="ml-2 flex-1 md:w-[6rem]">{topic.title}</td>
                                            <td className="ml-2 flex-1 md:w-[6rem]">{topic.deadline}</td>
                                            <td className="ml-2 flex-1 md:w-[6rem]">
                                                <select name="status" id="status" className="w-full text-xs  sm:text-sm">
                                                    <option value="pending" className="text-black">Not Started</option>
                                                    <option value="in_progress" className="text-black">In Progress</option>
                                                    <option value="completed" className="text-black">Completed</option>
                                                </select>
                                            </td>
                                            <td className="flex ml-2 mx-auto justify-center flex-1 md:w-[6rem]">
                                                <input type="checkbox" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                    <DCard title="Missing" />
                    <DCard title="Upcoming" />
                    <DCard title="Done" />
                </div>
            </div>
        </div>
    );
}