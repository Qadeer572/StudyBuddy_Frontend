export default function GroupStudyPage() {

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
        <div className="cursor-pointer flex flex-col  bg-blue-900 w-[95%] lg:w-[90%]  h-[7rem] rounded-md mx-auto mb-2" key={groupId}>
            <h3 className="group-title">{title}</h3>
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
                 <div className="flex flex-col  bg-blue-300 lg:ml-2.5 mx-auto rounded-md w-[90%]  lg:w-[23%] h-auto ">
                    <div className="flex  text-2xl justify-center ">
                       <h1 className=" text-black items-center">MY Study Group</h1>
                    </div>
                    <div className="flex justify-center p-4 ">
                        <button className="bg-amber-600 w-[50%] h-[3rem] rounded-md">+ Create</button>
                        <button className="ml-2  bg-amber-300 w-[50%] h-[3rem] rounded-md">Join</button>
                    </div>
                    <div className="flex flex-col  ">  
                        <GroupCard groupId={1} title="Cricket" totalMembers={5} totalTopics={3}/>
                        <GroupCard groupId={2} title="Study" totalMembers={5} totalTopics={4}/>
                        <GroupCard groupId={2} title="Study" totalMembers={5} totalTopics={4}/>
                        <GroupCard groupId={2} title="Study" totalMembers={5} totalTopics={4}/>
                        <GroupCard groupId={2} title="Study" totalMembers={5} totalTopics={4}/>
                    </div>
                 </div>
                 <div className="lg:w-[70%] w-[90%] mx-auto"> {/* Start from righ compnent  */}
                    <div className="flex flex-col sm:mt-3 md:mt-3 lg:mt-0 mt-3  mb-3  bg-blue-300 w-[100%]  rounded-md">  {/*  compnonent 1 Group detail with code */ }
                    <div className="flex flex-col ml-3">
                        <div className="flex flex-row my-3  mb-0">
                            <div className="flex text-2xl ">
                            <h1 className=" text-black items-center ">MY Study Group</h1>
                            </div>
                            <div className="bg-blue-800 ml-auto mr-2 text-white p-2 rounded">Admin</div>
                        </div>
                        <div className="flex items-center text-xl text-black">
                            <span className="text-sm font-normal ml-1">Code:12345</span>
                        </div>


                    </div>
                    </div>
                    <div className="flex flex-row sm:mt-3 md:mt-3 lg:mt-0 mb-3 mt-3 h-[8rem] bg-blue-300 w-[100%] lg:h-[8rem] rounded-md">  {/*  compnonent 1 Group detail with code */ }
                      <div className="flex h-[50%] w-[100%] my-auto justify-center lg:justify-start">
                        <button className="bg-blue-800 ml-3 w-[25%] lg:w-[15%] rounded-md">Study Planner</button>
                        <button className="bg-blue-800 ml-3 w-[25%] lg:w-[15%] rounded-md">Group Task</button>
                        <button className="bg-blue-800 ml-3 w-[25%] lg:w-[15%] rounded-md">Chat</button>
                      </div>
                    </div>

                 </div>
            </div>
            
        </div>
    );

}