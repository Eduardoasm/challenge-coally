// src/App.tsx
import React, { useState } from 'react';
import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import { TaskCard } from './components/taskCard';
import { TaskList } from './components/taskList';
import { TaskFilter } from './components/taskFilter';
import { Layout } from './components/layout';
import { TaskProvider } from './context/taskContext';
import NavBar from './components/navBar';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  return (
    <ChakraProvider>
     <TaskProvider> 
      <NavBar isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
        <TaskFilter />
        <Layout>
          <TaskList isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
        </Layout>
    </TaskProvider> 
    </ChakraProvider>
  );
}

export default App;
