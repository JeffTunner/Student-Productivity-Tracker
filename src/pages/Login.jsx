
function Login() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50">
        <div className="flex flex-col items-center justify-center shadow-md rounded-2xl p-6 mb-5 bg-slate-100 max-[400px]:w-full md:shadow-lg">
            <div className="text-center mb-4 bg-blue-200 p-4 rounded-lg">
                <h3 className="font-medium text-rose-600 text-3xl font-sans">Hello😊</h3>
                <p className="font-thin text-orange-800 font-sans">Please Enter your Credentials to Login!</p>
            </div>
            <form onSubmit={(e) => {e.preventDefault(); alert("You have successfully Logged In!!!");}}>
                <div className="mb-4 flex flex-col">
                    <label aria-label="Email" htmlFor="email" className="block text-gray-700 mb-1 text-xl font-semibold">Email:</label>
                    <input autoComplete="email" type="email" className="w-full rounded-md border-gray-200 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200" name="Email" id="email" />
                </div>
                <div className="mb-8 flex flex-col">
                    <label aria-label="Password" htmlFor="password" className="block text-gray-700 mb-1 text-xl font-semibold">Password:</label>
                    <input autoComplete="current-password" type="password" className="w-full rounded-md border-gray-200 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200" name="Password" id="password" />
                </div>
                <div className="flex justify-center mb-4">
                    <button className="w-full transition-shadow duration-200 text-slate-50 bg-green-500 px-3 py-2 text-xl font-semibold rounded-md hover:bg-green-400 hover:shadow-md" type="submit">Login</button>
                </div>
            </form>
        </div>
        </div>

    );
}
export default Login;