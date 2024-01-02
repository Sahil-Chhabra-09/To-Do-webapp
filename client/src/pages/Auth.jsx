import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Auth() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [stage, setStage] = useState("signup");

  const navigate = useNavigate();

  useEffect(() => {
    if (stage === "signup" && password !== "" && name !== "") {
      setDisabled(password !== confirmP);
    }
    if (stage === "login" && password !== "" && name !== "") {
      setDisabled(false);
    }
  }, [password, confirmP]);

  const submitHandler = () => {
    axios
      .post(`${SERVER_URL}/${stage}`, { name, password })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          toast.success("We are in!");
          localStorage.setItem("uid", res.data.user.uid);
          localStorage.setItem("isLoggedIn", true);
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error("Failed to add data");
        console.error({ msg: error });
      });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      submitHandler();
    }
  };

  return (
    <div className="border-2 h-screen flex justify-center items-center">
      <div className="h-max shadow-lg hover:shadow-xl w-2/3 p-6 space-y-2 relative">
        <div className=" w-full p-2 text-center text-lg">
          {stage === "signup" ? "Create an account" : "Login"}
        </div>
        <div className="flex-col items-center">
          <div className="md:w-2/3 w-full md:mx-auto">Username</div>
          <input
            type="text"
            placeholder="e.g. admin (Please don't)"
            className="border-2 border-slate-600 w-full h-8 p-2 md:w-2/3 md:mx-auto md:block mb-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <div className="md:w-2/3 w-full md:mx-auto">Password</div>
          <input
            placeholder="e.g. password (Also don't)"
            className="border-2 border-slate-600 w-full h-8 p-2 md:w-2/3 md:mx-auto md:block mb-2"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {stage === "signup" && (
            <>
              <div className="md:w-2/3 w-full md:mx-auto">
                Confirm Password (Just to be safe)
              </div>
              <input
                placeholder="e.g. password (Also don't)"
                className="border-2 border-slate-600 w-full h-8 p-2 md:w-2/3 md:mx-auto md:block mb-2"
                value={confirmP}
                type="password"
                onChange={(e) => setConfirmP(e.target.value)}
                onKeyDown={handleKeyDown}
              ></input>
            </>
          )}
          <button
            type="submit"
            className={`border-2 m-auto h-8 w-full md:w-1/2 md:mx-auto block rounded-md mt-4 md:mt-8 mb-2 ${
              disabled
                ? "text-gray-400 cursor-not-allowed"
                : "bg-slate-400  hover:bg-stone-500 border-slate-600"
            }`}
            onClick={submitHandler}
            disabled={disabled}
          >
            Submit
          </button>
        </div>
        {stage === "signup" ? (
          <span
            className="absolute right-2 bottom-2 text-cyan-700 hover:text-cyan-500 cursor-pointer"
            onClick={() => {
              setStage("login");
            }}
          >
            No? {">>>"}
          </span>
        ) : (
          <span
            className="absolute left-2 bottom-2 text-cyan-700 hover:text-cyan-500 cursor-pointer"
            onClick={() => {
              setStage("signup");
            }}
          >
            {"<<<"} No?
          </span>
        )}
      </div>
    </div>
  );
}

export default Auth;
