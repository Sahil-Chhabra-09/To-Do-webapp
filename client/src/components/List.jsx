import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { toast } from "react-toastify";

function List({ refetchData, setRefetchData }) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    if (refetchData) {
      setLoading(true);
      axios
        .get(`${SERVER_URL}/tasks?uid=${uid}`)
        .then((res) => {
          setAllData(res.data.tasks);
        })
        .catch((error) => {
          toast.error("Error occured while fetching data");
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          setRefetchData(false);
        });
    }
  }, [refetchData]);
  return (
    <div className="h-3/4 pt-2 w-5/6 md:w-1/2 border-2 border-slate-700 mx-auto overflow-y-scroll">
      <div>
        <p className="h-max p-2 text-center">Your List</p>
        <hr className="border-1 border-slate-700"></hr>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <div className="mt-2 space-y-2">
            {allData?.map((data) => {
              return (
                <Card
                  key={data._id}
                  name={data.task}
                  id={data._id}
                  completed={data.completed}
                  setRefetchData={setRefetchData}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
