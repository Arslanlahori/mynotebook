import React, { useContext } from 'react'
import Notecontext from '../context/notes/Notecontext';
import Notesitem from './Notesitem';

function Notes() {
    const context = useContext(Notecontext);
    const { notes, setNotes } = context;
    return (
        <div className="row my-3">
            <h1>Your Note</h1>
            {notes.map((notes) => {
                return <Notesitem notes={notes} />
            })}
        </div>
    )
}

export default Notes
