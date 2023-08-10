import React from 'react'
import Comment from './Comment'
import CommentResponse from './CommentResponse'

function CommentItem({ comment }) {
    const { id, user, time, body, replies } = comment;
    console.log(comment)
    return (
        <div className="comment-element mt-2">
            <Comment user={user} time={time} body={body} />
            {/* {replies.map(r => <CommentResponse response={r} />)} */}

        </div>
    )
}

export default CommentItem