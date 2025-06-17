'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudyPlanner() {
  const [activeForm, setActiveForm] = useState<'form1' | 'form2' | null>('form1');
  const router = useRouter();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState(''); // Used only for form
  const [selectedSubject, setSelectedSubject] = useState(0);

  type Topic = {
    id: number;
    title: string;
    deadline: Date;
    status: 'not_started' | 'In progress' | 'Completed';
    subject_id: number;
    reminder?: boolean; // Added for future reminder support
  };

  type Subject = {
    id: number;
    name: string;
    description?: string;
  };

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  // Fetch all subjects
  const getAllSubjects = async () => {
    const apiRoute = 'http://127.0.0.1:8000/studyplanner/allSubjects/';
    try {
      const res = await fetch(apiRoute, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch subjects');
      const data = await res.json();
      if (data.status && Array.isArray(data.subjects)) {
        
        const newSubjects = data.subjects.map((sub: Subject, index: number) => ({
          id: sub.id || index + 1,
          name: sub.name,
          description: sub.description || '',
        }));
        setSubjects(newSubjects);
      } else {
        alert('Failed to load subjects');
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      alert('Error fetching subjects');
    }
  };

  // Fetch all topics
  const getAllTopics = async () => {
    const apiRoute = 'http://127.0.0.1:8000/studyplanner/allTopics/';
    try {
      const res = await fetch(apiRoute, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch topics');
      const data = await res.json();
      if (data.status && Array.isArray(data.topics)) {
        const newTopics = data.topics.map((topic: Topic, index: number) => ({
          id: topic.id || index + 1,
          title: topic.title, // Match backend field
          deadline: new Date(topic.deadline),
          status: topic.status || 'not_started',
          subject_id: topic.subject_id,
          reminder: topic.reminder || false, // Default to false if not provided
        }));
        setTopics(newTopics);
      } else {
        alert('Failed to load topics');
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
      alert('Error fetching topics');
    }
  };

  useEffect(() => {
    getAllSubjects();
    getAllTopics();
  }, []);

  const statusHandler = async ({ status, topic_id }: { status: Topic['status']; topic_id: number }) => {
    const apiRoute = 'http://127.0.0.1:8000/studyplanner/updateStatus/';
    try {
      const res = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, topic_id }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status) {
        return true;
      } else {
        console.error('Failed to update status:', data.message);
        alert('Failed to update status');
        return false;
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Network error: Could not update status');
      return false;
    }
  };

  const addSubject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add a subject.');
      return;
    }
    try {
      const apiRoute = 'http://127.0.0.1:8000/studyplanner/addSubject/';
      const res = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ subjectTitle, description }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status) {
        await getAllSubjects();
      } else {
        alert('Failed to add subject');
      }
    } catch {
      alert('Network error: Could not connect to the server');
    }
    setSubjectTitle('');
    setDescription('');
  };

  const addTopic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add a topic.');
      return;
    }
    try {
      const apiRoute = 'http://127.0.0.1:8000/studyplanner/addTopic/';
      const res = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          subjectTitle,
          topicTitle,
          deadline,
          status: status || 'not_started',
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status) {
        await getAllTopics();
      } else {
        alert('Failed to add topic');
      }
    } catch {
      alert('Network error: Could not connect to the server');
    }
    setSubjectTitle('');
    setTopicTitle('');
    setDeadline('');
    setStatus('');
  };

  const subjectHandler = (title: string) => {
    const subject = subjects.find((sub) => sub.name === title);
    if (subject) {
      setSelectedSubject(subject.id);
    }
  };

  const Card = ({ title }: { title: string }) => (
    <div
      onClick={() => subjectHandler(title)}
      className="cursor-pointer mx-auto mt-3 rounded-md text-center justify-center text-black font-bold bg-blue-300 h-[2rem] w-[15rem] md:h-[2rem] md:w-[8rem] md:ml-4 md:mr-2"
    >
      {title}
    </div>
  );

  const DCard = ({ title }: { title: string }) => (
    <div className="flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-md text-center w-[10rem] h-[10rem] ml-2 mt-3 mb-1 md:w-[15rem] md:h-[12rem] md:ml-2 md:mt-2 md:mr-2">
      {title === 'Done' && (
        <p className="bg-green-400 w-[7rem] rounded-md h-[2rem] mx-auto mt-2 text-sm">{title}</p>
      )}
      {title === 'Missing' && (
        <p className="bg-red-600 w-[7rem] rounded-md h-[2rem] mx-auto mt-2 text-sm">{title}</p>
      )}
      {title === 'Upcoming' && (
        <p className="bg-yellow-500 w-[7rem] rounded-md h-[2rem] mx-auto mt-2 text-sm">{title}</p>
      )}
      <div className="overflow-y-auto h-[6rem] text-white text-xs">
        {title === 'Missing' &&
          topics
            .filter((topic) => topic.subject_id === selectedSubject && new Date(topic.deadline) < new Date())
            .map((topic, index) => (
              <p key={index} className="bg-blue-900 mt-1 w-[8rem] mx-auto rounded-md">
                {topic.title}
              </p>
            ))}
        {title === 'Upcoming' &&
          topics
            .filter(
              (topic) =>
                topic.subject_id === selectedSubject &&
                topic.status !== 'Completed' &&
                new Date(topic.deadline) > new Date()
            )
            .map((topic, index) => (
              <p key={index} className="bg-blue-900 mt-1 w-[8rem] mx-auto rounded-md">
                {topic.title}
              </p>
            ))}
        {title === 'Done' &&
          topics
            .filter((topic) => topic.subject_id === selectedSubject && topic.status === 'Completed')
            .map((topic, index) => (
              <p key={index} className="bg-blue-900 mt-1 w-[8rem] mx-auto rounded-md">{topic.title}</p>
            ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col items-center justify-end px-2 sm:px-4 md:px-4 md:flex-row md:justify-end md:items-center">
      <div className="min-h-96 w-full mt-0 mb-4 max-w-4xl bg-blue-950 flex flex-col rounded-md shadow-lg md:min-h-[35rem] md:w-1/2 md:mt-4 md:ml-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white p-4 sm:p-6 md:p-8 font-cursive">
          StudyPlanner
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-2 md:space-x-4 mt-2 mb-2">
          <button
            className="w-[10rem] ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20 sm:text-base md:w-[10rem] md:h-[3rem]"
            onClick={() => setActiveForm('form1')}
          >
            Add Subject
          </button>
          <button
            className="w-[10rem] ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20 sm:text-base md:w-[10rem] md:h-[3rem]"
            onClick={() => setActiveForm('form2')}
          >
            Add Topic
          </button>
        </div>
        <div className="bg-gradient-to-br mb-1 from-slate-900 via-slate-800 to-blue-900 rounded-md mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:w-sm">
          {activeForm === 'form1' && (
            <form onSubmit={addSubject}>
              <div className="flex flex-col p-1.5 items-center justify-center h-[18rem] sm:h-[20rem] space-y-4">
                <input
                  placeholder="Subject Name"
                  value={subjectTitle}
                  onChange={(e) => setSubjectTitle(e.target.value)}
                  className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[2.5rem] md:w-[18rem] md:h-[3rem] rounded-md text-sm"
                  type="text"
                  required
                />
                <input
                  placeholder="Subject Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[4rem] md:w-[18rem] md:h-[5rem] rounded-md text-sm"
                  type="text"
                />
                <button className="w-[10rem] ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20 md:w-[9rem] md:h-[3rem]">
                  Add Subject
                </button>
              </div>
            </form>
          )}
          {activeForm === 'form2' && (
            <form onSubmit={addTopic}>
              <div className="flex flex-col p-1.5 items-center justify-center h-[18rem] sm:h-[20rem] space-y-4">
                <input
                  placeholder="Title"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[2.5rem] md:w-[18rem] md:h-[3rem] rounded-md text-sm"
                  type="text"
                  required
                />
                <select
                  className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[2.5rem] md:w-[18rem] md:h-[3rem] rounded-md text-sm"
                  name="Subject"
                  value={subjectTitle}
                  onChange={(e) => setSubjectTitle(e.target.value)}
                  id="Subject"
                  required
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {subjects.map((sub, index) => (
                    <option key={index} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
                <input
                  placeholder="Deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bg-blue-300 text-black w-full max-w-[16rem] sm:max-w-[18rem] h-[2.5rem] md:w-[18rem] md:h-[3rem] rounded-md text-sm"
                  type="date"
                  required
                />
                <button className="w-[10rem] ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20 md:w-[9rem] md:h-[3rem]">
                  Add Topic
                </button>
              </div>
            </form>
          )}
        </div>
        <div>
          <button
            className="w-[10rem] ml-3 mb-2 mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            type="button"
            onClick={() => router.push('./Home')}
          >
            ← Home
          </button>
        </div>
      </div>
      <div className="flex flex-col min-h-96 w-full max-w-4xl mt-3 mb-2 bg-blue-950 rounded-md shadow-lg sm:w-3/4 md:h-[35rem] md:ml-3.5 md:w-1/2">
        <div className="flex flex-col md:flex-row">
          <div className="overflow-y-auto h-[10rem] sm:h-[12rem] flex flex-col mt-3 ml-2 sm:ml-10 w-full max-w-[18rem] sm:max-w-[25rem] rounded-md md:w-[10rem] md:h-85 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
            {subjects.map((sub, index) => (
              <Card key={index} title={sub.name} />
            ))}
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white p-4 sm:p-6 md:p-8 font-cursive">
              StudyPlanner
            </h1>
            <div className="overflow-x-auto bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-md shadow-blue- mx-2 sm:ml-5 md:w-[27rem] md:h-[15rem]">
              <table className="w-full text-white text-xs sm:text-sm">
                <thead>
                  <tr className="flex p-1">
                    <th className="ml-2 border-2 flex-1 md:w-[6rem] text-white">Topic</th>
                    <th className="ml-2 border-2 flex-1 md:w-[6rem] text-white">Deadline</th>
                    <th className="ml-2 border-2 flex-1 md:w-[6rem] text-white">Status</th>
                    <th className="ml-2 border-2 flex-1 md:w-[6rem] text-white">Reminder</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSubject ? (
                    topics
                      .filter((topic) => {
                        return topic.subject_id === selectedSubject;
                      })
                      .length > 0 ? (
                        topics
                          .filter((topic) => topic.subject_id === selectedSubject)
                          .map((topic, index) => (
                            <tr key={index} className="flex p-1">
                              <td className="ml-2 flex-1 md:w-[6rem]">{topic.title}</td>
                              <td className="ml-2 flex-1 md:w-[6rem]">
                                {new Date(topic.deadline).toLocaleDateString()}
                              </td>
                              <td className="ml-2 flex-1 md:w-[6rem]">
                                <select
                                  name="status"
                                  id={`status-${topic.id}`}
                                  className="w-full text-xs sm:text-sm text-white bg-gray-800"
                                  value={topic.status}
                                  onChange={async (e) => {
                                    const newStatus = e.target.value as Topic['status'];
                                    const success = await statusHandler({ status: newStatus, topic_id: topic.id });
                                    if (success) {
                                      setTopics((prev) =>
                                        prev.map((t, i) =>
                                          i === index ? { ...t, status: newStatus } : t
                                        )
                                      );
                                    }
                                  }}
                                >
                                  <option value="not_started" className="text-black">
                                    Not Started
                                  </option>
                                  <option value="In progress" className="text-black">
                                    In Progress
                                  </option>
                                  <option value="Completed" className="text-black">
                                    Completed
                                  </option>
                                </select>
                              </td>
                              <td className="flex ml-2 mx-auto justify-center flex-1 md:w-[6rem]">
                                <input
                                  type="checkbox"
                                  checked={topic.reminder || false}
                                  onChange={(e) => {
                                    // Placeholder: Update reminder in backend
                                    setTopics((prev) =>
                                      prev.map((t, i) =>
                                        i === index ? { ...t, reminder: e.target.checked } : t
                                      )
                                    );
                                  }}
                                />
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center p-2">
                            No topics for selected subject
                          </td>
                        </tr>
                      )
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center p-2">
                        Select a subject to view topics
                      </td>
                    </tr>
                  )}
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