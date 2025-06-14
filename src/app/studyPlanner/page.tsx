import React from "react";
export default function StudyPlanner() {
    return(
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col sm:flex-col md:flex-row items-center justify-end px-4 max-w-full">
<div className="min-h-96 w-full sm:w-3/4 ml-3 lg:w-1/2 mt-1 max-w-4xl bg-yellow-100 flex flex-col">
    <h1 className="text-4xl font-bold text-center text-gray-800 p-8 font-cursive">
       Add subject
    </h1>
    <div className="">
        <form action="">
            <div className="flex flex-col p-1.5 items-center justify-center space-y-4 border-red-100 bg-blue-400">
                <input
                 placeholder="Subject Name" 
                 className="bg-amber-400"
                 type="text" />
                 <input
                 placeholder="Subject Name" 
                 className="bg-amber-400"
                 type="text" />
                 <input
                 placeholder="Subject Name" 
                 className="bg-amber-400"
                 type="text" />
            </div>
        </form>
    </div>
  </div>
  <div className="min-h-96 w-full  sm:w-3/4 mt-3.5 md : ml-3.5 mb-2 lg:w-1/2 max-w-4xl bg-yellow-100 flex flex-col">
    <h1 className="text-4xl font-bold text-center text-gray-800 p-8 font-cursive">
      StudyPlanner
    </h1>
  </div>
</div>

    );
}