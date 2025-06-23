'use client';
import React, { useEffect, useCallback, useState } from 'react';
import Modal from '@/components/Modal';
import { Book, PlusCircle, Plus, UserCheck, CheckCircle } from 'lucide-react';

// Debounce utility
const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<typeof func>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function GroupStudyPage() {
  const [createGroup, setCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [joinGroup, setJoinGroup] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [activePanel, setActivePanel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  type user = {
    id :number,
    username: string
  }
   
  const [users, setUsers] = useState<user[]>([]); // State to hold group users
  const API_BASE = 'https://studybuddys-454c3f01f785.herokuapp.com/groupStudy/';
  //const API_BASE = 'http://127.0.0.1:8000/groupStudy/';

  type Group = {
    id: number;
    name: string;
    invite_code: string;
    created_by: string;
    created_at: Date;
  };

  type Message = {
    id: number;
    content: string;
    sender: string;
    timestamp: Date;
    group_id: number;
  };

  type Topic = {
    id: number;
    topicDiscription: string;
    created_by: string;
    dueDate: Date;
    status: 'Not Started' | 'In Progress' | 'Completed';
    group_id: number;
  };

  type Task = {
    id: number;
    task_name: string;
    assigned_to: string;
    due_date: string;
    complexity: 'Low' | 'Medium' | 'High';
    is_done: boolean;
    group_id: number;
  };

  const [groups, setGroups] = useState<Group[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, task_name: 'Complete calculus homework', assigned_to: 'John Doe', due_date: '2025-06-20', complexity: 'Medium', is_done: false, group_id: 11 },
    { id: 2, task_name: 'Prepare physics presentation', assigned_to: 'Jane Smith', due_date: '2025-06-22', complexity: 'High', is_done: false, group_id: 13 },
  ]);
  const [newTask, setNewTask] = useState({
    description: '',
    assigned_to: '',
    due_date: '',
    complexity: 'Low' as 'Low' | 'Medium' | 'High',
    group_id: null as number | null,
  });
  const [newTopic, setNewTopic] = useState({
    name: '',
    created_at: new Date().toISOString().split('T')[0],
    group_id: null as number | null,
  });

  // Update topic status
  const updateTopicStatus = (topicId: number, newStatus: 'Not Started' | 'In Progress' | 'Completed') => {
    setTopics(topics.map(topic => (topic.id === topicId ? { ...topic, status: newStatus } : topic)));
  };
  
  const getGroupUser = async () => {
    const res= await fetch(`${API_BASE}getGroupUser/`, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ group_id: activeCard }),
      credentials: 'include',
    })

    const data = await res.json();
    
    if(data.status){
      const usersData = Array.isArray(data.data) ? data.data : [];
      setUsers(usersData);
      console.log(usersData)
    }
    else{
      alert("Failed to Fetch Group User");
    }
  }
  const addGroupTask=async () =>{
    const res= await fetch(`${API_BASE}addGroupTask/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        task_name: newTask.description,
        assigned_to: newTask.assigned_to,
        due_date: newTask.due_date,
        complexity: newTask.complexity,
        group_id: activeCard,
      }),
      credentials: 'include',
    })

    const data= await res.json();

    if(data.status){
      //
    }
    else{
      alert(data.message);
    }
  }
  const getGroupTask = async () => {
    try {
      const res = await fetch(`${API_BASE}getGroupTask/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });

      const data = await res.json();
      if (data.status) {
        const tasksData = Array.isArray(data.data.username) ? data.data.username : [];
        console.log('Fetched tasks:', tasksData);
        setTasks(tasksData);
        console.log('Stored Data :')
      } else {
        console.error('API Error:', data.message || 'Unknown error');
        alert('Failed to load the Group Tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('An error occurred while loading tasks');
    }
  }
  // Fetch shared study planner
  const getSharedStudyPlanner = async () => {
    try {
      const res = await fetch(`${API_BASE}getStudyPlanner/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });

      const data = await res.json();
      if (data.status) {
        const topicsData = Array.isArray(data.data) ? data.data : [];
        setTopics(topicsData);
      } else {
        console.error('API Error:', data.message || 'Unknown error');
        alert('Failed to load the Shared Study Planner');
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
      alert('An error occurred while loading topics');
    }
  };

  // Debounced topic fetching
  const debouncedGetSharedStudyPlanner = useCallback(
    debounce(((groupId: number | null) => {
      if (!groupId) return;
      getSharedStudyPlanner();
    }) as (...args: unknown[]) => void, 500),
    []
  );

  // Add new topic
  const addTopic = async () => {
    if (!newTopic.name.trim() || !activeCard) {
      alert('Topic name and a selected group are required');
      return;
    }

    let tempTopicId: number | null = null; // Declare tempTopicId outside the try block
    try {
      setIsLoading(true);
      // Optimistically add topic to local state
      tempTopicId = topics.length + 1; // Temporary ID for local state
      const newTopicObj: Topic = {
        id: tempTopicId,
        topicDiscription: newTopic.name,
        created_by: 'Current User',
        dueDate: new Date(newTopic.created_at),
        status: 'Not Started',
        group_id: activeCard,
      };
      setTopics([...topics, newTopicObj]);
      // helo world
      // Send to backend
      const res = await fetch('https://studybuddys-454c3f01f785.herokuapp.com/groupStudy/addStudyPlanner/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          group_id: activeCard,
          topicDiscription: newTopic.name,
          dueDate: newTopic.created_at,
        }),
        credentials: 'include',
      });

      const data = await res.json();
      if (data.status) {
        // Update topic with backend ID
        setTopics(topics =>
          topics.map(topic =>
            topic.id === tempTopicId
              ? { ...topic, id: data.data?.id || tempTopicId }
              : topic
          )
        );
        setNewTopic({ name: '', created_at: new Date().toISOString().split('T')[0], group_id: null });
      } else {
        // Revert optimistic update on failure
        setTopics(topics => topics.filter(topic => topic.id !== tempTopicId));
        alert(data.message || 'Failed to create topic');
      }
    } catch (error) {
      // Revert optimistic update on error
      setTopics(topics => topics.filter(topic => topic.id !== tempTopicId));
      console.error('Error creating topic:', error);
      alert('An error occurred while creating the topic');
    } finally {
      setIsLoading(false);
    }
  };

  // Add new task
  const addTask = () => {
    if (!newTask.description.trim() || !newTask.assigned_to.trim() || !newTask.due_date || !activeCard) {
      alert('All fields and a selected group are required');
      return;
    }
    const newTaskObj: Task = {
      id: tasks.length + 1,
      task_name: newTask.description,
      assigned_to: newTask.assigned_to,
      due_date: newTask.due_date,
      complexity: newTask.complexity,
      is_done: false,
      group_id: activeCard,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask({ description: '', assigned_to: '', due_date: '', complexity: 'Low', group_id: null });

    addGroupTask();
  };

  // Add new message
  const addMessage = () => {
    if (!newMessage.trim() || !activeCard) {
      alert('Message and a selected group are required');
      return;
    }
    const newMessageObj: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'Current User',
      timestamp: new Date(),
      group_id: activeCard,
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  // Mark task as done
  const markTaskAsDone = (taskId: number) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, is_done: true } : task)));
  };

  // Calculate task tracking
  const taskTracking = () => {
    const groupTasks = tasks.filter(task => task.group_id === activeCard);
    const totalTasks = groupTasks.length;
    const completedTasks = groupTasks.filter(task => task.is_done).length;
    return { totalTasks, completedTasks };
  };

  // Load groups
  const loadGroups = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}getGroups/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        const groupsData = Array.isArray(data.data) ? data.data : [];
        setGroups(groupsData);
      } else {
        console.error('API Error:', data.message || 'Unknown error');
        setGroups([]);
        alert('Failed to load the Groups of this user');
      }
    } catch (error) {
      console.error('Error loading groups:', error);
      setGroups([]);
      alert('An error occurred while loading groups');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [groupsRes, topicsRes] = await Promise.all([
          fetch(`${API_BASE}getGroups/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
            credentials: 'include',
          }),
          fetch(`${API_BASE}getStudyPlanner/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
            credentials: 'include',
          }),
        ]);

        const groupsData = await groupsRes.json();
        const topicsData = await topicsRes.json();

        if (groupsRes.ok) {
          const groupsArray = Array.isArray(groupsData.data) ? groupsData.data : [];
          setGroups(groupsArray);
          if (groupsArray.length > 0 && activeCard === null) {
            setActiveCard(groupsArray[0].id);
          }
        } else {
          console.error('API Error (groups):', groupsData.message || 'Unknown error');
          setGroups([]);
          alert('Failed to load groups');
        }

        if (topicsRes.ok) {
          const topicsArray = Array.isArray(topicsData.data) ? topicsData.data : [];
          setTopics(topicsArray);
        } else {
          console.error('API Error (topics):', topicsData.message || 'Unknown error');
          alert('Failed to load the Shared Study Planner');
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        alert('An error occurred while loading data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    getGroupTask();
  }, []);

  // Fetch topics when activeCard changes
  useEffect(() => {
    debouncedGetSharedStudyPlanner(activeCard);
  }, [activeCard, debouncedGetSharedStudyPlanner]);

  // Create a new group
  const groupCreation = async () => {
    if (!groupName.trim()) {
      alert('Group name is required');
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}createGroup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: groupName }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setCreateGroup(false);
        setGroupName('');
        await loadGroups();
      } else {
        alert(data.message || 'Failed to create group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      alert('An error occurred while creating the group');
    } finally {
      setIsLoading(false);
    }
  };

  // Join a group
  const joinGroupAction = async () => {
    if (!inviteCode.trim()) {
      alert('Invite code is required');
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}joinGroup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ invite_code: inviteCode }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status) {
        setJoinGroup(false);
        setInviteCode('');
        await loadGroups();
      } else {
        alert(data.message || 'Failed to join group');
      }
    } catch (error) {
      console.error('Error joining group:', error);
      alert('An error occurred while joining the group');
    } finally {
      setIsLoading(false);
    }
  };

  const activeCardDetail = () => {
    if (!Array.isArray(groups)) {
      console.error('groups is not an array:', groups);
      return null;
    }
    const group = groups.find(group => group.id === activeCard);
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
  const groupHanler = ({ group_id }: { group_id: number }) => {
    setActiveCard(group_id);
    getGroupUser();
  }
  const GroupCard = ({ groupId, title, totalMembers, totalTopics }: { groupId: number; title: string; totalMembers: number; totalTopics: number }) => (
    <div
      onClick={() => groupHanler({ group_id: groupId })}
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

  const { totalTasks, completedTasks } = taskTracking();

  return (
    <div className="flex flex-col md:mx-auto min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white p-4 sm:p-6 md:p-8 font-cursive">
          Collaborative Study
          <p className="text-xl">Make your Study Simple</p>
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col bg-blue-950 lg:ml-5 mx-auto rounded-md w-[90%] lg:w-[23%] h-auto">
          <div className="flex text-2xl justify-center">
            <h1 className="text-white items-center">MY Study Group</h1>
          </div>
          <div className="flex justify-center p-4">
            <button
              onClick={() => setCreateGroup(true)}
              className={`flex items-center justify-center gap-2 w-[50%] h-[3rem] rounded-md text-white font-medium transition ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
              }`}
              disabled={isLoading}
            >
              <PlusCircle className="w-5 h-5" />
              Create
            </button>
            <button
              onClick={() => setJoinGroup(true)}
              className={`flex items-center justify-center gap-2 ml-2 w-[50%] h-[3rem] rounded-md text-white font-medium transition ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
              }`}
              disabled={isLoading}
            >
              <UserCheck className="w-5 h-5" />
              Join
            </button>
          </div>
          <Modal isOpen={createGroup} onClose={() => { setCreateGroup(false); setGroupName(''); }} title="Create Group">
            <div className="flex flex-col p-4 text-black">
              <div className="flex flex-row mb-2 mx-auto">
                <h1>Create New Study Group</h1>
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="groupName" className="">Group Name (Required)</label>
                <input
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="e.g Advance Math Study Group"
                  type="text"
                  id="groupName"
                  className="flex border bg-black-100 rounded-md p-2 mt-1 w-full text-black"
                  disabled={isLoading}
                />
              </div>
              <div className="flex ml-auto mr-3">
                <button
                  onClick={() => { setCreateGroup(false); setGroupName(''); }}
                  className="cursor-pointer bg-white text-sm h-10 w-[7rem] rounded-md"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={groupCreation}
                  className="cursor-pointer text-white text-sm bg-blue-600 hover:bg-blue-700 h-10 w-[7rem] rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Group'}
                </button>
              </div>
            </div>
          </Modal>
          <Modal isOpen={joinGroup} onClose={() => { setJoinGroup(false); setInviteCode(''); }} title="Join Group">
            <div className="flex flex-col p-4 text-black">
              <div className="flex flex-row mb-2 mx-auto">
                <h1>Join Study Group</h1>
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="inviteCode" className="">Invite Code</label>
                <input
                  value={inviteCode}
                  onChange={e => setInviteCode(e.target.value)}
                  placeholder="Enter your invite code"
                  type="text"
                  id="inviteCode"
                  className="flex border text-sm font-mono bg-black-100 rounded-md p-2 mt-1 w-full text-black text-center"
                  disabled={isLoading}
                />
              </div>
              <div className="flex ml-auto mr-3">
                <button
                  onClick={() => { setJoinGroup(false); setInviteCode(''); }}
                  className="cursor-pointer bg-white text-sm h-10 w-[7rem] rounded-md"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={joinGroupAction}
                  className="cursor-pointer text-white text-sm bg-green-600 hover:bg-green-700 h-10 w-[7rem] rounded-md"
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
              groups.map(group => (
                <GroupCard
                  key={group.id}
                  groupId={group.id}
                  title={group.name}
                  totalMembers={5}
                  totalTopics={topics.filter(topic => topic.group_id === group.id).length}
                />
              ))
            ) : (
              <p className="text-white text-center">No groups found</p>
            )}
          </div>
        </div>
        <div className="lg:w-[70%] w-[90%] mx-auto">
          <div className="flex flex-col sm:mt-3 md:mt-3 lg:mt-0 mt-3 mb-3 bg-blue-950 w-[100%] rounded-md">
            {isLoading ? <p className="text-white text-center">Loading group details...</p> : activeCardDetail()}
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
            <div className="flex flex-col h-auto bg-blue-950 p-4 rounded-md">
              <div className="flex flex-col w-full h-[10rem] rounded-md">
                <div className="flex ml-3 mt-3">
                  <Book className="icon ml-3" />
                  <h1 className="text-xl ml-3">Shared Study Planner</h1>
                </div>
                <div className="flex mx-auto h-[45%] justify-center mt-3 outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 rounded-xl w-[95%]">
                  <div className="flex h-[80%] text-white justify-center items-center mx-auto my-auto w-[95%]">
                    <input
                      type="text"
                      value={newTopic.name}
                      onChange={e => setNewTopic({ ...newTopic, name: e.target.value })}
                      className="bg-gray-700 w-[75%] my-auto h-[75%] ml-3 rounded-xl"
                      placeholder="e.g Calculus - Integration By Parts"
                      disabled={isLoading || !activeCard}
                    />
                    <input
                      type="date"
                      value={newTopic.created_at}
                      onChange={e => setNewTopic({ ...newTopic, created_at: e.target.value })}
                      className="bg-gray-700 h-[75%] my-auto ml-3 rounded-xl"
                      disabled={isLoading || !activeCard}
                    />
                    <button
                      onClick={addTopic}
                      className={`flex items-center justify-center gap-2 w-[5%] h-[75%] my-auto ml-3 rounded-xl text-white font-medium transition ${
                        isLoading || !activeCard
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
                      }`}
                      disabled={isLoading || !activeCard}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-4 w-full">
                <h2 className="text-lg text-white mb-2">Topics</h2>
                {activeCard && topics.filter(topic => topic.group_id === activeCard).length > 0 ? (
                  topics
                    .filter(topic => topic.group_id === activeCard)
                    .map(topic => (
                      <div key={topic.id} className="flex flex-row bg-slate-800 rounded-md p-3 mb-2 w-[95%] mx-auto">
                        <div className="flex flex-col w-[60%]">
                          <h3 className="text-white font-medium">{topic.topicDiscription}</h3>
                          <p className="text-sm text-gray-400">Created by: {topic.created_by}</p>
                          <p className="text-sm text-gray-400">Created on: {new Date(topic.dueDate).toLocaleDateString()}</p>
                          <div className="flex flex-row mt-2 gap-2">
                            <button
                              onClick={() => updateTopicStatus(topic.id, 'Not Started')}
                              className={`px-2 py-1 rounded text-sm text-white ${
                                topic.status === 'Not Started' ? 'bg-red-600' : 'bg-gray-600 hover:bg-red-700'
                              }`}
                              disabled={isLoading}
                            >
                              Not Started
                            </button>
                            <button
                              onClick={() => updateTopicStatus(topic.id, 'In Progress')}
                              className={`px-2 py-1 rounded text-sm text-white ${
                                topic.status === 'In Progress' ? 'bg-yellow-600' : 'bg-gray-600 hover:bg-yellow-700'
                              }`}
                              disabled={isLoading}
                            >
                              In Progress
                            </button>
                            <button
                              onClick={() => updateTopicStatus(topic.id, 'Completed')}
                              className={`px-2 py-1 rounded text-sm text-white ${
                                topic.status === 'Completed' ? 'bg-green-600' : 'bg-gray-600 hover:bg-green-700'
                              }`}
                              disabled={isLoading}
                            >
                              Completed
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col w-[40%] justify-center items-end">
                          <span
                            className={`text-white px-3 py-1 rounded ${
                              topic.status === 'Not Started' ? 'bg-red-600' : topic.status === 'In Progress' ? 'bg-yellow-600' : 'bg-green-600'
                            }`}
                          >
                            {topic.status}
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-400 text-center">{activeCard ? 'No topics available for this group' : 'Please select a group'}</p>
                )}
              </div>
            </div>
          )}
          {activePanel === 'GroupTask' && (
            <div className="flex flex-col h-auto bg-blue-950 p-4 rounded-md">
              <h1 className="text-xl text-white mb-4">Group Tasks</h1>
              {activeCard && (
                <div className="flex flex-col bg-slate-800 rounded-md p-4 mb-4">
                  <h2 className="text-lg text-white mb-2">Task Tracking</h2>
                  <p className="text-white">
                    Completed: {completedTasks} / {totalTasks} tasks
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="flex flex-col bg-slate-800 rounded-md p-4 mb-4">
                <h2 className="text-lg text-white mb-2">Add New Task</h2>
                <div className="flex flex-col gap-2 lg:gap-4">
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                    <input
                      type="text"
                      value={newTask.description}
                      onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Task description"
                      className="bg-gray-700 text-white rounded-md p-2 lg:flex-1"
                      disabled={isLoading || !activeCard}
                    />
                    <select
                      value={newTask.assigned_to}
                      onChange={e => setNewTask({ ...newTask, assigned_to: e.target.value })}
                      className="bg-gray-700 text-white rounded-md p-2 lg:flex-1"
                      disabled={isLoading || !activeCard}
                    >
                      <option value="" disabled>
                      Select user
                      </option>
                        {users.map((user: user, index: number) => (
                        <option key={index} value={user.username}>
                        {user.username}
                        </option>
                        ))}
                    </select>
                    </div>
                  <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                    <input
                      type="date"
                      value={newTask.due_date}
                      onChange={e => setNewTask({ ...newTask, due_date: e.target.value })}
                      className="bg-gray-700 text-white rounded-md p-2 lg:flex-1"
                      disabled={isLoading || !activeCard}
                    />
                    <div className="flex gap-2 lg:flex-1">
                      <button
                        onClick={() => setNewTask({ ...newTask, complexity: 'Low' })}
                        className={`flex-1 px-2 py-1 rounded text-sm text-white ${
                          newTask.complexity === 'Low' ? 'bg-green-600' : 'bg-gray-600 hover:bg-green-700'
                        }`}
                        disabled={isLoading || !activeCard}
                      >
                        Low
                      </button>
                      <button
                        onClick={() => setNewTask({ ...newTask, complexity: 'Medium' })}
                        className={`flex-1 px-2 py-1 rounded text-sm text-white ${
                          newTask.complexity === 'Medium' ? 'bg-yellow-600' : 'bg-gray-600 hover:bg-yellow-700'
                        }`}
                        disabled={isLoading || !activeCard}
                      >
                        Medium
                      </button>
                      <button
                        onClick={() => setNewTask({ ...newTask, complexity: 'High' })}
                        className={`flex-1 px-2 py-1 rounded text-sm text-white ${
                          newTask.complexity === 'High' ? 'bg-red-600' : 'bg-gray-600 hover:bg-red-700'
                        }`}
                        disabled={isLoading || !activeCard}
                      >
                        High
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={addTask}
                      className={`flex items-center justify-center gap-2 w-[8rem] h-[2rem] sm:w-[7rem] sm:h-[2.5rem] lg:w-[8rem] lg:h-[2.5rem] rounded-md text-white font-medium text-sm transition ${
                        isLoading || !activeCard
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
                      }`}
                      disabled={isLoading || !activeCard}
                    >
                      <Plus className="ml-2 w-4 h-4" />
                      Assign Task
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg text-white mb-2">Tasks</h2>
                {activeCard && tasks.filter(task => task.group_id === activeCard).length > 0 ? (
                  tasks
                    .filter(task => task.group_id === activeCard)
                    .map(task => (
                      <div key={task.id} className="flex flex-row bg-slate-800 rounded-md p-3 mb-2 w-[95%] mx-auto">
                        <div className="flex flex-col w-[60%]">
                          <h3 className={`text-white font-medium ${task.is_done ? 'line-through' : ''}`}>{task.task_name}</h3>
                          <p className="text-sm text-gray-400">Assigned to: {task.assigned_to}</p>
                          <p className="text-sm text-gray-400">Due date: {task.due_date}</p>
                        </div>
                        <div className="flex flex-col w-[40%] justify-center items-end gap-2">
                          <span
                            className={`text-white px-3 py-1 rounded ${
                              task.complexity === 'Low' ? 'bg-green-600' : task.complexity === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                          >
                            {task.complexity}
                          </span>
                          {!task.is_done && (
                            <button
                              onClick={() => markTaskAsDone(task.id)}
                              className="bg-green-600 text-white rounded-md p-1 hover:bg-green-700"
                              disabled={isLoading}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-400 text-center">{activeCard ? 'No tasks available for this group' : 'Please select a group'}</p>
                )}
              </div>
            </div>
          )}
          {activePanel === 'GroupChat' && (
            <div className="flex flex-col w-full h-[30rem] bg-blue-950 rounded-md p-4">
              <h1 className="text-xl text-white mb-4">Group Chat</h1>
              <div className="flex flex-col h-[80%] bg-slate-800 rounded-md p-4 overflow-y-auto">
                {activeCard && messages.filter(message => message.group_id === activeCard).length > 0 ? (
                  messages
                    .filter(message => message.group_id === activeCard)
                    .map(message => (
                      <div key={message.id} className="mb-2">
                        <div className="text-sm text-gray-400">
                          {message.sender} - {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="text-white bg-blue-600 rounded-md p-2 inline-block">{message.content}</div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-400 text-center">{activeCard ? 'No messages yet for this group' : 'Please select a group'}</p>
                )}
              </div>
              <div className="flex mt-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-gray-700 text-white rounded-l-md p-2"
                  disabled={isLoading || !activeCard}
                />
                <button
                  onClick={addMessage}
                  className={`bg-blue-600 text-white rounded-r-md px-4 ${isLoading || !activeCard ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  disabled={isLoading || !activeCard}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}