import React, { useContext, useEffect, useRef, useLayoutEffect, useState } from 'react'
import './Posts.css'
import Post from './Post'
import AxiosContext from '../../Contexts/AxioContext'
function Posts() {
    const axioinstance = useContext(AxiosContext)
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const observerRef = useRef(null);
    const [endOfFeed, setEndOfFeed] = useState(false)
    useEffect(() => {
        axioinstance.get('post/getfeed', { params: { page: page } }).then((response) => {
            if (response.data.result) {
                let newPosts = response.data.posts
                setPosts([...posts, ...newPosts]);
            }
            else {
                observerRef.current.style.display = "none"
                setEndOfFeed(true)
            }
        })
    }, [page])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setPage((page) => page + 1);

                }
            });
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, []);

    return (
        <div className="conainer-fluid   d-flex flex-column justify-content-center align-items-center " style={{ minWidth: '50vw', overflow: 'auto' }}>
            {posts.map((post) => {

                return (
                    <Post key={`posts${post.id}`} post={post} />
                )
            })}
            <div ref={observerRef}>End of feed</div>
            {endOfFeed && <div>End of feed</div>}
        </div>
    )
}

export default Posts