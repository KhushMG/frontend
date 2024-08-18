"use client";

import { useState, useEffect } from "react";
import RecCard from "./RecCard";

const AnimeSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Fetch autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length > 0) {
        setLoading(true);
        try {
          const res = await fetch(
            `https://anime-rec-backend-127821879142.us-west2.run.app/autocomplete/?query=${debouncedQuery}`,
            {
              method: "GET",
            }
          );

          if (res.ok) {
            const data = await res.json();
            setSuggestions(data);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
      setLoading(false);
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Fetch recommendations based on the selected anime
  const fetchRecommendations = async (animeName) => {
    try {
      const res = await fetch(
        "https://anime-rec-backend-127821879142.us-west2.run.app/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ anime_name: animeName }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
        setSuggestions([]);
      } else {
        console.error("Error fetching recommendations");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const selectedAnimeName = suggestion.Name || suggestion["English name"];
    setQuery(selectedAnimeName);
    setSuggestions([]);
    fetchRecommendations(selectedAnimeName);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto">
      <h1 className="m-2 font-bold text-4xl text-center">
        Anime Recommendation System
      </h1>
      <div className=" relative mb-8 max-w-[md] mt-2">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter anime name"
          className="text-black border-2 p-2 border-gray-300 rounded-md w-[80vw] md:w-[50vw] lg:w-[35vw]"
        />
        {loading ? (
          <div>Loading suggestions...</div>
        ) : (
          suggestions.length > 0 && (
            <ul className="absolute left-0 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 z-10 mt-1">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.Name}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-[18.65rem] sm:w-[36rem] md:w-[31.92rem] p-2  text-black border-gray-300 border-2 rounded-md cursor-pointer m-1.5 break-words"
                >
                  {suggestion.Name} ({suggestion["English name"]}) - Score:{" "}
                  {suggestion.Score}
                </li>
              ))}
            </ul>
          )
        )}
      </div>

      {recommendations.length > 0 && (
        <div className="flex-1 md:my-[0.5rem]">
          <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <RecCard key={rec.Name} anime={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeSearch;
