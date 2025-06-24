'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudyPlanner() {
  const [activeForm, setActiveForm] = useState<'form1' | 'form2' | null>('form1');
  const router = useRouter();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [updatingTopics, setUpdatingTopics] = useState<Set<number>>(new Set());

  type Topic = {
    id: number;
    title: string;
    deadline: Date;
    status: 'not_started' | 'In progress' | 'Completed';
    subject_id: number;
    reminder?: boolean;
  };

  type Subject = {
    id: number;
    name: string;
    description?: string;
  };

  const API_BASE = 'https://studybuddys-454c3f01f785.herokuapp.com/studyplanner/';

  const getAllSubjects = async () => {
    try {
      const res = await fetch(`${API_BASE}allSubjects/`, {
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
        const newSubjects = data.subjects.map((sub: Subject) => ({
          id: sub.id,
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

  const getAllTopics = async () => {
    try {
      const res = await fetch(`${API_BASE}allTopics/`, {
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
        const newTopics = data.topics.map((topic: Topic) => ({
          id: topic.id,
          title: topic.title,
          deadline: new Date(topic.deadline),
          status: topic.status || 'not_started',
          subject_id: topic.subject_id,
          reminder: topic.reminder || false,
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
    try {
      const res = await fetch(`${API_BASE}updateStatus/`, {
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
    } finally {
      setUpdatingTopics((prev) => {
        const newSet = new Set(prev);
        newSet.delete(topic_id);
        return newSet;
      });
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
      const res = await fetch(`${API_BASE}addSubject/`, {
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
      const res = await fetch(`${API_BASE}addTopic/`, {
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
      className="cursor-pointer mx-auto mt-2 rounded-lg text-center text-white font-semibold bg-blue-600 hover:bg-blue-500 transition-colors duration-200 h-10 w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[10rem]"
    >
      <span className="block py-2">{title}</span>
    </div>
  );

  const DCard = ({ title }: { title: string }) => (
    <div className="flex flex-col bg-gradient-to-br from-gray-800 to-blue-800 rounded-lg text-center w-full max-w-[10rem] sm:max-w-[12rem] h-40 sm:h-48 mt-2 mx-1 sm:mx-2">
      {title === 'Done' && (
        <p className="bg-green-500 w-20 h-6 rounded-md mx-auto mt-2 text-xs font-semibold text-white">{title}</p>
      )}
      {title === 'Missing' && (
        <p className="bg-red-500 w-20 h-6 rounded-md mx-auto mt-2 text-xs font-semibold text-white">{title}</p>
      )}
      {title === 'Upcoming' && (
        <p className="bg-yellow-500 w-20 h-6 rounded-md mx-auto mt-2 text-xs font-semibold text-white">{title}</p>
      )}
      <div className="overflow-y-auto h-24 sm:h-32 text-white text-xs mt-2">
        {title === 'Missing' &&
          topics
            .filter((topic) => topic.subject_id === selectedSubject && new Date(topic.deadline) < new Date())
            .map((topic, index) => (
              <p key={index} className="bg-blue-700 mt-1 w-11/12 mx-auto rounded-md py-1">{topic.title}</p>
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
              <p key={index} className="bg-blue-700 mt-1 w-11/12 mx-auto rounded-md py-1">{topic.title}</p>
            ))}
        {title === 'Done' &&
          topics
            .filter((topic) => topic.subject_id === selectedSubject && topic.status === 'Completed')
            .map((topic, index) => (
              <p key={index} className="bg-blue-700 mt-1 w-11/12 mx-auto rounded-md py-1">{topic.title}</p>
            ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex flex-col md:flex-row items-center justify-center p-4 gap-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-6 font-serif">
          StudyPlanner
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            className="w-full sm:w-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => setActiveForm('form1')}
          >
            Add Subject
          </button>
          <button
            className="w-full sm:w-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => setActiveForm('form2')}
          >
            Add Topic
          </button>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          {activeForm === 'form1' && (
            <form onSubmit={addSubject} className="flex flex-col gap-4">
              <input
                placeholder="Subject Name"
                value={subjectTitle}
                onChange={(e) => setSubjectTitle(e.target.value)}
                className="bg-gray-600 text-white w-full h-12 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                required
              />
              <input
                placeholder="Subject Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-600 text-white w-full h-20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
              />
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Add Subject
              </button>
            </form>
          )}
          {activeForm === 'form2' && (
            <form onSubmit={addTopic} className="flex flex-col gap-4">
              <input
                placeholder="Topic Title"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                className="bg-gray-600 text-white w-full h-12 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                required
              />
              <select
                className="bg-gray-600 text-white w-full h-12 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subjectTitle}
                onChange={(e) => setSubjectTitle(e.target.value)}
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
                className="bg-gray-600 text-white w-full h-12 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="date"
                required
              />
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Add Topic
              </button>
            </form>
          )}
        </div>
        <button
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => router.push('./Home')}
        >
          ← Home
        </button>
      </div>
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
            {subjects.map((sub, index) => (
              <Card key={index} title={sub.name} />
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-6 font-serif">
              StudyPlanner
            </h1>
            <div className="bg-gray-700 rounded-lg p-4 overflow-x-auto">
              <table className="w-full text-white text-sm">
                <thead>
                  <tr className="flex p-2 border-b border-gray-600">
                    <th className="flex-1 text-left font-semibold">Topic</th>
                    <th className="flex-1 text-left font-semibold">Deadline</th>
                    <th className="flex-1 text-left font-semibold">Status</th>
                    <th className="flex-1 text-center font-semibold">Reminder</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSubject ? (
                    topics
                      .filter((topic) => topic.subject_id === selectedSubject)
                      .length > 0 ? (
                        topics
                          .filter((topic) => topic.subject_id === selectedSubject)
                          .map((topic, index) => (
                            <tr key={topic.id || index} className="flex p-2 border-b border-gray-600">
                              <td className="flex-1">{topic.title}</td>
                              <td className="flex-1">{new Date(topic.deadline).toLocaleDateString()}</td>
                              <td className="flex-1 relative">
                                <select
                                  name="status"
                                  id={`status-${topic.id}`}
                                  className="w-full bg-gray-600 text-white rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  value={topic.status}
                                  disabled={updatingTopics.has(topic.id)}
                                  onChange={async (e) => {
                                    const newStatus = e.target.value as Topic['status'];
                                    const previousStatus = topic.status;
                                    setUpdatingTopics((prev) => new Set(prev).add(topic.id));
                                    setTopics((prev) =>
                                      prev.map((t) =>
                                        t.id === topic.id ? { ...t, status: newStatus } : t
                                      )
                                    );
                                    const success = await statusHandler({
                                      status: newStatus,
                                      topic_id: topic.id,
                                    });
                                    if (!success) {
                                      setTopics((prev) =>
                                        prev.map((t) =>
                                          t.id === topic.id ? { ...t, status: previousStatus } : t
                                        )
                                      );
                                    }
                                  }}
                                >
                                  <option value="not_started">Not Started</option>
                                  <option value="In progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                                {updatingTopics.has(topic.id) && (
                                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">
                                    ⏳
                                  </span>
                                )}
                              </td>
                              <td className="flex-1 flex justify-center">
                                <input
                                  type="checkbox"
                                  checked={topic.reminder || false}
                                  onChange={(e) => {
                                    setTopics((prev) =>
                                      prev.map((t) =>
                                        t.id === topic.id ? { ...t, reminder: e.target.checked } : t
                                      )
                                    );
                                  }}
                                  className="h-5 w-5 text-blue-600"
                                />
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center p-4 text-gray-400">
                            No topics for selected subject
                          </td>
                        </tr>
                      )
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center p-4 text-gray-400">
                        Select a subject to view topics
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <DCard title="Missing" />
          <DCard title="Upcoming" />
          <DCard title="Done" />
        </div>
      </div>
    </div>
  );
}