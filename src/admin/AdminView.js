// AdminView.js

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import './AdminView.css'
import axios from 'axios';

import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function AdminView() {
  const [users, setUsers] = useState(generateUsers(10));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  function generateUsers(count) {
    const users = [];
    for (let i = 1; i <= count; i++) {
      users.push({
        id: i,
        userName: `User ${i}`,
        email: `user${i}@example.com`,
        approved: false,
        declined: false,
      });
    }
    return users;
  }

  useEffect(() => {

    if (!user || !user.isAdmin) {
      navigate('/search-page')
    }
    console.log(user.accessToken);
    axios({
      url: 'http://localhost:5000/v1/admin/getVerificationUsers',
      method: 'GET',
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      }
    }).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    })
  }, [])

  const handleApprove = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.approved = true;
        user.declined = false;
      }
      return user;
    });
    setUsers(updatedUsers);
    setSnackbarMessage(`User ${userId} has been approved.`);
    setOpenSnackbar(true);
  };

  const handleDecline = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.approved = false;
        user.declined = true;
      }
      return user;
    });
    setUsers(updatedUsers);
    setSnackbarMessage(`User ${userId} has been declined.`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="admin-view">
      <h3>User Requests</h3>
      <div className="card-list">
        {users.map((user) => (
          <Card key={user.id} variant="outlined" className="user-card">
            <CardContent>
              <h3>{user.userName}</h3>
              <p>Email: {user.email}</p>
            </CardContent>
            <CardActions className="actions">
              {user.approved ? (
                <Button variant="contained" color="primary" disabled>
                  Approved
                </Button>
              ) : user.declined ? (
                <Button variant="contained" color="secondary" disabled>
                  Declined
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApprove(user.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDecline(user.id)}
                  >
                    Decline
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default AdminView;
