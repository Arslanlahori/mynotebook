import Notecontext from "./Notecontext";
import { useState } from "react";

const Notestate = (props) => {

    const initialnotes = [
        {
            "_id": "651f47b5a17063d06baade6b",
            "User": "651e82fc1f9340732159a3cc",
            "Title": "Talha notes",
            "Description": "Helloe this the discription of my first Talha nptes",
            "Tag": "Personal/logical",
            "Date": "2023-10-05T23:33:09.741Z",
            "__v": 0
        },
        {
            "_id": "651f47b7a17063d06baade6d",
            "User": "651e82fc1f9340732159a3cc",
            "Title": "Talha notes",
            "Description": "Helloe this the discription of my first Talha nptes",
            "Tag": "Personal/logical",
            "Date": "2023-10-05T23:33:11.383Z",
            "__v": 0
        },
        {
            "_id": "651f47b8a17063d06baade6f",
            "User": "651e82fc1f9340732159a3cc",
            "Title": "Talha notes",
            "Description": "Helloe this the discription of my first Talha nptes",
            "Tag": "Personal/logical",
            "Date": "2023-10-05T23:33:12.354Z",
            "__v": 0
        }

    ]
    const [notes, setNotes] = useState(initialnotes)


    return (
        <Notecontext.Provider value={{ notes, setNotes }}>
            {props.children}
        </Notecontext.Provider>



    )

}

export default Notestate;