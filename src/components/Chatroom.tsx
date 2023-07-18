import ShowMessages from './ShowMessages'
import User from './User'
const Chatroom = () => {
    return (
        <div className='p-2 overflow-y-hidden'>
            <User/>
            <ShowMessages />
        </div>
    )
}

export default Chatroom