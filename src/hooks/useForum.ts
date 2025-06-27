"use client";

import { useState, useEffect } from "react";
import { useTheme } from "~/client/theme";
import type { ForumCategory } from "~/server/types/forum";

export function useForum() {
  const [loading, setLoading] = useState(true);
  const [forum, setForum] = useState<ForumCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { showLoadingBar, hideLoadingBar } = useTheme();
  
  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay for UX
        showLoadingBar("forumLoadingBar");
        setLoading(true);
        setError(null);

        const forumRes = await fetch("/api/forum");
        
        if (!forumRes.ok) {
          throw new Error(`Forum API Error ${forumRes.status}`);
        }

        const forumData = (await forumRes.json()) as ForumCategory[];
        setForum(forumData);
      } catch (err) {
        console.error("Error fetching forum data:", err);
        setError("Failed to load forum data. Please try again later.");
      } finally {
        setLoading(false);
        hideLoadingBar("forumLoadingBar");
      }
    }

    void fetchData();
  }, [showLoadingBar, hideLoadingBar]);

  return { loading, forum, error };
}