import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, updateUserDetails } from "../../store/features/users/usersSlice.js";
import '../../styles/User/UserDetails.scss';
import IButton from "../UI/button/IButton.jsx";
import IInput from "../UI/input/IInput.jsx";

const UserDetails = ({ userId }) => {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.users.details[userId]);
    const loading = useSelector(state => state.users.status) === 'pending';
    const error = useSelector((state) => state.users.error);

    const [editableDetails, setEditableDetails] = useState(null);
    const [toShowEditableDetails, setToShowEditableDetails] = useState(false);

    useEffect(() => {
        if (!userDetails) {
            dispatch(fetchUserDetails(userId))
                .unwrap()
                .then((payload) => {
                    setEditableDetails(payload);
                })
                .catch((e) => {
                    throw e;
                });
        }
    }, [dispatch, userId, userDetails]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditableDetails({
            ...editableDetails,
            [name]: value
        });
    };

    const handleSubmit = () => {
        dispatch(updateUserDetails({ userId, updatedDetails: editableDetails }));
        setToShowEditableDetails(false);
    };

    const toggleEdit = () => {
        setToShowEditableDetails(prevState => !prevState);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>

    return (
        <div className={'user_details'}>
            {userDetails && (
                <div className={'user_details_content'}>
                    <p>Name: {userDetails.name ?? 'N/A'}</p>
                    <p>Email: {userDetails.email ?? 'N/A'}</p>
                    {userDetails.address && (
                        <>
                            <p>Street: {userDetails.address.street ?? 'N/A'}</p>
                            <p>Suite: {userDetails.address.suite ?? 'N/A'}</p>
                            <p>City: {userDetails.address.city ?? 'N/A'}</p>
                            <p>Zipcode: {userDetails.address.zipcode ?? 'N/A'}</p>
                        </>
                    )}
                    {userDetails.address.geo && ( //We could easily send a request, but data is fake...
                        <>
                            <p>Latitude: {userDetails.address.geo.lat ?? 'N/A'}</p>
                            <p>Longitude: {userDetails.address.geo.lng ?? 'N/A'}</p>
                        </>
                    )}
                    <p>Phone: {userDetails.phone ?? 'N/A'}</p>
                    <p>Website: {userDetails.website ?? 'N/A'}</p>
                    {userDetails.company && (
                        <>
                            <p>Company: {userDetails.company.name ?? 'N/A'}</p>
                            <p>Catch Phrase: {userDetails.company.catchPhrase ?? 'N/A'}</p>
                            <p>BS: {userDetails.company.bs ?? 'N/A'}</p>
                        </>
                    )}

                    <IButton onClick={toggleEdit}>
                        {toShowEditableDetails ? 'Cancel Edit' : 'Edit'}
                    </IButton>

                    {toShowEditableDetails && editableDetails && (
                        <div className={'user_details_content'}>
                            <IInput type="text" name="name" value={editableDetails.name} onChange={handleChange} />
                            <IInput type="text" name="email" value={editableDetails.email} onChange={handleChange} />
                            <IInput type="text" name="phone" value={editableDetails.phone} onChange={handleChange} />
                            <div>We could add more if its necessary...</div>
                            <IButton onClick={handleSubmit}>Save</IButton>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserDetails;
