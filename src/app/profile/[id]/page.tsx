"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import { Client } from "~/components/toast";
import { type fullUser } from "~/server/auth/utils/currentUser";

const ProfilePage = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();
  const id = params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        showLoadingBar("loadingBarName");
        setLoading(true);

        const [userRes] = await Promise.all([fetch("/api/auth/user")]);

        if (!userRes.ok) throw new Error(`User API Error ${userRes.status}`);

        const userData = (await userRes.json()) as fullUser;

        setUser(userData);
        setLoading(false);
        hideLoadingBar("loadingBarName");
      } catch (err) {
        console.error("Error fetching user", err);
        setLoading(false);
        setUser({});
        hideLoadingBar("loadingBarName");
      }
    }

    void fetchData();
  }, [id]);

  return (
    <>
      <h2>Profile Page</h2>
      <h2>User ID: {id}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <h3>User Details:</h3>
          <pre>
            {JSON.stringify(user) !== "{}"
              ? JSON.stringify(user)
              : "No user data available"}
          </pre>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
};

export default ProfilePage;
