import { MessageType } from "./types"

const Message = ({ message, firstUserId }: { message: MessageType, firstUserId: string }) => {

    const isSentByMe = message.sender.user_id === firstUserId;

    const endDisplay = `flex justify-end items-start mr-2 md:mr-4`;
    const startDisplay = `flex justify-start items-start ml-2 md:ml-4`;

    const myuserchatcolor = 'max-w-[18rem] w-80 p-2 font-sans rounded-lg bg-[#1C63D5] text-white drop-shadow-md my-4';
    const otheruserchatcolor = 'max-w-[18rem] w-80 p-2 font-sans rounded-lg bg-white text-gray-700 drop-shadow-md my-4';


    return (
        <div className={isSentByMe ? endDisplay : startDisplay}>
            <div className=" flex items-start">

                <img src={message.sender.image} alt='user_image'
                    className='rounded-full object-contain mr-2 mt-4  w-8 md:w-10' />

                <div className={isSentByMe ? myuserchatcolor : otheruserchatcolor}>
                    <div className="text-[12px] md:text-sm text-left">
                        {message.message}
                    </div>
                </div>
            </div>
        </div >


    )
}

export default Message