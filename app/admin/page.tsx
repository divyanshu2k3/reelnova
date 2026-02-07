import { getStats } from "@/lib/stats";
import DashboardView from "./dashboard-view";

export const dynamic = "force-dynamic"; // Ensure stats are fresh

export default async function AdminPage() {
    const { totalDownloads, activeUsers, serverStatus, chartData, trafficData } = await getStats();

    return (
        <DashboardView
            totalDownloads={totalDownloads}
            activeUsers={activeUsers}
            serverStatus={serverStatus}
            chartData={chartData}
            trafficData={trafficData}
        />
    );
}
