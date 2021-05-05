import React, { useState } from 'react';
import Comment from '../../components/comment/comment.component';
import { IComment, IUser } from '../../models/first.models';
import { addReplyToComment, deleteCommentByFullId, getUserById } from '../../services/first.service';
import { comments, users } from './first.data';
import './first.styles.scss';

const FirstPage = () => {

  const [localComments, setLocalComments] = useState<IComment[]>(comments);
  const [newComment, setNewComment] = useState<string>('');
  const [inReplyMode, setInReplyMode] = useState<boolean>(false);
  const [commentIdToBeReplied, setCommentIdToBeReplied] = useState<string>('');

  const [selectedUser, setSelectedUser] = useState<IUser>(users[0]);

  const handleUserSelect = (userId: number) => {
    setSelectedUser(getUserById(userId) as IUser);
  }

  const handleAddComment = () => {
    const newCommentId = localComments.length > 0
    ? localComments[localComments.length - 1].id + 1
    : 1;
    const newlyCreatedComment: IComment = {
      id: newCommentId,
      fullId: ''+newCommentId,
      comment: newComment,
      replies: [],
      time: new Date().toUTCString(),
      userId: selectedUser.id
    }
    setLocalComments([...localComments, newlyCreatedComment]);
    setNewComment('');
  }

  const onReply = (commentFullId: string) => {
    setCommentIdToBeReplied(commentFullId);
    setInReplyMode(true);
  }

  const handleNewReply = () => {
    setInReplyMode(false);
    setNewComment('');
    setLocalComments(addReplyToComment(localComments, commentIdToBeReplied, newComment, selectedUser.id));
  }

  const handleDeleteComment = (commentFullId: string) => {
    setLocalComments(deleteCommentByFullId(localComments, commentFullId));
  }

  return (
    <div className='comment-module'>
      <h1>
        Comments
      </h1>
      <div className='user-selection'>
        <select onChange={e => handleUserSelect(Number(e.target.value))}>
          {
            users.map(user =>
              <option key={user.id} value={user.id}>
                { user.name }
              </option>
            )
          }
        </select>
      </div>
      <div className='comment-section'>
        {
          localComments.length ? (
            localComments.map(com => (
              <Comment
                data={com}
                activeUserId={selectedUser.id}
                onReply={onReply}
                onDelete={handleDeleteComment}
              />
            ))
          ) : null
        }
      </div>
      <div className='new-comment'>
        <textarea
          rows={4}
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        {
          inReplyMode ? (
            <div className='reply-buttons'>
              <button
                className='btn btn-primary'
                onClick={handleNewReply}
              >Post reply</button>
              <button
                className='btn btn-secondary'
                onClick={() => setInReplyMode(false)}
              >Cancel</button>
            </div>
          ) : (
            <button
              className='btn btn-primary'
              onClick={handleAddComment}
            >Add Comment</button>
          )
        }
      </div>
    </div>
  )
}

export default FirstPage;
