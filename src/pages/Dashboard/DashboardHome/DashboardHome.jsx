import Loading from "../../../components/Loading";
import useUserRole from "../../../hooks/useUserRole";
import AdminDashboard from "./AdminDashboard";
import BuyerDashboard from "./BuyerDashboard";
import WorkerDashboard from "./WorkerDashboard";


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <WorkerDashboard></WorkerDashboard>
    }
    else if(role === 'rider'){
        return <BuyerDashboard></BuyerDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    // else {
    //     return <Forbidden></Forbidden>
    // }

};

export default DashboardHome;