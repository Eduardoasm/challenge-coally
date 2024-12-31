import React from 'react';
import { Box, HStack, Text, IconButton, Checkbox, useToast } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useTaskContext } from '../../context/taskContext';

interface Task {
  _id?: any;
  title: string;
  completed?: boolean;
  description: string;
  createdAt?: Date;
}

interface TaskCardProps {
  task: Task;
  deleteTasks: (taskId: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  deleteTasks,
  openModal
}) => {
  const { fetchTask, updateTask } = useTaskContext();
  const toast = useToast();
  const handleEditClick = async () => {
    await fetchTask(task._id);
    openModal();
  }

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const completed = e.target.checked;
    await updateTask(task._id, { completed });
    await fetchTask(task._id);
    task.completed = completed
    toast({
      title: `Task ${task.title} mark as ${task.completed ? 'completed' : 'pending'}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
  <Box p={4} borderWidth="1px" borderRadius="lg" h={'40'}>
    <HStack justify="space-between">
      <Checkbox isChecked={task?.completed} onChange={handleCheckboxChange}>
        <Text>{task.title}</Text>
      </Checkbox> 
      <HStack>
        <IconButton aria-label="Edit task" icon={<EditIcon />} onClick={handleEditClick}/>
        <IconButton aria-label="Delete task" icon={<DeleteIcon />} onClick={() => deleteTasks(task._id)} />
      </HStack>
    </HStack>
    <Text fontSize="sm" color="gray.500">
      Created: {new Date(task?.createdAt ?? '').toLocaleDateString()}
    </Text>
    <Text mt={2}>
      {task.description}
    </Text>
  </Box>
)};