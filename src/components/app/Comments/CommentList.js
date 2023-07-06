import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import CommentButton from './CommentButton';
import Comment from './Comment';
import CommentItem from './CommentItem';

function CommentList({ postId, comments }) {
    return (
        <Accordion className="comments-list">
            <CommentButton eventKey={postId} />
            <Accordion.Collapse eventKey={postId}>
                <div className="comments-body">
                    {comments.map(c=><CommentItem key={c.id} comment={c} />)}
                </div>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default CommentList