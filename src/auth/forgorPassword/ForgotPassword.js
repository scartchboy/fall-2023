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
import { Link } from 'react-router-dom';

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        console.log(email);
        setEmail("");
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} className='paper-div'>
                <h2>Forgot Password</h2>
                <Divider style={{ margin: '20px 0' }} />

                <TextField
                    label="Email"
                    style={{ backgroundColor: '#ffffff' }}
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit()}
                    startIcon={<SendOutlined />}
                >
                    Send Mail
                </Button>
                <pre>Get back to login? </pre>
                <Link to="/">
                    <a>back</a>
                </Link>
            </Paper>
        </Container>
    )
}

export default ForgotPassword