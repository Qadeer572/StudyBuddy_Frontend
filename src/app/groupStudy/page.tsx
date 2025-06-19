'use client';
import React, { useEffect, useCallback } from 'react';
import Modal from '@/components/Modal'; 
import { useState } from 'react';
import { Book, User, PlusCircle ,Plus } from 'lucide-react';

// Example usage of imported icons
 

 


export default function GroupStudyPage() {
    const [createGroup, setCreateGroup] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [joinGroup, setJoinGroup] = useState(false);
    const [inviteCode, setInviteCode] = useState('');
    const [activePanel, setActivePanel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const API_BASE = 'https://studybuddys-454c3f01f785.herokuapp.com/groupStudy/';

    type Group = {
        id: number,
        name: string,
        invite_code: string,
        created_by: string,
        created_at: Date,
    }
     
    const [groups, setGroups] = useState<Group[]>([]); 
    const [activeCard, setActiveCard] = useState<number | null>(null);

    // Load groups
    const loadGroups = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${API_BASE}getGroups/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                credentials: 'include'
            });

            const data = await res.json();
            console.log("API Response (getGroups):", data); // Debug log

            if (res.ok) {
                // Ensure data.data is an array, default to [] if not
                const groupsData = Array.isArray(data.data) ? data.data : [];
                setGroups(groupsData);
            } else {
                console.error("API Error:", data.message || "Unknown error");
                setGroups([]); // Reset to empty array on error
                alert("Failed to load the Groups of this user");
            }
        } catch (error) {
            console.error("Error loading groups:", error);
            setGroups([]); // Reset to empty array on error
            alert("An error occurred while loading groups");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch groups on mount
    useEffect(() => {
        loadGroups();
    }, [loadGroups]);

    // Set activeCard when groups are loaded
    useEffect(() => {
        if (groups.length > 0 && activeCard === null) {
            setActiveCard(groups[0].id);
        }
    }, [groups, activeCard]);

    // Create a new group
    const groupCreation = async () => {
        if (!groupName.trim()) {
            alert("Group name is required");
            return;
        }
        try {
            setIsLoading(true);
            const res = await fetch(`${API_BASE}createGroup/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ name: groupName }),
                credentials: 'include'
            });
            const data = await res.json();
            console.log("API Response (createGroup):", data); // Debug log
            if (res.ok) {
                setCreateGroup(false);
                setGroupName('');
                await loadGroups(); // Refresh group list
            } else {
                alert(data.message || "Failed to create group");
            }
        } catch (error) {
            console.error("Error creating group:", error);
            alert("An error occurred while creating the group");
        } finally {
            setIsLoading(false);
        }
    };

    // Join a group
    const joinGroupAction = async () => {
        if (!inviteCode.trim()) {
            alert("Invite code is required");
            return;
        }
        try {
            setIsLoading(true);
            const res = await fetch(`${API_BASE}joinGroup/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ invite_code: inviteCode }),
                credentials: 'include'
            });
            const data = await res.json();
            console.log("API Response (joinGroup):", data); // Debug log
            if (data.status) {
                setJoinGroup(false);
                setInviteCode('');
                await loadGroups(); // Refresh group list
            } else {
                alert(data.message || "Failed to join group");
            }
        } catch (error) {
            console.error("Error joining group:", error);
            alert(error)
            alert("An error occurred while joining the group");
        } finally {
            setIsLoading(false);
        }
    };

    const activeCardDetail = () => {
        // Safeguard: Check if groups is an array
        if (!Array.isArray(groups)) {
            console.error("groups is not an array:", groups);
            return null;
        }
        const group = groups.find(group => group.id === activeCard);
        console.log("Active Card ID:", group);
        if (group) {
            return (
                <div className="flex flex-col ml-3">
                    <div className="flex flex-row my-3 mb-0">
                        <div className="flex text-2xl">
                            <h1 className="text-white items-center">{group.name}</h1>
                        </div>
                        <div className="bg-blue-800 ml-auto mr-2 text-white p-2 rounded">Admin</div>
                    </div>
                    <div className="flex items-center text-sm text-white">
                        <span className="text-sm font-normal ml-1">Code: {group.invite_code}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    const GroupCard = ({
        groupId,
        title,
        totalMembers,
        totalTopics
    }: {
        groupId: number;
        title: string;
        totalMembers: number;
        totalTopics: number;
    }) => (
        <div 
            onClick={() => setActiveCard(groupId)} 
            className="cursor-pointer flex flex-col outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 w-[95%] lg:w-[90%] h-[7rem] rounded-md mx-auto mb-2 p-4" 
            key={groupId}
        >
            <div>
                <h3 className="group-title">{title}</h3>
            </div>
            <p className="group-info">Members: {totalMembers}</p>
            <p className="group-info">Topics: {totalTopics}</p>
        </div>
    );

    return (
        <div className="flex flex-col md:mx-auto min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
            <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white p-4 sm:p-6 md:p-8 font-cursive">
                    Collaborative Study
                    <p className="text-xl">Make your Study Simple</p>
                </h1>
                <h2 className="p-0 ml-7 mt-0"></h2>
            </div>
            <div className="flex flex-col lg:flex-row w-full">
                <div className="flex flex-col bg-blue-950 lg:ml-5 mx-auto rounded-md w-[90%] lg:w-[23%] h-auto">
                    <div className="flex text-2xl justify-center">
                        <h1 className="text-white items-center">MY Study Group</h1>
                    </div>
                    <div className="flex justify-center p-4">
                        <button
                        onClick={() => setCreateGroup(true)}
                        className={`flex items-center justify-center gap-2 w-[50%] h-[3rem] rounded-md text-white font-medium transition
                                    ${isLoading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
                                    }`}
                        disabled={isLoading}
                        >
                        <PlusCircle className="w-5 h-5" />
                        Create
                        </button>
                        

                        <button
                        onClick={() => setJoinGroup(true)}
                        className={`flex items-center justify-center gap-2 ml-2 w-[50%] h-[3rem] rounded-md text-white font-medium transition 
                                    ${isLoading 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
                                    }`}
                        disabled={isLoading}
                        >
                        <User className="w-5 h-5" />
                        Join
                        </button>

                    </div>
                    <Modal isOpen={createGroup} onClose={() => { setCreateGroup(false); setGroupName(''); }} title="Create Group">
                        <div className='flex flex-col p-4 text-black'>
                            <div className='flex flex-row mb-2 mx-auto'>
                                <h1>Create New Study Group</h1>
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="groupName" className=''>Group Name (Required)</label>
                                <input 
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder='e.g Advance Math Study Group'
                                    type="text" 
                                    id="groupName"
                                    className='flex border bg-black-100 rounded-md p-2 mt-1 w-full text-black'
                                    disabled={isLoading}
                                />
                            </div>
                            <div className='flex ml-auto mr-3'>
                                <button 
                                    onClick={() => { setCreateGroup(false); setGroupName(''); }} 
                                    className='cursor-pointer bg-white text-sm h-10 w-[7rem] rounded-md'
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={groupCreation}
                                    className='cursor-pointer text-white text-sm bg-blue-600 hover:bg-blue-700 h-10 w-[7rem] rounded-md'
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating...' : 'Create Group'}
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <Modal isOpen={joinGroup} onClose={() => { setJoinGroup(false); setInviteCode(''); }} title="Join Group">
                        <div className='flex flex-col p-4 text-black'>
                            <div className='flex flex-row mb-2 mx-auto'>
                                <h1>Join Study Group</h1>
                            </div>
                            <div className='flex flex-col mb-2'>
                                <label htmlFor="inviteCode" className=''>Invite Code</label>
                                <input 
                                    value={inviteCode}
                                    onChange={(e) => setInviteCode(e.target.value)}
                                    placeholder='Enter your invite code'
                                    type="text" 
                                    id="inviteCode"
                                    className='flex border text-sm font-mono bg-black-100 rounded-md p-2 mt-1 w-full text-black text-center'
                                    disabled={isLoading}
                                />
                            </div>
                            <div className='flex ml-auto mr-3'>
                                <button 
                                    onClick={() => { setJoinGroup(false); setInviteCode(''); }} 
                                    className='cursor-pointer bg-white text-sm h-10 w-[7rem] rounded-md'
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={joinGroupAction}
                                    className='cursor-pointer text-white text-sm bg-green-600 hover:bg-green-700 h-10 w-[7rem] rounded-md'
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Joining...' : 'Join Group'}
                                </button>
                            </div>
                        </div>
                    </Modal>
                     
                    <div className="flex flex-col">  
                        {isLoading ? (
                            <p className="text-white text-center">Loading groups...</p>
                        ) : Array.isArray(groups) && groups.length > 0 ? (
                            groups.map((group) => (
                                <GroupCard 
                                    key={group.id}
                                    groupId={group.id}
                                    title={group.name}
                                    totalMembers={5}
                                    totalTopics={3}
                                />
                            ))
                        ) : (
                            <p className="text-white text-center">No groups found</p>
                        )}
                    </div>
                </div>
                <div className="lg:w-[70%] w-[90%] mx-auto">
                    <div className="flex flex-col sm:mt-3 md:mt-3 lg:mt-0 mt-3 mb-3 bg-blue-950 w-[100%] rounded-md">
                        {isLoading ? (
                            <p className="text-white text-center">Loading group details...</p>
                        ) : activeCardDetail()}
                    </div>
                    <div className="flex flex-row sm:mt-3 md:mt-3 lg:mt-0 mb-3 mt-3 h-[8rem] bg-blue-950 w-[100%] lg:h-[8rem] rounded-md">
                        <div className="flex h-[50%] w-[100%] my-auto justify-center lg:justify-start">
                            <button 
                                onClick={() => setActivePanel('StudyPlanner')} 
                                className="cursor-pointer outline outline-black/5 dark:bg-slate-800 dark:shadow-none ml-3 w-[20%] lg:w-[15%] rounded-xl dark:-outline-offset-1 dark:outline-white/10"
                                disabled={isLoading}
                            >
                                Study Planner
                            </button>
                            <button 
                                onClick={() => setActivePanel('GroupTask')} 
                                className="cursor-pointer outline outline-black/5 dark:bg-slate-800 dark:shadow-none ml-3 w-[20%] lg:w-[15%] rounded-xl dark:-outline-offset-1 dark:outline-white/10"
                                disabled={isLoading}
                            >
                                Group Task
                            </button>
                            <div 
                                onClick={() => setActivePanel('GroupChat')} 
                                className="cursor-pointer ml-3 flex w-max-sm items-center gap-x-1 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                            >
                                <img className="size-12 shrink-0" src="/chatlogo.jpeg" alt="ChitChat Logo" />
                                <div>
                                    <div className="text-xl font-medium text-black dark:text-white">GroupChat</div>
                                    <p className="text-gray-500 dark:text-gray-400">Message to Group</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {activePanel === 'StudyPlanner' && (
                        <div className=' flex flex-col h-auto bg-blue-950'>
                             <div className=' flex flex-col w-full h-[10rem]  rounded-md'>
                              <div className='flex ml-3 mt-3'>
                                 <Book className="icon ml-3" />
                                 <h1 className='text-xl ml-3'>Shared Study Planner</h1>
                              </div>
                              <div className='flex mx-auto h-[45%] justify-center mt-3 outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 rounded-xl w-[95%] '>
                                   <div className='flex h-[80%] text-white justify-center item-center mx-auto my-auto w-[95%]'>
                                        <input type="text" className='bg-gray-700 w-[75%] my-auto h-[75%] ml-3 rounded-xl' placeholder=' e.g Calculus - Integration By Parts'/>
                                        <input type="Date" className='bg-gray-700 h-[75%] my-auto ml-3 rounded-xl'/>
                                        <button
                                            className={`flex items-center justify-center gap-2 w-[5%] h-[75%]  my-auto ml-3 rounded-xl text-white font-medium transition
                                                        ${isLoading 
                                                            ? 'bg-gray-400 cursor-not-allowed' 
                                                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
                                                        }`}
                                            disabled={isLoading}
                                            >
                                            <Plus className="w-5 h-5" />
                                            
                                        </button>
                                   </div>
                              </div>
                        </div>
                        </div>
                       
                    )}

                    {activePanel === 'GroupTask' && (
                        <div className='w-full h-[10rem] bg-green-600'>
                            <h1>Group Task</h1>
                        </div>
                    )}

                    {activePanel === 'GroupChat' && (
                        <div className='w-full h-[10rem] bg-blue-600'>
                            <h1>Group Chat</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}