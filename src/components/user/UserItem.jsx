import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/features/users/usersSlice.js";
import IButton from "../UI/button/IButton.jsx";
import UserDetails from "./UserDetails.jsx";
import '../../styles/User/UserItem.scss';

const UserItem = ({ user }) => {
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();

    const handleRemove = () => {
        if(window.confirm('Are you sure you want to remove this user?')) {
            dispatch(removeUser(user.id));
        }
    }

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className={'user_item'}>
            <div className={'user_item_name'} onClick={toggleDetails}>{user.name}</div>
            <div className={'user_item_buttons'}>
                <IButton onClick={toggleDetails}>{showDetails ? "Less Info" : "More Info"}</IButton>
                <IButton onClick={handleRemove}>Remove User</IButton>
            </div>
            {showDetails && <UserDetails userId={user.id} />}
        </div>
    );
};

export default UserItem;
