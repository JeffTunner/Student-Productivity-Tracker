import FeatureCard from "./FeatureCard.jsx";

function TaskBoard() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-16 ">
            <FeatureCard title="Tracker" description="Track your Daily, weekly or even monthly tasks." n="2" route="/tracker"/>
            <FeatureCard title="Journal" description="Write the thoughts that come in your mind." route="/journal"/>
            <FeatureCard title="Mood" description="Update your daily mood with this Slider." route="/mood"/>
            <FeatureCard title="AI" description="Your very own personalized assistant." route="/ai"/>
            <FeatureCard title="More to come..." description="Wait to see whats coming..." route="/login"/>
        </div>
    );   
}
export default TaskBoard;