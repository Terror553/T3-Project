"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "~/client/theme";
import WikiPage from "~/components/wiki";
import type { WikiCategoryFull } from "~/server/types/wiki";

export default function Wiki() {
  const [loading, setLoading] = useState(true);
  const [wiki, setWiki] = useState<WikiCategoryFull[]>([]); // Updated to WikiCategoryFull[]
  const { showLoadingBar, hideLoadingBar } = useTheme();
  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        showLoadingBar("loadingBarName");
        setLoading(true);

        const [wikiRes] = await Promise.all([fetch("/api/wiki")]);
        if (!wikiRes.ok) throw new Error(`User API Error ${wikiRes.status}`);

        const wikiData = (await wikiRes.json()) as WikiCategoryFull[];

        setWiki(wikiData);
        setLoading(false);
        hideLoadingBar("loadingBarName");
      } catch (err) {
        console.error("Error fetching user", err);
        setLoading(false);
        hideLoadingBar("loadingBarName");
      }
    }

    void fetchData();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center flex-wrap mb-4">
        <h2>Wiki</h2>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Laden...
        </div>
      ) : (
        <WikiPage wiki={wiki} />
      )}
    </>
  );
}
