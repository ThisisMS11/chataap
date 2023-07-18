// {
//     "id": "65a42b0133a3443492e83390c6373d65",
//     "message": "Nullam tempus scelerisque purus, sed mattis elit condimentum nec.Duis ac nulla varius diam ultrices rutrum.",
//     "sender": {
//       "image": "https://fastly.picsum.photos/id/648/160/160.jpg?hmac=AqrvRqv79fFWHWjjjm_Cn7QPPJ2JVox_CLRgzISsO4o",
//       "is_kyc_verified": false,
//       "self": false,
//       "user_id": "a6c04ceed74b447280f5fa7ab053adcc"
//     },
//     "time": "2023-07-18 08:05:07"
//   },

export interface MessageType{
    id: string,
    message: string,
    sender: {
        image: string,
        is_kyc_verified: boolean,
        self: boolean,
        user_id: string
    },
    time: string
}