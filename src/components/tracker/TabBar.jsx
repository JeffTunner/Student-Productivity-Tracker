import FeatureCard from "../dashboard/FeatureCard.jsx";

function TabBar() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-16">
        <FeatureCard title="Daily" description="Track your daily tasks in here..." route="/dashboard/tracker/daily"/>
        <FeatureCard title="Weekly" description="Track your weekly tasks in here..." route="/dashboard/tracker/weekly"/>
        <FeatureCard title="Monthly" description="Track your monthly tasks in here..." route="/dashboard/tracker/monthly"/>
        <FeatureCard title="Yearly" description="Track your yearly tasks in here..." route="/dashboard/tracker/yearly"/>
    </div>
  );
}
export default TabBar;