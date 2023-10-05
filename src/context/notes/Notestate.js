import Notecontext from "./Notecontext";
import { useState } from "react";

const Notestate = (props) => {
    const s1 =
    {
        "Name": "Arslan",
        "class": "graduation"
    }
    const [state, setstate] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setstate({
                "Name": "Usman",
                "class": "post graduation"
            })
        }, 1000);
    }
    return (
        <Notecontext.Provider value={{ state, update }}>
            {props.children}
        </Notecontext.Provider>



    )

}

export default Notestate;