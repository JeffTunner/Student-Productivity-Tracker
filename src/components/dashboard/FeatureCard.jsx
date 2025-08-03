import { useNavigate } from "react-router-dom";

function FeatureCard({title, description, n, route}) {

    const navigate = useNavigate();

    return (
            <div className={`bg-gray-400 col-span-${n} font-mono p-10 rounded-3xl w-80 h-40 flex flex-col justify-center items-center shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-300 hover:ring-4 ring-black hover:w-96 hover:h-48`}
            onClick={() => route && navigate(route)}>
                <h1 className="font-extrabold text-5xl mb-4 rounded-lg">{title}</h1>
                <p className="font-thin text-center">{description}</p>
            </div>
    );
}
export default FeatureCard;