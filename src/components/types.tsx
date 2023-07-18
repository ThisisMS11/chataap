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