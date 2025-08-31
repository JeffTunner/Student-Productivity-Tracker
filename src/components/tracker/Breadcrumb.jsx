import { Link } from "react-router-dom";

function Breadcrumb({year, month, date}) {

    const monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return (
        <nav className="flex items-center gap-2 p-3">
            <Link to={`/dashboard/tracker`}
            className="px-3 py-1 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] font-bold hover:bg-gray-200 transition">
            Tracker
            </Link>
            <span className="text-xl font-bold">→</span>
            <Link to={`/yearly/${year}`}
            className="px-3 py-1 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] font-bold hover:bg-gray-200 transition">
            {year}
            </Link>
            <span className="text-xl font-bold">→</span>
            <Link to={`/monthly/${year}/${month}`} 
            className="px-3 py-1 bg-gray-200 border-2 border-black rounded-xl shadow-[3px_3px_0px_black] font-bold hover:bg-gray-200 transition">
                {monthName[month]}
            </Link>
            {date && (
                <>
                <span className="text-xl font-bold">→</span>
                <span className="px-3 py-1 bg-gray-200 border-2 border-black rounded-xl shadow-[3px_3px_0px_black] font-bold hover:bg-gray-200 transition">
                    {date}
                </span>
                </>
            )}
            
        
        </nav>
    );
}
export default Breadcrumb;