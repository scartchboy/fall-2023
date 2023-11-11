import React, { useEffect, useState } from 'react';
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
import { Check } from '@material-ui/icons';
import './TwoAuth.css'

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';

function TwoAuth() {

    const [otp, setOtp] = useState(['', '', '', '']);

    const user = useSelector(selectUser);

    useEffect(() => {
    }, [])

    const handleOtpChange = (index, value) => {
        if (!isNaN(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Automatically move focus to the next input field
            if (index < otp.length - 1 && newOtp[index] != '') {
                const nextInput = document.getElementById(`otp-input-${index + 1}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }

        } else if (value === '' && index > 0) {
            // Handle backspace by moving focus to the previous input
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            if (index > 0) {
                const previousInput = document.getElementById(`otp-input-${index - 1}`);
                if (previousInput) {
                    previousInput.focus();
                }
            }
        }
    };

    const handleSubmit = () => {
        const enteredOtp = otp.join('');
        console.log('Entered OTP:', enteredOtp);
    };

    return (
        <Container maxWidth="sm">
            <h2>Welcome {user && user.firstname} {user && user.lastname}</h2>
            <Paper elevation={3} style={{ backgroundColor:"#00000090", padding: '20px', marginTop: '20px' }}>
                <h2>Enter One Time Password</h2>
                <Divider style={{ margin: '20px 0' }} />

                <div style={{ padding: "20px" }}>
                    {otp.map((digit, index) => (
                        <TextField
                            key={index}
                            className={'otpTextField'}
                            variant="outlined"
                            size="small"
                            type="text"
                            value={digit}
                            inputProps={{ maxLength: 1 }}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            id={`otp-input-${index}`}
                        />
                    ))}
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit()}
                    startIcon={<Check />}
                >
                    Confirm
                </Button>
            </Paper>
        </Container>
    )
}

export default TwoAuth