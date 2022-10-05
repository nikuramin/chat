import React, { useState } from 'react';
import AuthForm from './AuthForm';
import Chat from './Chat';

function App() {
    const [u_name, setUName] = useState('');
    const onAuth = e => {
        e.preventDefault();
        setUName(e.target['u_name']?.value);
    };

    console.log('render app with ',{u_name});
    return (
        <div className="App">
            {u_name ?
                <Chat {...{ u_name }} />
                :
                <AuthForm {...{ onAuth }} />
            }
        </div>
    );
}

export default App;
