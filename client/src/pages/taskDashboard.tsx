import React from 'react';
import { useState } from 'react';
import { TaskList } from '../components/tasks/taskList';
import { TaskFilter } from '../components/tasks/taskFilter';
import { Layout } from '../components/tasks/layout';
import NavBar from '../components/tasks/navBar';

export const TaskDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <NavBar 
        isModalOpen={isModalOpen} 
        openModal={openModal} 
        closeModal={closeModal} 
      />
      <TaskFilter />
      <Layout>
        <TaskList 
          isModalOpen={isModalOpen} 
          openModal={openModal} 
          closeModal={closeModal} 
        />
      </Layout>
    </>
  );
};