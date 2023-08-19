
import React, { createContext, useState } from 'react';

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
    const [createpost, setCreatePost] = useState(false);
    const [storyview, setStoryView] = useState({ story: false, story_id: null });
    const [isStory, setIsStory] = useState(false);
    const [stories, setStories] = useState([]);
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [storyUserList, setStoryUerList] = useState([])
    const [isPostview, setIsPostView] = useState({ post: false, post_id: null })
    const [isNotification, setIsNotification] = useState(false)

    return (
        <HomeContext.Provider
            value={{
                createpost,
                setCreatePost,
                storyview,
                setStoryView,
                isStory,
                setIsStory,
                // stories,
                // setStories,
                posts,
                setPosts,
                isLoading,
                setIsLoading,
                storyUserList,
                setStoryUerList,
                isPostview,
                setIsPostView,
                isNotification,
                setIsNotification

            }}
        >
            {children}
        </HomeContext.Provider>
    );
};

export { HomeContext, HomeProvider };
