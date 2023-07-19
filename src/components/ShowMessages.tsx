import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MessageType } from "./types";
import Message from "./Message";

import { ReactComponent as Camera } from '../assets/camera.svg';
import { ReactComponent as Video } from '../assets/Video.svg';
import { ReactComponent as File } from '../assets/File.svg';
import { ReactComponent as Media } from '../assets/Media.svg';
import { ReactComponent as Send } from '../assets/send.svg';
import { ReactComponent as Traingle } from '../assets/Traingle.svg';


const ShowMessages = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [menu, setMenu] = useState(false);

    const [message, setMessage] = useState<string>("");
    const [issending, setIssending] = useState(false);


    const childRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIssending(false);

        const newmessage = {
            "id": "65a42b0133a3443492e83390c6373d65",
            "message": message,
            "sender": {
                "image": "https://fastly.picsum.photos/id/648/160/160.jpg?hmac=AqrvRqv79fFWHWjjjm_Cn7QPPJ2JVox_CLRgzISsO4o",
                "is_kyc_verified": false,
                "self": false,
                "user_id": "a6c04ceed74b447280f5fa7ab053adcc"
            },
            "time": "2023-07-18 08:05:07"
        }

        if (message.trim() !== "") {
            setMessages((prevMessages) => [...prevMessages, newmessage]);
            setMessage("");
            const childElement = childRef.current;

            if (childElement) {
                childElement.scrollTop = childElement.scrollHeight + 20;
            }
        }
        return;
    }


    useEffect(() => {
        const childElement = childRef.current;

        if (childElement) {
            childElement.scrollTop = childElement.scrollHeight;
        }
    }, []);


    /* handling scrollbar thing */
    const handleScroll = () => {
        if (childRef.current && innerRef.current) {
            /* container div */
            const childElement = childRef.current;

            /* current scrollbar position from the top */
            const scrollTop = childElement.scrollTop;


            /* inner div visible height at once*/
            const innerTop = innerRef.current.offsetTop;

            const scrollHeight = childElement.scrollHeight;  // height of the scrollable div
            const clientHeight = childElement.clientHeight;    // height of the visible div

            if (scrollTop === 0 && scrollTop < innerTop) {
                fetchMessages();

                if (childElement) {
                    // Calculate the scroll position percentage
                    const scrollPositionPercentage = (scrollTop + clientHeight) / scrollHeight;

                    // Adjust the scroll position relative to the increased scroll height
                    childElement.scrollTop = scrollPositionPercentage * childElement.scrollHeight;
                }
            }
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    /* toggle media menu */
    const toggleMenu = () => {
        setMenu(!menu);
    }

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://qa.corider.in/assignment/chat?page=${pageNumber}`
            );
            const newMessages = response.data.chats;

            if (newMessages.length > 0) {
                setMessages((prevMessages) => [...newMessages, ...prevMessages]);
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    if (messages.length === 0 && loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex items-center">
                <div className="w-[35%] md:w-[45%] h-[0.1rem] bg-gray-300 "></div>
                <div className="w-[30%] md:w-[10%] text-center text-gray-400">12 June 2023</div>
                <div className="w-[35%] md:w-[45%] h-[0.1rem] bg-gray-300"></div>
            </div>

            <div className="h-[73vh] overflow-y-scroll" ref={childRef} onScroll={handleScroll}>
                <div ref={innerRef} >
                    {messages.map((message) => (
                        <div key={message.id}>
                            <Message message={message} firstUserId={messages[0].sender.user_id} />
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSendMessage} className="rounded-lg h-fit flex items-center bg-white" >
                <input
                    className="block w-full rounded-md  mx-4 mb-1  bg-white py-2  pl-5 pr-12 text-sm font-small  focus:outline-none focus:ring-0"
                    type="text"
                    placeholder={`Write Something to @Rohan`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                {
                    issending ? <div>sending...</div> :
                        <div className="flex relative items-center">
                            <div className="mt-2">
                                {menu && (
                                    <div className="absolute bottom-8 right-3 flex flex-col items-center">
                                        <div className=" bg-[#008000] text-white flex p-2 rounded-md">

                                            <div className="mx-1  cursor-pointer">
                                                <Camera />
                                            </div>

                                            <div className="mx-1 cursor-pointer">
                                                <Video />
                                            </div>
                                            <div className="mx-1 cursor-pointer">
                                                <File />
                                            </div>
                                        </div>
                                        <Traingle />
                                    </div>

                                )}
                                <button className="mx-4" onClick={toggleMenu}>

                                    <Media />
                                </button>
                            </div>


                            <button type="submit" disabled={issending} className="mr-4" >
                                <Send />
                            </button>

                        </div>
                }

            </form>
        </>
    );
};

export default ShowMessages;
