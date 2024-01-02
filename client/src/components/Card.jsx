import React from "react";
import edit from "../icons/editing.png";
import deleteIcon from "../icons/delete.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Card({ id, name, completed, setRefetchData }) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const deleteHandler = () => {
    axios
      .delete(`${SERVER_URL}/tasks/${id}`)
      .then((res) => {
        toast.success("Deleted successfully");
      })
      .catch((err) => {
        toast.error("Failed to delete");
        console.error({ msg: err });
      })
      .finally(() => {
        setRefetchData(true);
      });
  };
  return (
    <>
      <div className="flex justify-between bg-slate-200 px-2 ">
        <div className={`${completed && "line-through"}`}>{name}</div>
        <div className="flex space-x-2">
          <Link to={`/edit/${id}`}>
            <img src={edit} alt="edit" className="h-6 hover:opacity-60"></img>
          </Link>
          <img
            src={deleteIcon}
            alt="delete"
            className="h-6 cursor-pointer hover:opacity-60"
            onClick={deleteHandler}
          ></img>
        </div>
      </div>
    </>
  );
}

export default Card;
