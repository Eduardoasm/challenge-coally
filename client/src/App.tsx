import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { TaskProvider } from './context/taskContext';
import { LoginPage } from './components/auth/loginPage';
import { TaskDashboard } from './pages/taskDashboard';
import { ProtectedRoute } from './components/auth/protectedRoute';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route 
                  index 
                  element={<Navigate to="/tasks" replace />} 
                />
                <Route 
                  path="/tasks" 
                  element={<TaskDashboard />} 
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
// // src/App.tsx
// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { ChakraProvider } from '@chakra-ui/react';
// import { TaskList } from './components/tasks/taskList';
// import { TaskFilter } from './components/tasks/taskFilter';
// import { Layout } from './components/tasks/layout';
// import { TaskProvider } from './context/taskContext';
// import NavBar from './components/tasks/navBar';
// import { LoginPage } from './components/auth/loginPage';

// function App() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const openModal = () => setModalOpen(true);
//   const closeModal = () => setModalOpen(false);
  
//   return (
//     <ChakraProvider>
//      <TaskProvider> 
//       <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginPage />}/>
//         <NavBar isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
//         <Route path="/" element/>
//           <TaskFilter />
//           <Layout>
//             <TaskList isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
//         </Layout>
//       </Routes>
//       </ BrowserRouter>
//     </TaskProvider> 
//     </ChakraProvider>
//   );
// }

// export default App;
