import React, { useContext, useEffect } from 'react';
import Notecontext from '../context/notes/Notecontext';

export default function About() {
    const a = useContext(Notecontext);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        a.update();
    }, []);

    return (
        <div>
            This is {a.state.Name} and my class is {a.state.class}
        </div>
    );
}
