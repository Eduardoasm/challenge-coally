import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { TaskProvider } from './context/taskContext';
import NavBar from './components/tasks/navBar';
import { TaskFilter } from './components/tasks/taskFilter';
import { Layout } from './components/tasks/layout';
import { TaskList } from './components/tasks/taskList';

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
