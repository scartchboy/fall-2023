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
import { Edit, Save, Cancel, Lock } from '@material-ui/icons';
import './Profile.css'

const PROFILEDATA = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
}

function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const [firstName, setFirstName] = useState(PROFILEDATA.firstName);
    const [lastName, setLastName] = useState(PROFILEDATA.lastName);

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const toggleEditMode = () => {
        if(!editMode && showChangePassword){
            setShowChangePassword(false);
        }
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Save the updated profile data to the server
        // Then exit edit mode
        setEditMode(false);
    };

    const handleChangePassword = () => {
        if(editMode){
            toggleEditMode();
        }
        setShowChangePassword(true);
    };

    const handleCancelPasswordChange = () => {
        setShowChangePassword(false);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4">My Profile</Typography>
                <Divider style={{ margin: '20px 0' }} />

                <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                    value={firstName}
                    InputProps={{
                        readOnly: !editMode,
                    }}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                    label="Last Name"
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
                    fullWidth
                    margin="normal"
                    value={PROFILEDATA.email}
                    InputProps={{
                        readOnly: true,
                    }}
                    disabled={true}
                />

                {!editMode ? (
                    <Button
                        variant="outlined"
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
                            color="default"
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

                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Lock />}
                            onClick={handleChangePassword}
                        >
                            Update Password
                        </Button>
                    </Grid>
                </Grid>

                {showChangePassword && (
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            label="Current Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, currentPassword: e.target.value })
                            }
                        />

                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, newPassword: e.target.value })
                            }
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                            }
                        />
                        <div className="passwordActionBtsGrp">
                            <Button
                                variant="outlined"
                                color="default"
                                onClick={handleCancelPasswordChange}
                                startIcon={<Cancel />}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" startIcon={<Save />}>
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
