import { IComment } from "../models/first.models";
import { users } from "../pages/first/first.data";
import { cloneDeep } from 'lodash';

export const getUserById = (userId: number) => {
  return users.find(u => u.id === userId);
}

export const addReplyToComment = (comments: IComment[], commentFullId: string, commentText: string, userId: number): IComment[] => {
  const idArr: number[] = commentFullId.split('-').map(id => Number(id));

  const tempComments: IComment[] = cloneDeep(comments);
  let tempComment: IComment = tempComments.find(com => com.id === idArr[0]) as IComment;

  if (idArr.length > 1) {
    idArr.forEach((id, index) => {
      if (index > 0) {
        tempComment = tempComment.replies.find(repl => repl.id === id) as IComment;
      }
    })
  }

  const newReplyId = tempComment.replies.length > 0
    ? tempComment.replies[tempComment.replies.length - 1].id + 1
    : 1;

  const newReplyToBeAdded: IComment = {
    id: newReplyId,
    fullId: `${tempComment.fullId}-${newReplyId}`,
    comment: commentText,
    replies: [],
    time: new Date().toUTCString(),
    userId: userId
  }

  tempComment.replies.push(newReplyToBeAdded);

  return tempComments;
}

export const deleteCommentByFullId = (comments: IComment[], commentFullId: string): IComment[] => {
  const idArr: number[] = commentFullId.split('-').map(id => Number(id));
  let tempComments: IComment[] = cloneDeep(comments);
  if (idArr.length === 1) {
    tempComments = tempComments.filter(com => com.fullId !== commentFullId);
  } else {
    let parentComment = tempComments.find(com => com.id === idArr[0]) as IComment;

    idArr.forEach((id, index) => {
      if (index > 0 && index < idArr.length - 1) {
        parentComment = parentComment.replies.find(repl => repl.id === id) as IComment;
      }
    });

    parentComment.replies = parentComment.replies.filter(repl => repl.id !== idArr[idArr.length - 1]);
  }
  return tempComments;
}
