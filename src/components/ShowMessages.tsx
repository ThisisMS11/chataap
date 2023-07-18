import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MessageType } from "./types";
import Message from "./Message";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';


const ShowMessages = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    const [message, setMessage] = useState<string>("");
    const [issending, setIssending] = useState(false);

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
    ];



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
                <div className="w-[35%] md:w-[45%] h-[0.1rem] bg-gray-200 "></div>
                <div className="w-[30%] md:w-[10%] text-center">12 June 2023</div>
                <div className="w-[35%] md:w-[45%] h-[0.1rem] bg-gray-200"></div>
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

            <form onSubmit={handleSendMessage} className="shadow-lg mx-4 rounded-md h-fit flex items-center bg-white" >
                <input
                    className="block w-full rounded-md  mx-4 mb-1  bg-white py-4  pl-5 pr-12 text-sm font-small  focus:outline-none focus:ring-0"
                    type="text"
                    placeholder={`Write Something to @Rohan`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                {
                    issending ? <div>sending...</div> :
                        <div className="flex relative ">

                            <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                                <SpeedDial
                                    ariaLabel="SpeedDial basic example"
        
                                    sx={{ position: 'absolute', bottom: -13,right:2 }}
                                    icon={<i className="fa-solid fa-paperclip text-white mx-2" ></i>}
                                >
                                    {actions.map((action) => (
                                        <SpeedDialAction
                                            key={action.name}
                                            icon={action.icon}
                                            tooltipTitle={action.name}
                                        />
                                    ))}
                                </SpeedDial>
                            </Box>

                            <button type="submit" disabled={issending} >
                                <i className="fa-regular fa-paper-plane text-black mx-4" ></i>
                            </button>

                        </div>
                }

            </form>
        </>
    );
};

export default ShowMessages;
