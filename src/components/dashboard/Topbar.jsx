
function Topbar({username}) {

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <div className="flex justify-around items-center mb-2 md:mb-2">
                <h1 className="text-gray-800 font-mono font-extrabold text-3xl md:text-5xl underline">Hey there, {username}</h1>
                <img src="/src/assets/profile.jpeg" alt="profile pic" className="w-14 md:w-20 h-auto rounded-full cursor-pointer"/>
            </div>
            <div className="flex flex-col items-center gap-1 md:gap-1 font-mono">
                <p className="md:text-3xl text-xl font-semibold text-gray-500">Welcome to the Dashboard 😄</p>
                <div className="flex flex-col items-center md:flex-row md:gap-4">
                    <span className="md:text-lg font-semibold text-gray-500">Whats on your mind today???</span>
                    <span className="md:text-lg">Today is: {formattedDate}</span>
                </div>
            </div>
        </div>
    );
}
export default Topbar;