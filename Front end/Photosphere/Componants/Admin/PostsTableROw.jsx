import React from 'react'
import './PostsTableROw.css'
function PostsTableROw({ post }) {
    return (
        <tr>
            <th scope="row">{post.id}</th>
            <td>{post.user}</td>
            <td>{post.created_at}</td>
            <td>{post.media_files.length}</td>
            <td>{post.likes_count}</td>
            <td>{post.comments_count}</td>

        </tr>
    )
}

export default PostsTableROw