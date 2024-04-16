import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../store/features/users/usersSlice.js";
import '../../styles/User/UserDetails.scss';

const UserDetails = ({ userId }) => {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.users.details[userId]);
    const loading = useSelector(state => state.users.status) === 'pending';

    useEffect(() => {
        if (!userDetails) {
            dispatch(fetchUserDetails(userId));
        }
    }, [dispatch, userId]);

    if (loading) return <div>Loading...</div>;
    if (!userDetails) return <div>Error: Unable to fetch user details</div>;

    return (
        <div className={'user_details'}>
            <div className={'user_details_content'}>
                <p>{userDetails.name}</p>
                <p>Email: {userDetails.email}</p>
                <p>Street: {userDetails.address.street}</p>
                <p>Suite: {userDetails.address.suite}</p>
                <p>City: {userDetails.address.city}</p>
                <p>Zipcode: {userDetails.address.zipcode}</p>
                <p>Location: </p>
                <p>Phone: {userDetails.phone}</p>
                <p>Website: {userDetails.website}</p>
                <p>Company: {userDetails.company.name}</p>
                <p>Catch Phrase: {userDetails.company.catchPhrase}</p>
                <p>BS: {userDetails.company.bs}</p>
            </div>
        </div>
    );
};

export default UserDetails;
