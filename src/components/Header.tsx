import { Text, Box } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="blue.400" p={4}>
      <Text color="white" fontSize="lg" fontWeight="bold">
        TODO
      </Text>
    </Box>
  );
};

export default Header;
