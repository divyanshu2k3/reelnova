"use server";

import { cookies } from "next/headers";

export async function login(password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.error("ADMIN_PASSWORD environment variable is not set!");
        return false;
    }

    if (password === adminPassword) {
        (await cookies()).set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        return true;
    }

    return false;
}
