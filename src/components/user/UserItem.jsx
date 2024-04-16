import React, { useState } from "react";
import IButton from "../UI/button/IButton.jsx";
import UserDetails from "./UserDetails.jsx";
import '../../styles/User/UserItem.scss';

const UserItem = ({ user }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className={'user_item'}>
            <div className={'user_item_name'} onClick={toggleDetails}>{user.name}</div>
            <div className={'user_item_more-info'}>
                <IButton onClick={toggleDetails}>{showDetails ? "Less Info" : "More Info"}</IButton>
            </div>
            {showDetails && <UserDetails userId={user.id} />}
        </div>
    );
};

export default UserItem;
