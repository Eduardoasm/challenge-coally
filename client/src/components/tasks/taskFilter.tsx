import React, { useState } from 'react';
import { ButtonGroup, Button, HStack } from '@chakra-ui/react';
import { useTaskContext } from '../../context/taskContext';

export const TaskFilter = () => {
  const { fetchPendingTasks, fetchCompletedTasks, fetchTasks } = useTaskContext();
  const [selectedButton, setSelectedButton] = useState('all');

  const handleButtonClick = (buttonType: string, fetchFunction: () => void ) => {
    setSelectedButton(buttonType);
    fetchFunction();
  };

  return (
    <HStack height={'full'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
      <ButtonGroup spacing={4} mb={4} mr={2}>
        <Button
          variant={selectedButton === 'all' ? 'solid' : 'ghost'}
          onClick={() => handleButtonClick('all', fetchTasks)}
        >
          All
        </Button>
        <Button
          variant={selectedButton === 'pending' ? 'solid' : 'ghost'}
          onClick={() => handleButtonClick('pending', fetchPendingTasks)}
        >
          Pending
        </Button>
        <Button
          variant={selectedButton === 'completed' ? 'solid' : 'ghost'}
          onClick={() => handleButtonClick('completed', fetchCompletedTasks)}
        >
          Completed
        </Button>
      </ButtonGroup>
    </HStack>
  );
};
