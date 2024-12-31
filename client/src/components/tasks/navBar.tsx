'use client'
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import NewTaskButton from './buttonNewTask';

export default function NavBar(
  {
    isModalOpen,
    openModal,
    closeModal
  }:
  {
    isModalOpen: boolean,
    openModal: () => void,
    closeModal: () => void
  }
) {

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box fontSize={{ base: '16px', md: '36px' }} fontFamily="sans-serif" fontWeight={'bold'}> My Tasks </Box>
          </HStack>
          <NewTaskButton isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
        </Flex>
      </Box>
    </>
  )
}