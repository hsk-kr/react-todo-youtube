import {
  Grid,
  Card,
  CardBody,
  Heading,
  Text,
  Divider,
  CardFooter,
  IconButton,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Todo } from '../types/todo';
import { useMemo } from 'react';

interface TodoListProps {
  items: Todo[];
  onTodoItemEdit: (id: string) => void;
  onTodoItemDelete: (id: string, title: string) => void;
  onTodoItemToggle: (id: string) => void;
}

interface TodoListItemProps extends Omit<Todo, 'id'> {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  onToggle: VoidFunction;
}

const TodoList = ({
  items,
  onTodoItemEdit,
  onTodoItemDelete,
  onTodoItemToggle,
}: TodoListProps) => {
  const todoItems = useMemo(() => {
    return items.map(({ id, ...rest }) => (
      <TodoListItem
        key={id}
        {...rest}
        onEdit={() => onTodoItemEdit(id)}
        onDelete={() => onTodoItemDelete(id, rest.title)}
        onToggle={() => onTodoItemToggle(id)}
      />
    ));
  }, [items, onTodoItemDelete, onTodoItemEdit, onTodoItemToggle]);

  return (
    <Grid
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
        'repeat(4, 1fr)',
      ]}
      gap={6}
      p={4}
    >
      {todoItems}
    </Grid>
  );
};

const TodoListItem = ({
  title,
  note,
  done,
  onEdit,
  onDelete,
  onToggle,
}: TodoListItemProps) => {
  const toggleButton = {
    ariaLabel: done ? 'Done' : 'Not done',
    colorScheme: done ? 'blue' : 'gray',
    tooltip: done
      ? "Press the button if you haven't done it yet"
      : 'Press the button if you have done this',
  };

  return (
    <Card maxW="sm" position="relative">
      <Flex position="absolute" top={2} right={2} columnGap={1}>
        <IconButton
          icon={<EditIcon />}
          aria-label="Edit Todo"
          colorScheme="orange"
          onClick={onEdit}
        ></IconButton>
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete Todo"
          colorScheme="red"
          onClick={onDelete}
        ></IconButton>
      </Flex>
      <CardBody h="136px" minH="136px">
        <Heading size="md" noOfLines={1}>
          {title}
        </Heading>
        <Text noOfLines={3} mt={4}>
          {note}
        </Text>
      </CardBody>
      <Divider color="blackAlpha.300" />
      <CardFooter>
        <Tooltip label={toggleButton.tooltip}>
          <IconButton
            w="100%"
            variant="solid"
            colorScheme={toggleButton.colorScheme}
            aria-label={toggleButton.ariaLabel}
            fontSize="20px"
            icon={<CheckIcon />}
            onClick={onToggle}
          />
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default TodoList;
