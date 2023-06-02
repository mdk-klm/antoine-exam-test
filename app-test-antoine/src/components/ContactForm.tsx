import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Action, Contact } from '../reducer/contactsReducer';

interface ContactFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Contact | undefined;
  toggleModal: () => void;
}

const ContactForm: FC<ContactFormProps> = ({
  
  dispatch,
  dataToEdit,
  toggleModal
}) => {
  const [contact, setContact] = useState({
    title: dataToEdit?.title ? dataToEdit.title : '',
    note: dataToEdit?.note ? dataToEdit.note : '',
    commentary: dataToEdit?.commentary ? dataToEdit.commentary : ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setContact((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, note, commentary } = contact;

    if (
      title.trim() === '' ||
      note.trim() === '' ||
      commentary.trim() === ''
    ) {
      setErrorMsg('All the fields are required.');
      return;
    } 

    if (!dataToEdit) {
      dispatch({
        type: 'ADD_CONTACT',
        payload: {
          id: Date.now(), // returns current timestamp
          ...contact
        }
      });
      setContact({
        title: '',
        note: '',
        commentary: ''
      });
      setErrorMsg('');
    } else {
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: {
          id: dataToEdit.id,
          updates: {
            id: Date.now(),
            ...contact
          }
        }
      });
      toggleModal();
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className='contact-form'>
      {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
      <Form.Group controlId='title'>
        <Form.Label>Titre</Form.Label>
        <Form.Control
          className='title'
          name='title'
          value={contact.title}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group  controlId='note'>
        <Form.Label>Note</Form.Label>
        <Form.Control
          className='note'
          name='note'
          value={contact.note}
          type='number'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='commentary'>
        <Form.Label>Commentaire</Form.Label>
        <Form.Control
          className='commentary'
          name='commentary'
          value={contact.commentary}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='submit'>
        <Button variant='secondary' type='submit' className='submit-btn'>
          {dataToEdit ? 'Update Contact' : 'Ajouter note'}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ContactForm;