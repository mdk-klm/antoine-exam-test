import { useEffect, useReducer, useState } from 'react';
import ContactForm from './components/NoteForm';
import ContactList from './components/NoteList';
import EditModal from './components/EditModal';
import Header from './components/Header';
import { Rate, ratesReducer, State } from './reducer/ratesReducer';

const initialState: State = {
  rates: []
};

function App() {
  const [state, dispatch] = useReducer(ratesReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<Rate | undefined>(undefined);

  useEffect(() => {
    if (!showModal) {
      setDataToEdit(undefined);
    }
  }, [showModal]);

  const toggleModal = () => {
    setShowModal((show) => !show);
  };

  const handleEdit = (id: number) => {
    setDataToEdit(state.rates.find((rate) => rate.id === id));
    toggleModal();
  };

  return (
    <div className='App'>
      <Header />
      <div className='main-container'>
        <ContactForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
        <hr />
        {state.rates.length > 0 && (
          <ContactList
            rates={state.rates}
            handleEdit={handleEdit}
            dispatch={dispatch}
          />
        )}
      </div>
      <EditModal
        showModal={showModal}
        dataToEdit={dataToEdit}
        toggleModal={toggleModal}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
