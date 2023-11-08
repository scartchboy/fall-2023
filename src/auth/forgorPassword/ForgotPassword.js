import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    Divider,
    Grid,
} from '@material-ui/core';
import { SendOutlined } from '@material-ui/icons';
import './ForgotPassword.css'

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        console.log(email);
        setEmail("");
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4">Forgot Password</Typography>
                <Divider style={{ margin: '20px 0' }} />

                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleSubmit()}
                    startIcon={<SendOutlined />}
                >
                    Send Mail
                </Button>
            </Paper>
        </Container>
    )
}

export default ForgotPassword