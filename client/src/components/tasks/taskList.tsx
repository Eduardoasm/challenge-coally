import React, { useEffect } from 'react';
import { Flex, Box, Text, useToast } from '@chakra-ui/react';
import { useTaskContext } from '../../context/taskContext';
import { TaskCard } from './taskCard';

export const TaskList = (
  {
    isModalOpen,
    openModal,
    closeModal
  }:
  {
    isModalOpen: boolean,
    openModal: () => void,
    closeModal: () => void
  }) => {
  const { deleteTask, fetchTasks, tasks } = useTaskContext();
  const toast = useToast();

  useEffect(() => {
    if(!tasks) {
      fetchTasks();
    }
  }, []);

  const taskRemove = async (taskId: string) => {
    try {
      const response = await deleteTask(taskId);
      if (response.success) {
        fetchTasks();
        toast({
          title: `Task deleted successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: `Error deleting task`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error deleting task', error);
    } 
  }

  return (
    <Flex wrap={'wrap'} width={'full'} justify={'flex-start'} gap={4} p={4} ml={4}>
      {tasks && tasks.length > 0 ? (
        tasks.map(task => (
          <Box key={task._id} p={2} width={'md'} maxW={'md'}>
            <TaskCard
              key={task._id}
              task={task}
              deleteTasks={taskRemove}
              isModalOpen={isModalOpen}
              openModal={openModal}
              closeModal={closeModal}
            />
          </Box>
        ))
      ) : (
        <Box w={'full'} h={'80'} mr={'90px'} p={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Text fontSize={{ base: '10px', md: '20px' }} fontFamily="sans-serif" fontWeight={'bold'}>No tasks available</Text>
        </Box>
      )}
    </Flex>
  );
};
