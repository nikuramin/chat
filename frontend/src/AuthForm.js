import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const AuthForm = ({ onAuth }) => <Dialog open>
    <DialogTitle>Enter username</DialogTitle>
    <form {...{ onSubmit: onAuth, style: { marginTop: '8px' } }}>
        <DialogContent>
            <TextField {...{ label: 'user name', name: 'u_name' }} />
        </DialogContent>
        <DialogActions>
            <Button {...{ type: 'submit' }}>Enter</Button>
        </DialogActions>
    </form>
</Dialog>

export default AuthForm;
