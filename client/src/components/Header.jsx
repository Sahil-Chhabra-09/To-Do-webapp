import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Header({ setRefetchData }) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [name, setName] = useState("");
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const submitHandler = () => {
    if (name.length > 50) {
      toast.info("Task name limit: 50");
      return;
    }
    axios
      .post(`${SERVER_URL}/tasks`, { task: name, uid })
      .then(() => {
        toast.success("Task created successfully");
      })
      .catch((error) => {
        toast.error("Failed to add data");
        console.error({ msg: error });
      })
      .finally(() => {
        setName("");
        setRefetchData(true);
      });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (uid === null) {
        toast.info("Login to add tasks");
      } else {
        submitHandler();
      }
    }
  };
  return (
    <div className="h-max shadow-lg hover:shadow-xl w-full md:w-2/3 p-6 space-y-2">
      <div className=" w-full p-2 text-center">Just a To Do list</div>
      <div className="flex-col">
        <input
          type="text"
          placeholder="e.g. wash dishes"
          className="border-2 border-slate-600 w-full h-8 p-2 md:w-2/3 md:mx-auto md:block mb-2"
          value={name}
          onChange={nameChangeHandler}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          type="submit"
          className="border-2 border-slate-600 bg-slate-400  hover:bg-stone-500 m-auto h-8 w-full md:w-1/2 md:mx-auto block rounded-md"
          onClick={() => {
            if (uid === null) {
              toast.info("Login to add tasks");
            } else {
              submitHandler();
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Header;
