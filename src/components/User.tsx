
const User = () => {
    const randomsrc = "https://fastly.picsum.photos/id/1072/160/160.jpg?hmac=IDpbpA5neYzFjtkdFmBDKXwgr-907ewXLa9lLk9JuA8"
    return (
        <>

            {/* navigation and edit  */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex">

                    <div className="ml-2 md:ml-4 cursor-pointer">
                        <i className="fa-solid fa-arrow-left w-10 h-4 fa-md"></i>
                    </div>
                    <div className="text-xl font-bold">Trip 1</div>
                </div>

                <div className="mr-2 cursor-pointer">
                    <i className="fa-regular fa-pen-to-square text-black" ></i>
                </div>

            </div>

            {/* user info section  */}
            <div className="  border-b-2 border-gray-200">
                <div className="flex items-center">

                    <img src={randomsrc} alt="image not found" className="rounded-full w-10 h-10 ml-2 md:ml-4" />
                    <div className="p-2">

                        <div className="flex items-center px-1">
                            <div className="text-sm text-gray-500">From</div>
                            <div className="font-semibold ml-1">IGI Airport,T3</div>
                        </div>
                        <div className="flex items-center px-1">
                            <div className="text-sm text-gray-500 mr-2">To</div>
                            <div className="font-semibold ml-1">Sector 28</div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default User