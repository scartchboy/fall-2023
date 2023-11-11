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
import axios from 'axios';
import { toast } from 'react-toastify';

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        console.log(email);
        axios({
            url: 'http://localhost:5000/v1/auth/user/resetPassword',
            method: 'POST',
            data: {
                email : email
            }
        }).then(res => {
            if(res.status == 200){
                toast.warn("Please check the mail for reset link", {
                    position:toast.POSITION.BOTTOM_LEFT
                })
            }
            toast.error("Error occured!! Please try again", {
                position:toast.POSITION.BOTTOM_LEFT
            })
        }).catch(e => {
            toast.error("Error occured!! Please try again", {
                position:toast.POSITION.BOTTOM_LEFT
            })
            console.log(e);
        })
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
                    onClick={handleSubmit}
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