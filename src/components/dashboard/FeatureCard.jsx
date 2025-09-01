import { useNavigate } from "react-router-dom";

function FeatureCard({ title, description, n, route }) {
    const navigate = useNavigate();

    return (
        <div
            className={`
                bg-white/80 backdrop-blur-sm border-2 border-black 
                shadow-[6px_6px_0px_rgba(0,0,0,1)] 
                rounded-2xl p-6 flex flex-col justify-center items-center 
                text-center cursor-pointer 
                transition-transform duration-300 ease-in-out 
                hover:scale-105 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)]
            `}
            onClick={() => route && navigate(route)}
        >
            <h1 className="font-extrabold text-3xl sm:text-4xl mb-3">{title}</h1>
            <p className="text-sm sm:text-base text-gray-700">{description}</p>
        </div>
    );
}

export default FeatureCard;
