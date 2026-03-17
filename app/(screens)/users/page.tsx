"use client";
import { useUsers } from "@/hook/useUsers";
import React from "react";

const UsersPage: React.FC = () => {

    const { users } = useUsers();
    console.log("users", users);
    return (
        <div>
            <h1>Users</h1>

            {users.map((user) => (
                <div key={user.id}>
                    <p>{user.empName}</p>
                    <p>{user.empEmail}</p>
                    <p>{user.role}</p>
                    <p>{user.managerName}</p>
                    <p>{user.managerEmail}</p>
                </div>
            ))}
        </div>
    );
}

export default UsersPage;
