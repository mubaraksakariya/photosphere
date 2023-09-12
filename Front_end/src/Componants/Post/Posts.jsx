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
                let newPostIds = response.data.posts;

                setPosts((prevPosts) => {
                    if (page === 1) {
                        return newPostIds;
                    } else {
                        let filteredIds = newPostIds.filter((postId) => !prevPosts.includes(postId));
                        return [...prevPosts, ...filteredIds];
                    }
                });

                if (posts) setIsLoading(false);
            } else {
                observerRef.current.style.display = "none";
                setEndOfFeed(true);
            }
        });
    }, [page]);


    useEffect(() => {
        setIsLoading(false)
    }, [createpost])


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
        <div className="conainer-fluid   d-flex flex-column justify-content-center align-items-center " style={{ minWidth: '50vw' }}>
            {isLoading &&
                <Spinner />
            }
            {posts.map((post) => {
                return (
                    <Post key={uuidv4()} post_id={post} />
                )
            })}
            <div ref={observerRef}>End of feed</div>
            {endOfFeed && <div>End of feed</div>}
        </div>
    )
}

export default Posts