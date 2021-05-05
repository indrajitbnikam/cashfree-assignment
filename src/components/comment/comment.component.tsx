import React from 'react';
import { IComment } from '../../models/first.models';
import { getUserById } from '../../services/first.service';
import './comment.styles.scss';
import moment from 'moment';

const Comment = (
  { data, activeUserId, onReply, onDelete }:
  {
    data: IComment,
    activeUserId: number,
    onReply: (commentFullId: string) => void,
    onDelete: (commentFullId: string) => void
  }
) => {
  const user = getUserById(data.userId);

  return (
    <div className='comment-container'>
      <div className='current-comment'>
        <div className='image'>
          <div className='user-initials'>
            <span>{user?.name.split(' ').map(s => s.substr(0, 1)).join('')}</span>
          </div>
        </div>
        <div className='info'>
          <div className='name-date'>
            <span className='name'>
              {
                user?.name
              }
            </span>
            <span className='date'>
              {
                moment(data.time).fromNow()
              }
            </span>
          </div>
          <span className='comment'>
            {data.comment}
          </span>
          <div className='actions'>
            <span className='action' onClick={() => onReply(data.fullId)}>
              Reply
            </span>
            {
              activeUserId === user?.id ? (
                <span className='action delete' onClick={() => onDelete(data.fullId)}>
                  delete
                </span>
              ) : null
            }
          </div>
        </div>
      </div>
      {
        data.replies.length > 0 ? (
          <div className='replies-container'>
            {
              data.replies.map(reply =>
                <Comment
                  data={reply}
                  activeUserId={activeUserId}
                  onReply={onReply}
                  onDelete={onDelete}
                />
              )
            }
          </div>
        ) : null
      }
    </div>
  )
}

export default Comment;
