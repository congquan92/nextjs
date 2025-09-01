"use client";
import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  role?: string;
}

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });
        const userData = await response.json();

        if (response.ok) {
          setUser(userData.data);
        } else {
          setError(userData.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Network error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {user && (
        <div>
          <h2>User Information</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.role && <p>Role: {user.role}</p>}
        </div>
      )}
    </div>
  );
}
