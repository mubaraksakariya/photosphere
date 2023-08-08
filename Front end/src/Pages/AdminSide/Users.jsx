import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminNav from '../../Componants/Admin/AdminNav';
import AdminNavTop from '../../Componants/Admin/AdminNavTop';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosContext from '../../Contexts/AxioContext';
import UserTableRow from '../../Componants/Admin/UsersTableRow';
import { v4 as uuidv4 } from 'uuid';
function Users() {
    const navigate = useNavigate()
    const isAdmin = useSelector(state => state.isAdmin)
    const axiosInstance = useContext(AxiosContext)
    const [users, setUsers] = useState([])
    const [searchString, setSearchString] = useState("")
    const location = useLocation()
    useLayoutEffect(() => {
        if (!isAdmin) navigate(-1)
        manageSearch()
        localStorage.setItem('current_path', location.pathname)
    }, [])

    const manageSearch = () => {
        const params = {
            searchString: searchString,
        };
        axiosInstance.get('admin/allusers', { params }).then((response) => {
            let allusers = response.data.users
            if (allusers) {
                setUsers(allusers)
            }
        })
    }
    return (
        <div className="row justify-content-center g-2 p-3">
            <div className="col-2">
                <AdminNav />
            </div>
            <div className="col-10">
                <div>
                    <AdminNavTop />
                </div>
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col">
                        <div className='row justify-content-center align-items-center g-2'>
                            <div className='col-9'></div>
                            <div className='col'>
                                <div className="d-flex py-3" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search users" aria-label="Search"
                                        value={searchString}
                                        onChange={(e) => {
                                            setSearchString(e.target.value)
                                        }}
                                    />
                                    <button className="btn btn-outline-success" type="button"
                                        onClick={manageSearch}
                                    >Search</button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <UserTableRow key={uuidv4()} user={user} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users