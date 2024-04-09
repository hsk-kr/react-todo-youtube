import { useDisclosure } from '@chakra-ui/react';
import Header from './Header';
import TodoList from './TodoList';
import TodoModal from './TodoModal';
import Tools from './Tools';
import { Todo } from '../types/todo';
import { ComponentProps, useCallback, useEffect, useState } from 'react';
import uniqid from 'uniqid';

const TodoComp = () => {
  const {
    isOpen,
    onOpen: openTodoModal,
    onClose: closeTodoModal,
  } = useDisclosure();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [initialFormData, setInitialFormData] = useState<{
    title: string;
    note: string;
  }>({
    title: '',
    note: '',
  });

  const addTodo = (data: Todo) =>
    setTodos((prevTodos) => prevTodos.concat(data));

  const handleTodoModalSubmit: ComponentProps<typeof TodoModal>['onSubmit'] = (
    data
  ) => {
    const isEdit = selectedTodoId !== null;

    if (isEdit) {
      setTodos((prevTodos) =>
        prevTodos.map((item) => {
          if (item.id === selectedTodoId) {
            return {
              ...item,
              title: data.title,
              note: data.note,
            };
          }

          return item;
        })
      );
    } else {
      addTodo({
        id: uniqid(),
        done: false,
        ...data,
      });
    }

    closeTodoModal();
  };

  const handleTodoItemEdit: ComponentProps<typeof TodoList>['onTodoItemEdit'] =
    useCallback((id) => {
      setSelectedTodoId(id);
    }, []);

  const handleTodoItemDelete: ComponentProps<
    typeof TodoList
  >['onTodoItemDelete'] = useCallback((id, title) => {
    if (confirm(`Are you really want to delete "${title}" item?`)) {
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
    }
  }, []);

  const handleAddModalOpen = () => {
    setSelectedTodoId(null);
    setInitialFormData({
      title: '',
      note: '',
    });
    openTodoModal();
  };

  const handleTodoItemToggle: ComponentProps<
    typeof TodoList
  >['onTodoItemToggle'] = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }

        return item;
      })
    );
  }, []);

  useEffect(() => {
    if (selectedTodoId === null) return;

    const todo = todos.find((t) => t.id === selectedTodoId);
    if (!todo) return;

    setInitialFormData({
      title: todo.title,
      note: todo.note,
    });
    openTodoModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodoId]);

  const isTodoModalEdit = selectedTodoId !== null;

  return (
    <>
      <Header />
      <Tools onAddModalOpen={handleAddModalOpen} />
      <TodoList
        items={todos}
        onTodoItemEdit={handleTodoItemEdit}
        onTodoItemDelete={handleTodoItemDelete}
        onTodoItemToggle={handleTodoItemToggle}
      />
      <TodoModal
        isOpen={isOpen}
        onClose={closeTodoModal}
        onSubmit={handleTodoModalSubmit}
        isEdit={isTodoModalEdit}
        initialTitle={initialFormData.title}
        initialNote={initialFormData.note}
      />
    </>
  );
};

export default TodoComp;
