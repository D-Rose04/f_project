import React from 'react'
import Comment from './Comment'
import CommentResponse from './CommentResponse'

function CommentItem({ comment }) {
    const { id, user, time, commentBody, replies } = comment;
    return (
        <div class="comment-element mt-4">
            <Comment user={user} time={time} body={commentBody} />
            {replies.map(r => <CommentResponse response={r} />)}

        </div>
    )
}

export default CommentItem