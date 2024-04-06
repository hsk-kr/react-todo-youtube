import { ChakraProvider } from '@chakra-ui/react';
import Todo from './components/Todo';

function App() {
  return (
    <ChakraProvider>
      <Todo />
    </ChakraProvider>
  );
}

export default App;
