
function DailyView({username}) {

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

    return (
    <div>
            <header className="flex flex-col items-center gap-2 bg-gray-100 font-mono p-4 border border-slate-950">
                <h1 className="font-extrabold text-3xl text-slate-800">{greeting}, {username} 😊</h1>
                <p className="text-slate-700">{today}</p>
            </header>
        <div className="flex items-center flex-col">
            <main className="flex flex-col flex-wrap justify-center items-center m-4 px-8 py-6 border-2 border-slate-900 rounded-xl shadow-xl font-mono w-fit max-w-full ">
                <div className="border-b border-slate-800 flex flex-col gap-2">
                    <h1 className="text-center text-xl font-extrabold underline ">No tasks yet.</h1>
                    <p>Click + to add one!</p>
                </div>
                <div className="mt-4">
                    <button className="bg-slate-800 text-white p-2 font-extrabold rounded-lg shadow-lg hover:bg-slate-700 hover:shadow-2xl hover:shadow-slate-950 hover:scale-105 transform transition-transform duration-300">+ Add Task</button>
                </div>

                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col border-slate-900 border-2 rounded-3xl px-8 py-6 shadow-xl w-[300px] max-w-full mt-8 cursor-pointer hover:shadow-2xl hover:ring-2 ring-black">
                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="text-center font-extrabold text-3xl underline">Title: Coding</h1>
                        <p>Description: All the tasks related to coding goes in here.</p>
                    </div>
                    <ul className="flex flex-col gap-1">
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Doing DSA for 1 hour
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Doing Development for 2 hour
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Creating the dashboard layout
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                    </ul>
                </div>

                 <div className="flex flex-col border-slate-900 border-2 rounded-3xl px-8 py-6 shadow-xl w-[300px] max-w-full mt-8 cursor-pointer hover:shadow-2xl hover:ring-2 ring-black">
                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="text-center font-extrabold text-3xl underline">Title: Coding</h1>
                        <p>Description: All the tasks related to coding goes in here.</p>
                    </div>
                    <ul className="flex flex-col gap-1">
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Doing DSA for 1 hour
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Doing Development for 2 hour
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Creating the dashboard layout
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                    </ul>
                </div>

                 <div className="flex flex-col border-slate-900 border-2 rounded-3xl px-8 py-6 shadow-xl w-[300px] max-w-full mt-8 cursor-pointer hover:shadow-2xl hover:ring-2 ring-black">
                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="text-center font-extrabold text-3xl underline">Title: Coding</h1>
                        <p>Description: All the tasks related to coding goes in here.</p>
                    </div>
                    <ul className="flex flex-col gap-1">
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Doing DSA for 1 hour
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Doing Development for 2 hour
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                        <li className="items-center flex"><input type="checkbox" name="Checkbox" id="checkbox" />
                            Creating the dashboard layout
                            <button>✏️</button>
                            <button>👍</button>
                            <button>👎</button>
                            <button>❌</button>
                        </li>
                    </ul>
                </div>
                </div>


            </main>
        </div>

    </div>
    );
}
export default DailyView;