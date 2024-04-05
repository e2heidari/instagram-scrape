"use client";
import { useEffect, useState } from "react";
import { getMultipleInstData } from "./getMultipleInstData";

export default function InstaDataPage() {
  const [instaData, setInstaData] = useState<
    {
      id: string;
      post: string;
      follower: string;
      following: string;
      image: string | null;
    }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMultipleInstData();
        setInstaData(data);
      } catch (error) {
        console.error("Error fetching Instagram data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Instagram Data</h1>
      <ul>
        {instaData.map((profile) => (
          <li key={profile.id}>
            <h2>{profile.id}</h2>
            <p>Post Count: {profile.post}</p>
            <p>Follower Count: {profile.follower}</p>
            <p>Following Count: {profile.following}</p>
            {profile.image && (
              <img src={profile.image} alt={`Profile of ${profile.id}`} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
