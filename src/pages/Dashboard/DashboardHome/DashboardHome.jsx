import Loading from "../../../components/Loading";
import useUserRole from "../../../hooks/useUserRole";
import AdminDashboard from "./AdminDashboard";
import BuyerDashboard from "./BuyerDashboard";
import WorkerDashboard from "./WorkerDashboard";

const DashboardHome = () => {
    const { role, loading } = useUserRole();

    if (loading) {
        return <Loading />;
    }

    // console.log("User role:", role); // Debug

    if (role === 'worker') {
        return <WorkerDashboard />;
    } else if (role === 'buyer') {
        return <BuyerDashboard />;
    } else if (role === 'admin') {
        return <AdminDashboard />;
    } else {
        return <p>Role not found</p>;
    }
};

export default DashboardHome;
