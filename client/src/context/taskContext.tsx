import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';

interface Task {
  _id?: string;
  title: string;
  completed?: boolean;
  description: string;
  createdAt?: Date;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  fetchPendingTasks: () => void;
  fetchCompletedTasks: () => void;
  error: string | null;
  filter: 'all' | 'completed' | 'pending';
}

export const TaskContext = createContext<{
  tasks: Task[];
  task: Task | null;
  loading: boolean;
  fetchPendingTasks: () => Promise<{ success: boolean, data: Task[] }>;
  fetchCompletedTasks: () => Promise<{ success: boolean, data: Task[] }>;
  fetchTasks: () => Promise<{ success: boolean, data: Task[] }>;
  deleteTask: (taskId: string) => Promise<{ success: boolean, data: string }>;
  fetchTask: (taskId: string) => Promise<{ success: boolean, data: Task | null }>;
  updateTask: (taskId: string, task: Partial<Task>) => Promise<{ success: boolean, message: string, errors?: any }>;
  createTask: (task: Task) => Promise<{ success: boolean, data: Task | null, errors?: any, message?: string }>;
  setTask: (task: Task | null) => void;
}>({
  tasks: [],
  task: null,
  loading: false,
  fetchPendingTasks: async () => ({ success: false, data: [] }),
  fetchCompletedTasks: async () => ({ success: false, data: [] }),
  fetchTasks: async () => ({ success: false, data: [] }),
  deleteTask: async (taskId: string) => ({ success: false, data: '' }),
  fetchTask: async (taskId: string) => ({ success: false, data: null}),
  updateTask: async (taskId: string, task: Partial<Task>) => ({ success: false, message: '', errors: null }),
  createTask: async (task: Partial<Task>) => ({ success: false, data: null, errors: null, message: '' }),
  setTask: (task: Task | null) => {}
});

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  const fetchPendingTasks = async (): Promise<{ success: boolean, data: Task[] }> => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks?completed=${false}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    });
    const data = await response.json();
    setTasks(data.data);
    setLoading(false);
    return data;
  }

  const fetchCompletedTasks = async (): Promise<{ success: boolean, data: Task[] }> => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks?completed=${true}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    });
    const data = await response.json();
    setTasks(data.data);
    setLoading(false);
    return data;
  }

  const fetchTasks = async (): Promise<{ success: boolean, data: Task[] }> => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    });
    const data = await response.json();
    setLoading(false);
    setTasks(data.data);
    return data;
  }

  const deleteTask = async (taskId: string): Promise<{ success: boolean, data: string }> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await response.json();
    setLoading(false);
    return data;
  }

  const fetchTask = async (taskId: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include'
    });
    const data = await response.json();
    setLoading(false);
    setTask(data.data)
    return data;
  }

  const updateTask = async (taskId: string, task: Partial<Task>) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task),
      credentials: 'include'
    });
    const data = await response.json();
    setLoading(false);
    return data;
  }

  const createTask = async (task: Task) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task),
      credentials: 'include'
    });
    const data = await response.json();
    setLoading(false);
    return data;
  }
  
  useEffect(()=> {
    fetchTasks();
  } ,[])

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      fetchPendingTasks,
      fetchCompletedTasks,
      fetchTasks,
      deleteTask,
      fetchTask,
      task,
      updateTask,
      createTask,
      setTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
