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
        <div className=" flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
            <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold  text-white p-4 sm:p-6 md:p-8 font-cursive">
                Collaborative Study
                <p className="text-xl">Make your Study Simple</p>
                </h1>
                <h2 className="p-0 ml-7 mt-0"></h2>
            </div>
            <div className="flex">
                 <div className="flex flex-col  bg-blue-300 md:ml-2.5 mx-auto rounded-md w-[90%]  lg:w-[23%] h-auto ">
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
                    </div>
                 </div>
            </div>
            
        </div>
    );

}