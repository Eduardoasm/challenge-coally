import React from 'react';
import { ButtonGroup, Button, HStack } from '@chakra-ui/react';
import { useTaskContext } from '../context/taskContext';

export const TaskFilter = () => {
  const { fetchPendingTasks, fetchCompletedTasks, fetchTasks } = useTaskContext();

  return (
    <HStack height={'full'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
      <ButtonGroup spacing={4} mb={4} mr={2}>
        <Button variant={'ghost'} onClick={fetchTasks}>All</Button>
        <Button variant={'ghost'} onClick={fetchPendingTasks}>Pending</Button>
        <Button variant={'ghost'} onClick={fetchCompletedTasks}>Completed</Button>
      </ButtonGroup>
    </HStack>
  );
};
