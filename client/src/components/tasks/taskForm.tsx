import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  Button,
  Text,
  Box,
  VStack,
  ModalFooter,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { useTaskContext } from '../../context/taskContext';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, taskId }) => {
  const { fetchTask, task, updateTask, createTask, fetchTasks, setTask } = useTaskContext();
  const [toastId, setToastId] = useState<string | null>(null);
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
    }
  }, [taskId, fetchTask]);

  useEffect(() => {
    if (task) {
      setTitle(task?.title || '');
      setDescription(task?.description || '');
    }
  }, [task]);

  const closeTask = () => {
    onClose();
    setTask(null);
    setTitle('');
    setDescription('')
  }

  const handleSubmit = async () => {
    if (!toastId) {

    const taskData = { title, description, completed: task?.completed, createdAt: task?.createdAt };
      if (task?._id) {
        const taskUpdated = await updateTask(task._id, taskData);
        if (taskUpdated.success) {
          const id = toast({
            title: `Task updated successfully`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            onCloseComplete: () => setToastId(null)
          })
          setToastId(id as string)
        } else {
          const id = toast({
            title: taskUpdated?.errors?.[0]?.msg ?? taskUpdated?.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            onCloseComplete: () => setToastId(null)
          })
          return setToastId(id as string)
        }
      } else {
        const taskCreated = await createTask({ title, description });
        if (taskCreated.success) {
          const id = toast({
            title: `Task created successfully`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            onCloseComplete: () => setToastId(null)
          })
          setToastId(id as string)
        } else {
          const id = toast({
            title: taskCreated?.errors?.[0]?.msg ?? taskCreated?.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            onCloseComplete: () => setToastId(null)
          })
          return setToastId(id as string)
        }
      }
      await fetchTasks();
      closeTask();  
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeTask}>
      <ModalOverlay />
      <ModalContent h="lg">
        <ModalHeader>{task ? 'Edit Task' : 'Create Task'}</ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box mt={4}>
              <Text textColor="gray.500">Title</Text>
              <FormControl>
                <Input
                  placeholder="Go to the supermarket"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <Text textColor="gray.500">Description</Text>
              <FormControl>
                <Textarea
                  placeholder="Task description"
                  value={description}
                  resize="none"
                  whiteSpace="pre-wrap"
                  wordBreak='break-word'
                  onChange={(e) => setDescription(e.target.value)}
                  h={56}
                />
              </FormControl>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button mt={4} onClick={handleSubmit}>
            {task ? 'Update Task' : 'Save Task'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
