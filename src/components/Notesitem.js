import React from 'react'

function Notesitem(props) {
    const { notes } = props;
    return (
        <div className='col-md-3'>

            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{notes.Title}</h5>
                    <p className="card-text"> {notes.Description}</p>

                </div>
            </div>

        </div>
    )
}

export default Notesitem
