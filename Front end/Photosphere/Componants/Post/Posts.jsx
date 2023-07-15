import React, { useContext, useEffect, useRef, useLayoutEffect, useState } from 'react'
import './Posts.css'
import Post from './Post'
import AxiosContext from '../../Contexts/AxioContext'
import { HomeContext } from '../../Contexts/HomeContext'
import Spinner from '../Others/Spinner'
import { v4 as uuidv4 } from 'uuid';
function Posts() {
    const axioinstance = useContext(AxiosContext)
    const { setPosts, posts, createpost, isLoading, setIsLoading } = useContext(HomeContext)
    const [page, setPage] = useState(1)
    const observerRef = useRef(null);
    const [endOfFeed, setEndOfFeed] = useState(false)

    useEffect(() => {
        axioinstance.get('post/getfeed', { params: { page: page } }).then((response) => {
            if (response.data.result) {
                let newPosts = response.data.posts
                setPosts((prevPosts) => {
                    if (page === 1) {
                        return newPosts;
                    } else {
                        let filteredPosts = newPosts.filter((newPost) => {
                            return !prevPosts.find((post) => post.id === newPost.id)
                        })
                        return [...prevPosts, ...filteredPosts];
                    }
                });
            }
            else {
                observerRef.current.style.display = "none"
                setEndOfFeed(true)
            }
            if (posts) setIsLoading(false)
        })
    }, [page])

    useEffect(() => {
        setIsLoading(false)
    }, [posts, createpost])


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
            {isLoading &&
                <Spinner />
            }
            {posts.map((post, index) => {
                return (
                    <Post key={uuidv4()} post={post} />
                )
            })}
            <div ref={observerRef}>End of feed</div>
            {endOfFeed && <div>End of feed</div>}
        </div>
    )
}

export default Posts