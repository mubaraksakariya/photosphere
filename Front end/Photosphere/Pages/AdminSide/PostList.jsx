import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './PostList.css'
import AdminNav from '../../Componants/Admin/AdminNav'
import AdminNavTop from '../../Componants/Admin/AdminNavTop'
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosContext from '../../Contexts/AxioContext';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import PostsTableROw from '../../Componants/Admin/PostsTableROw';

function PostList() {
    const navigate = useNavigate()
    const [searchString, setSearchString] = useState("")
    const [posts, setPosts] = useState([])
    const isAdmin = useSelector(state => state.isAdmin)
    const axiosInstance = useContext(AxiosContext)
    const location = useLocation()
    useEffect(() => {
        console.log(posts);
    }, [posts])
    useLayoutEffect(() => {
        if (!isAdmin) navigate(-1)
        manageSearch()
        localStorage.setItem('current_path', location.pathname)
    }, [])
    const manageSearch = () => {
        const params = {
            searchString: searchString,
        };
        axiosInstance.get('admin/postlist', { params }).then((response) => {
            let allusers = response.data.allPosts
            if (allusers) {
                setPosts(allusers)
            }
        })
    }
    return (
        <div className="row justify-content-center g-2 p-3 ">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col-md-10">
                <div>
                    <AdminNavTop />
                </div>
                <div className='row justify-content-center align-items-center g-2'>
                    <div className='col-9'></div>
                    <div className='col'>
                        <form className="d-flex py-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search by id" aria-label="Search"
                                value={searchString}
                                onChange={(e) => {
                                    setSearchString(e.target.value)
                                }}
                            />
                            <button className="btn btn-outline-success" type="button"
                                onClick={manageSearch}
                            >Search</button>
                        </form>
                    </div>
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">User Id</th>
                                <th scope="col">Creation date</th>
                                <th scope="col">Media Count</th>
                                <th scope="col">Total Liks</th>
                                <th scope="col">Total Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <PostsTableROw key={uuidv4()} post={post} />
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default PostList