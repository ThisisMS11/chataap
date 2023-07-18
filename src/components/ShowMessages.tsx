import Message from "./Message"
import axios from "axios"
import { useEffect, useState } from "react"
import { MessageType } from "./types"

const ShowMessages = () => {

    const [messaages, setMessaages] = useState<MessageType[]>([]);
    const [message, setMessage] = useState<string>("");
    const [issending, setIssending] = useState(false);

    useEffect(() => {

        async function GetAllMessages() {
            const response = await axios.get("https://qa.corider.in/assignment/chat?page=0");
            setMessaages(response.data.chats);
        }
        /* make a call to fetch the messaages */
        GetAllMessages();
    }, [])

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIssending(false);
        return;
    }

    if (!messaages) return <div>Loading...</div>
    return (
        <div className=" rounded-md md:p-1">
            {
                messaages.map((message) => {
                    return <div key={message.id}><Message message={message} firstUserId={messaages[0].sender.user_id} /></div>
                })
            }


            <form onSubmit={handleSendMessage} className="shadow-lg mx-4 mb-4 rounded-md h-fit flex items-center bg-white" >
                <input
                    className="block w-full rounded-md  mx-4 mb-1  bg-white py-2.5  pl-5 pr-12 text-sm font-small  focus:outline-none focus:ring-0"
                    type="text"
                    placeholder={`Write Something to @Rohan `}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                {
                    issending ? <div>sending...</div> :
                        <div className="flex ">
                            <button>
                                <i className="fa-solid fa-paperclip text-black mx-2" ></i>
                            </button>

                            <button type="submit" disabled={issending}>
                                <i className="fa-regular fa-paper-plane text-black mx-4" ></i>
                            </button>

                        </div>
                }

            </form>
        </div>
    )
}

export default ShowMessages