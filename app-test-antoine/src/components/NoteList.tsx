import { FC } from 'react';
import { Action, Rate } from '../reducer/ratesReducer';
import ContactItem from './NoteItem';

interface ContactListProps {
  rates: Rate[];
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

const NoteList: FC<ContactListProps> = ({ rates, handleEdit, dispatch }) => {
  return (
      <div className="contacts-list">
          <h3 className="contacts-list-title">List of Notes</h3>
          <div className="contacts-list-table-container">
              <table className="contacts-list-table">
                  <thead className="contacts-list-header">
                  <tr>
                      <th>Titre</th>
                      <th>Note</th>
                      <th>Commentaire</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {rates.map((com) => {
                      let backgroundColor = '';

                      if (com.note < 8) {
                          backgroundColor = 'red';
                      } else if (com.note < 10) {
                          backgroundColor = 'orange';
                      } else if (com.note < 13) {
                          backgroundColor = 'yellow';
                      } else {
                          backgroundColor = 'green';
                      }

                      return (
                          <ContactItem
                              key={com.id}
                              {...com}
                              handleEdit={handleEdit}
                              dispatch={dispatch}
                              backgroundColor={backgroundColor}
                          />
                      );
                  })}
                  </tbody>
              </table>
          </div>
      </div>
  );
};
export default NoteList;
