import React, { useState } from 'react';
const TwootContext = React.createContext([{}, () => { }]);

const TwootProvider = (props) => {
    const [state, setState] = useState({});
    return (
        <TwootContext.Provider value={[state, setState]}>
            {props.children}
        </TwootContext.Provider>
    );
}

export { TwootContext, TwootProvider };
