import { Flex, Button } from '@chakra-ui/react';

interface ToolsProps {
  onAddModalOpen: VoidFunction;
}

const Tools = ({ onAddModalOpen }: ToolsProps) => {
  return (
    <Flex p={4}>
      <Button colorScheme="blue" variant="outline" onClick={onAddModalOpen}>
        Add Todo
      </Button>
    </Flex>
  );
};

export default Tools;
