import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import List from "../components/List";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const [refetchData, setRefetchData] = useState(true);

  useEffect(() => {
    localStorage.getItem("isLoggedIn");
  });

  return (
    <div className="flex-col h-screen">
      {isLoggedIn ? (
        <button
          className="absolute right-2 top-2 border-2 border-red-300 p-2 rounded-md hover:text-red-700"
          onClick={() => {
            localStorage.clear();
            setIsLoggedIn(false);
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="absolute right-2 top-2 border-2 p-2 rounded-md hover:text-teal-700"
          onClick={() => {
            navigate("/auth");
          }}
        >
          Login / SignUp
        </button>
      )}
      <div className="h-1/3 flex justify-center items-center">
        <Header setRefetchData={setRefetchData} />
      </div>
      <div className="h-2/3">
        <List refetchData={refetchData} setRefetchData={setRefetchData} />
      </div>
    </div>
  );
}

export default Home;
