import React from 'react';
import { FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Action, Contact } from '../reducer/contactsReducer';

interface ExtraProps {
    handleEdit: (id: number) => void;
    dispatch: React.Dispatch<Action>;
    backgroundColor: string;
}

const ContactItem: FC<Contact & ExtraProps> = ({
                                                       id,
                                                       title,
                                                       note,
                                                       commentary,
                                                       handleEdit,
                                                       dispatch,
                                                       backgroundColor
                                                   }) => {
    return (
        <tr style={{ backgroundColor }}>
            <td>{title}</td>
            <td>{note}</td>
            <td>{commentary}</td>
            <td>
                <AiFillEdit size={20} onClick={() => handleEdit(id)} className="icon" />
            </td>
            <td>
                <AiFillDelete
                    size={20}
                    onClick={() => {
                        const confirmDelete = window.confirm(
                            `Are you sure you want to delete this note ? ${title} ${note}?`
                        );
                        if (confirmDelete) {
                            dispatch({
                                type: 'DELETE_CONTACT',
                                payload: { id }
                            });
                        }
                    }}
                    className="icon"
                />
            </td>
        </tr>
    );
};

export default ContactItem;