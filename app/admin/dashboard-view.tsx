"use client";

import Navbar from "@/components/Navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { logout } from "./actions";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface DashboardViewProps {
    totalDownloads: number;
    activeUsers: number;
    serverStatus: string;
    chartData: any;
    trafficData: {
        labels: string[];
        data: number[];
    };
}

export default function DashboardView({
    totalDownloads,
    activeUsers,
    serverStatus,
    chartData,
    trafficData
}: DashboardViewProps) {

    const stats = [
        { label: "Total Downloads", value: totalDownloads.toLocaleString(), change: "Live" },
        { label: "Active Users (24h)", value: activeUsers.toLocaleString(), change: "Real-time" },
        { label: "Server Status", value: serverStatus, change: serverStatus === "Healthy" ? "✓ Online" : "⚠ Issue" },
        { label: "Revenue", value: "$0.00", change: "Free" },
    ];

    const pieData = {
        labels: trafficData.labels,
        datasets: [
            {
                data: trafficData.data,
                backgroundColor: ["#00f3ff", "#bc13fe", "#ff00e5", "#ffd700", "#333"],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-24 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <form action={logout}>
                        <button className="text-red-500 hover:text-red-400 text-sm">Logout</button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass p-6 rounded-xl border border-white/10">
                            <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                            <p className="text-3xl font-bold mt-2 text-gradient">{stat.value}</p>
                            <span className={`text-sm ${stat.change.includes("✓") ? "text-green-400" :
                                    stat.change.includes("⚠") ? "text-yellow-400" :
                                        "text-blue-400"
                                }`}>{stat.change}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass p-8 rounded-xl border border-white/10 h-[400px]">
                        <h3 className="font-bold mb-4">Downloads (Last 7 Days)</h3>
                        <div className="h-[300px]">
                            <Line data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
                        </div>
                    </div>
                    <div className="glass p-8 rounded-xl border border-white/10 h-[400px]">
                        <h3 className="font-bold mb-4">Traffic Sources (Top 5 Countries)</h3>
                        <div className="h-[300px] flex justify-center">
                            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
