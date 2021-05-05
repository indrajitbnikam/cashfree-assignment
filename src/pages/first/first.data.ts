import { IComment, IUser } from "../../models/first.models";

export const tempComment: IComment = {
  id: 1,
  fullId: '1',
  comment: 'Happy Independance Day 😊',
  userId: 1,
  time: 'Fri, 09 Oct 2020 14:56:59 GMT',
  replies: [
    {
      id: 1,
      fullId: '1-1',
      replies: [],
      comment: 'Same to you!',
      userId: 2,
      time: 'Wed, 09 Dec 2020 14:56:59 GMT'
    },
    {
      id: 2,
      fullId: '1-2',
      replies: [],
      comment: 'Same to you Indrajeet!',
      userId: 3,
      time: 'Wed, 05 May 2021 08:53:19 GMT'
    }
  ]
}

export const users: IUser[] = [
  {
    id: 1,
    name: 'Indrajeet Nikam'
  },
  {
    id: 2,
    name: 'Swapnil Kumbhar'
  },
  {
    id: 3,
    name: 'Shubham Tarade'
  },
  {
    id: 4,
    name: 'Vishal Shingare'
  },
  {
    id: 5,
    name: 'Ketan Shinde'
  }
]

export const comments: IComment[] = [
  tempComment
];