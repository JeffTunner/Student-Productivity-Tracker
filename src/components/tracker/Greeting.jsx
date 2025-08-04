
function Greeting({username}) {

    const hours = new Date().getHours();
    const name = username;
    let greeting;
    
    if(hours < 12) {
        greeting = "Good Morning!";
    } else if(hours < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const today = new Date().toLocaleDateString("en-US", {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    return(
        <div className="flex font-mono flex-col justify-center items-center gap-3">
            <header className="flex items-center justify-center font-mono font-extrabold text-5xl underline text-gray-700">
                {greeting}, {name} 👋
            </header>
            <div className="text-xl text-gray-400 font-extrabold">
                {today}
            </div>
            <div className="text-center">
                <h1 className="font-extrabold text-3xl text-gray-700 underline mb-2">Welcome to the Tracker 😄</h1>
                <p className="text-gray-400 text-lg">Here you can choose from 4 different options to do the tracking.</p>
            </div>
        </div>
    );
}
export default Greeting;