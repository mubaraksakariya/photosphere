import React, { useContext, useEffect, useState } from 'react';
import AxiosContext, { axiosInstance } from '../../Contexts/AxioContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const UserTableRow = ({ user }) => {
    const [user_d, setUser_d] = useState({})
    const axiosInstance = useContext(AxiosContext)
    useEffect(() => {
        setUser_d(user)
    }, [user])

    const manageBlock = (e) => {
        confirmAlert({
            title: 'Block/Unblock this user?',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axiosInstance.get('admin/toggleBlock', {
                        params: {
                            id: e.target.value,
                        },
                    }).then((response) => {
                        if (response.data.result) {
                            setUser_d(response.data.user)
                        }

                    })
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        });

    }
    return (
        <tr key={user_d.id}>
            <th scope="row">{user_d.id}</th>
            <td>{user_d.first_name}</td>
            <td>{user_d.last_name}</td>
            <td>{user_d.email}</td>
            <td>{user_d.username}</td>
            <td>
                {!user_d.is_blocked && <button className='btn btn-sm btn-danger w-100 px-4' value={user.id}
                    onClick={manageBlock}
                >Block</button>}
                {user_d.is_blocked && <button className='btn btn-sm btn-success w-100' value={user.id}
                    onClick={manageBlock}
                >Unblock</button>}
            </td>
        </tr>
    );
};

export default UserTableRow;