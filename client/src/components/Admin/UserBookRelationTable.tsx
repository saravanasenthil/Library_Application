
import React, { useState } from 'react';
import Modal from 'react-modal';
import '../Style/UserBookRelation.css';
import axios from 'axios';

interface UserBookRelation {
    UBID :number;
    usernameId: number;
    booknameId: number;
    endDate: string;
    startDate : string
}

interface UserBookRelationCardProps {
    isOpen: boolean; 
    onRequestClose: () => void;
}

const UserBookRelationCard: React.FC<UserBookRelationCardProps> = ({ onRequestClose }) => {
    const [relations, setRelations] = useState<UserBookRelation[]>([
        
    ]);

    const handleDeleteRelation = (userId: number, bookId: number) => {
        axios.delete(`http://localhost:9002/admin//deleteUB/${userId}`)
            .then(() => {
                setRelations(relations.filter(rel => !(rel.usernameId === userId && rel.booknameId === bookId)));
            })
            .catch(error => console.error('Error deleting relation:', error));
    };

    const handleUpdateEndDate = (usernameId: number, booknameId: number, newEndDate: string) => {
        setRelations(
            relations.map(rel =>
                rel.usernameId === usernameId && rel.booknameId === booknameId
                    ? { ...rel, endDate: newEndDate }
                    : rel
                    
            )
        );
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onRequestClose}
            contentLabel="User-Book Relation"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>User-Book Relations</h2>
            <table className="relation-table">
                <thead>
                    <tr>
                        <th>UsernameID</th>
                        <th>BookbookID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {relations.map(rel => (
                        <tr key={`${rel.usernameId}-${rel.booknameId}`}>
                            <td>{rel.usernameId}</td>
                            <td>{rel.booknameId}</td>
                            <td>{rel.startDate}</td>
                            <td>{rel.endDate}</td>
                            <td>
                                <button onClick={() => handleDeleteRelation(rel.usernameId, rel.booknameId)}>Delete</button>
                                <button onClick={() => handleUpdateEndDate(rel.usernameId, rel.booknameId, prompt('Enter new end date:', rel.endDate) || rel.endDate)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onRequestClose} className="close-button">Close</button>
        </Modal>
    );
};

export default UserBookRelationCard;
