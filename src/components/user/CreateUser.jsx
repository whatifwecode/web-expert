import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { createUser } from "../../store/features/users/usersSlice.js";
import IInput from "../UI/input/IInput.jsx";
import IButton from "../UI/button/IButton.jsx";
import '../../styles/User/CreateUser.scss'

function CreateUser() {
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createUser(newUser));
        setNewUser({
            name: '',
            email: '',
            phone: ''
        });
    };

    const isFormValid = () => {
        return newUser.name.trim() && newUser.email.trim() && newUser.phone.trim();
    };

    const users = useSelector((state) => state.users.users);

    return (
        <div className={'create_user'}>
            <h2 className={'create_user_title'}>Create New User</h2>
            <form onSubmit={handleSubmit}>
                <IInput
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <IInput
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                <IInput
                    type="tel"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                />
                <div className={'create_user_msg'}>We could add more in case we need it...</div>
                <IButton type="submit" disabled={!isFormValid()}>Create User</IButton>
            </form>
        </div>
    );
}

export default CreateUser;
