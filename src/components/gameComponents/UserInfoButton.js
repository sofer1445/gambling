import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UserInfoContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  margin: auto;
`;

const UserInfoLine = styled.p`
  margin-bottom: 10px;
`;

const PasswordLine = styled(UserInfoLine)`
    &:hover {
        cursor: pointer;
    }
`;

const UserInfoButton = ({ secretNewUser }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:9125/get-user-by-secret", {
            params: { secretNewUser }
        })
            .then((res) => {
                setUserInfo(res.data);
            })
            .catch((error) => {
                console.error('Error fetching user info: ', error);
            });
    }, [secretNewUser]);

    return (
        <UserInfoContainer>
            <h2>User Info</h2>
            <UserInfoLine>Username: {userInfo?.username}</UserInfoLine>
            <PasswordLine
                onMouseEnter={() => setShowPassword(true)}
                onMouseLeave={() => setShowPassword(false)}
            >
                Password: {showPassword ? userInfo?.password : '**'}
            </PasswordLine>
            <UserInfoLine>Email: {userInfo?.mail}</UserInfoLine>
            <UserInfoLine>Coins: {userInfo?.coins}</UserInfoLine>
        </UserInfoContainer>
    );
};

export default UserInfoButton;