import {
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export type FormData = {
  title: string;
  note: string;
};

interface TodoModalProps {
  onClose: VoidFunction;
  onSubmit: (data: FormData) => void;
  isOpen: boolean;
  isEdit: boolean;
  initialTitle?: string;
  initialNote?: string;
}

const TodoModal = ({
  onClose,
  onSubmit,
  isOpen,
  isEdit,
  initialTitle = '',
  initialNote = '',
}: TodoModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    note: '',
  });
  const initialRef = useRef(null);

  const handleFormDataChange = (key: keyof FormData) => (e: ChangeEvent) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: (e.target as HTMLInputElement).value,
    }));

  const handleSubmit = () => {
    if (formData.title.length === 0 || formData.note.length === 0) {
      alert('Fill the title and the note.');
      return;
    }

    onSubmit(formData);
  };

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      title: initialTitle,
      note: initialNote,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const title = isEdit ? 'Update Todo' : 'Create Todo';
  const submitButton = {
    text: isEdit ? 'Update' : 'Create',
    colorScheme: isEdit ? 'orange' : 'blue',
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Title"
              value={formData.title}
              onChange={handleFormDataChange('title')}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Note</FormLabel>
            <Textarea
              value={formData.note}
              onChange={handleFormDataChange('note')}
              placeholder="Note"
              size="sm"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={submitButton.colorScheme}
            mr={3}
            onClick={handleSubmit}
          >
            {submitButton.text}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoModal;
