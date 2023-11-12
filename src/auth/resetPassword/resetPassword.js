import React, { useEffect, useState } from 'react'
import {
    Container,
    Paper,
    TextField,
    Button,
    Divider,
} from '@material-ui/core';
import './resetPassword.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Check } from '@material-ui/icons';

function ResetPassword() {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    function handleSubmit(e) {
        setNewPassword("");
        setConfirmPassword("");
    }

    useEffect(() => {

    }, [])

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} className='paper-div'>
                <h2>Reset Password</h2>
                <Divider style={{ margin: '20px 0' }} />

                <TextField
                    label="New Password"
                    className='inputClass'
                    type="password"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)
                    }
                />

                <TextField
                    label="Confirm Password"
                    className='inputClass'
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)
                    }
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<Check />}
                >
                    Confirm
                </Button>
            </Paper>
        </Container>
    )
}

export default ResetPassword