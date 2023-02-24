import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios("http://localhost:3000/api/getAllUsers");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const formRef = useRef();

  const handleChange = (e: any) => {
    if (e.target.id === "name") setName(e.target.value);
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "bio") setBio(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || !email || !bio) return;

    axios
      .post("http://localhost:3000/api/createUser", {
        name,
        email,
        bio,
      })
      .then((res) => {
        if (res.status === 200) {
          // @ts-ignore
          setUsers((prev) => [...prev, res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setEmail("");
    setBio("");

    //@ts-ignore
    formRef.current.reset();
  };

  const handleDelete = (id: string) => {
    axios.post("http://localhost:3000/api/deleteUser", { id }).then((res) => {
      if (res.status === 200) {
        // @ts-ignore
        setUsers((prev) => prev.filter((user) => user.id !== id));
      }
    });
  };

  return (
    <div className="w-full min-h-screen grid place-items-center bg-slate-900">
      <form
        //@ts-ignore
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-4 max-w-lg w-full flex flex-col justify-center items-center">
        <span className="text-3xl font-semibold text-sky-200">
          Registration
        </span>
        <div className="w-full mt-4">
          <label
            htmlFor="name"
            className="block text-md font-medium text-sky-200">
            Name
          </label>
          <input
            onChange={handleChange}
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            className="w-full rounded-lg px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="email"
            className="block text-md font-medium text-sky-200">
            Email
          </label>
          <input
            onChange={handleChange}
            id="email"
            type="text"
            placeholder="Enter your email"
            required
            className="w-full rounded-lg px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="w-full mt-4">
          <label
            htmlFor="bio"
            className="block text-md font-medium text-sky-200">
            Bio
          </label>
          <input
            onChange={handleChange}
            id="bio"
            type="text"
            placeholder="Enter your Bio"
            required
            className="w-full rounded-lg px-3 py-2 border border-gray-300"
          />
        </div>
        <button
          className="mt-4 w-full bg-sky-200 hover:bg-sky-300 px-3 py-2 rounded-lg text-sky-800"
          type="submit">
          Submit
        </button>
      </form>

      {users.length > 0 && (
        <div className="my-8 w-full max-w-xl">
          <p className="text-xl font-semibold text-center text-sky-200">
            Users
          </p>
          <div className="mt-2 grid grid-cols-5 w-full px-4 pb-1 text-sky-200 font-medium ">
            <span className="col-span-1">Name</span>
            <span className="col-span-2">Email</span>
            <span className="col-span-1">Bio</span>
          </div>
          {users.map((user) => (
            <div
              // @ts-ignore
              key={user.id}
              className="mb-2 grid grid-cols-5 w-full px-4 py-3 text-sky-800 font-medium bg-sky-200 hover:bg-sky-300 rounded-md">
              {/* @ts-ignore */}
              <span className="col-span-1">{user.name}</span>
              {/* @ts-ignore */}
              <span className="col-span-2">{user.email}</span>
              {/* @ts-ignore */}
              <span className="col-span-1">{user.bio}</span>
              <button
                // @ts-ignore
                onClick={() => handleDelete(user.id)}
                className=" col-span-1 text-right hover:scale-105">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
