import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { TaskForm } from './taskForm';

interface ButtonNewTaskProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const NewTaskButton: React.FC<ButtonNewTaskProps> = ({ isModalOpen, openModal, closeModal }) => (
  <Box>
    <Button
      leftIcon={<AddIcon />}
      onClick={openModal}
      >
        New Task
      </Button>
    <TaskForm isOpen={isModalOpen} onClose={closeModal} />
  </Box>
);

export default NewTaskButton;
