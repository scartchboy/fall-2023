import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Divider,
    Grid,
} from '@material-ui/core';
import { Edit, Save, Cancel, Lock } from '@material-ui/icons';
import './Profile.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/userSlice'
import axios from 'axios';
import {toast} from 'react-toastify'


// const PROFILEDATA = {
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'johndoe@example.com',
// }

function Profile() {

    const user = useSelector(selectUser)

    const [editMode, setEditMode] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (user) {
            setFirstName(user?.firstname || "");
            setLastName(user?.lastname || "");
        }
    }, [])

    const toggleEditMode = () => {
        if (!editMode && showChangePassword) {
            setShowChangePassword(false);
        }
        setEditMode(!editMode);
    };

    const handleSave = () => {
        axios({
            url: 'http://localhost:5000/v1/user/updateProfile',
            method: "POST",
            data: {
                firstName: firstName,
                lastName: lastName
            },
            headers: {
                authorization: `Bearer ${user && user.accessToken}`,
            }
        })
            .then((res) => {
                console.log(res);
                alert('Successfully updated profile');
                toast.success("Successfully updated profile", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }).catch(e => {
                toast.error("Error while updating profile", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
                console.log(e)   
            })
        setEditMode(false);
    };

    const handleUpdatePassword = () => {
        axios({
            url: 'http://localhost:5000/v1/user/changePassword',
            method: "POST",
            data: {
                oldPassword: currentPassword,
                newPassword: newPassword
            },
            headers: {
                authorization: `Bearer ${user && user.accessToken}`,
            }
        }) .then((res) => {
            toast.success('Successfully updated the password', {
                position:toast.POSITION.BOTTOM_LEFT
            })
            console.log('Successfully updated the password');
        }).catch(e => {
            toast.error("Error occured while updating the password",{
                position:toast.POSITION.BOTTOM_LEFT
            })
            console.log(e)
        })
        setShowChangePassword(true);
    }

    const handleChangePassword = () => {
        if (editMode) {
            toggleEditMode();
        }
        setShowChangePassword(true);
    };

    const handleCancelPasswordChange = () => {
        setShowChangePassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <Container maxWidth="sm" >
            <Paper elevation={3} className='container-div' style={{ padding: '20px', marginTop: '20px' }}>
                <h2>My Profile</h2>
                <Divider style={{ margin: '20px 0' }} />

                <TextField
                    label="First Name"
                    fullWidth
                    className='inputClass'
                    margin="normal"
                    value={firstName}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                    label="Last Name"
                    className='inputClass'
                    fullWidth
                    margin="normal"
                    value={lastName}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => setLastName(e.target.value)}

                />

                <TextField
                    label="Email"
                    className='inputClass'
                    fullWidth
                    margin="normal"
                    value={user && user.email}
                    InputProps={{
                        readOnly: true,
                    }}
                    disabled={true}
                />

                {!editMode ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleEditMode}
                        startIcon={<Edit />}
                    >
                        Edit Profile
                    </Button>
                ) : (
                    <div className='passwordActionBtsGrp'>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={toggleEditMode}
                            startIcon={<Cancel />}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            startIcon={<Save />}
                        >
                            Save
                        </Button>
                    </div>
                )}

                {
                    !showChangePassword &&
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Lock />}
                                onClick={handleChangePassword}
                            >
                                Update Password
                            </Button>
                        </Grid>
                    </Grid>
                }

                {showChangePassword && (
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            label="Current Password"
                            className='inputClass'
                            type="password"
                            fullWidth
                            margin="normal"
                            value={currentPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)
                            }
                        />

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
                        <div className="passwordActionBtsGrp">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCancelPasswordChange}
                                startIcon={<Cancel />}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleUpdatePassword} variant="contained" color="primary" startIcon={<Save />}>
                                Save Password
                            </Button>
                        </div>
                    </div>
                )}
            </Paper>
        </Container>
    );
}

export default Profile;
