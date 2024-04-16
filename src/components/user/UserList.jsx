import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from "../../store/features/users/usersSlice.js";
import '../../styles/User/UserList.scss'
import UserItem from "./UserItem.jsx";
import Search from "../search/Search.jsx";

function UsersList() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.users.status) === 'loading';
    const error = useSelector((state) => state.users.error);

    const[searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={'user_list'}>
            <Search value={searchQuery} onChange={handleSearchChange} />
            {filteredUsers.map(user => (
                <UserItem key={user.id} user={user}/>
            ))}
        </div>
    );
}

export default UsersList;
