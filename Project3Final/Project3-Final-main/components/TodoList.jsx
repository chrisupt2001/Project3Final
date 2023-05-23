/** @format */

"use client";
import Link from "next/link";

import useUser from "csc-start/hooks/useUser";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import {
  addNewTodo,
  getGroceriesList,
  getGroceriesTodoList,
  // deleteNewLink,
  getCurrentUser,
  getTodoLists,
} from "csc-start/utils/data";
import { useState, useEffect } from "react";
// import supabase from "csc-start/utils/supabase";

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [currentUser, setCurrentUser] = useState(0);
  const [currentLinks, setCurrentLinks] = useState([]);
  const [localTodoLists, setLocalTodoLists] = useState([]);
  // const [checked, setChecked] = useState(false);

  const selectTodoTypes = [
    { id: "1", value: "Grocery List", text: "Grocery List" },
    { id: "2", value: "Homework Due Dates", text: "Homework Due Dates" },
    { id: "3", value: "Event List", text: "Event List" },
  ];
  const [todoType, setTodoType] = useState("Grocery List");

  // the user hook, will, provide us with the following, and it is completely abstracted away
  //  - user, and update whenever it's changed (undefined if loading, set if loaded)

  const { user, refreshUser, error, loading } = useUser();
  // we removed the useUser in the userMustBeLogged component, and now are supplying the user
  useUserMustBeLogged(user, "in", "/login");
  useEffect(() => {
    if (user) {
      console.log("user", user);
      //  if (todoType === "Grocery List") {
      let tempCurrentLinks = user.groceries;

      //  if (todoType === "Homework Due Dates") {
      // let tempCurrentLinks = user.homework;
      //  }
      // if (todoType === "Event List") {
      //   tempCurrentLinks = user.Events;
      // }

      setCurrentUser(user);
    }
  }, [user, todoType]);

  const addTodo = async (e) => {
    e.preventDefault();

    const order = currentLinks.length + 1;
    const addedTodo = await addNewTodo(user.id, title, order, todoType);

    if (addedTodo.success == false) {
      //handle error
      return;
    }
    setTitle("");
    // setTodoType("");
    // setIsInputDisabled(true);

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
    refreshUser();
    //handle success
  };

  const getTodoList = async (e) => {
    e.preventDefault();
    // const order = currentLinks.length + 1;
    const getTodoTypeList = await getTodoList(user.id, title, order, todoType);
    if (getTodoTypeList.success == false) {
      //handle error
      return;
    }
    // setUrl(“”);
    setTitle("");
    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
    refreshUser();
    //handle success
  };
  // setTodoType(“”);
  // setIsInputDisabled(true);
  // const deleteLink = async (e) => {
  //   e.preventDefault();

  //   const order = currentLinks.length - 1;
  //   const deleteLink = await deleteNewLink(user.id, title, order, todoType);

  //   if (deleteLink.success == false) {
  //     //handle error
  //     return;
  //   }
  //   // setUrl("");
  //   setTitle("");
  //   //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
  //   //  or make a new request....
  //   refreshUser();
  //   //handle success
  // };

  // const deleteTodo = async (id: number) => {
  // const deleteTodo = async (e) => {
  //   try {
  //     await supabase.from("todo").delete().eq("id", id).throwOnError();
  //     setTodos(todos.filter((x) => x.id != id));
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const handleChange = () => {
  //   setChecked(!checked);
  // };
  // const Checkbox = ({ label, value, onChange }) => {
  //   return (
  //     <label>
  //       <input type='checkbox' checked={value} onChange={onChange} />
  //     </label>
  //   );
  // };

  return (
    <div className="barge">
      {!!error && (
        <div
          className={`bg-red-200 border-2 border-red-800 text-red-800 py-2 px-5 my-10 text-center`}
        >
          <span className="font-bold">{error.message}</span>
        </div>
      )}
      {!error && loading && <p>Loading...</p>}
      {!error && !loading && (
        <div>
          <div className="flex justify-between my-5">
            <Link className="hover:text-cloud-purple" href="/grocerypage">
              <button
                // disabled={todoType === "Grocery List"}
                onClick={() => setTodoType("Grocery List")}
                className="button small"
              >
                Todo Grocery List:
              </button>
            </Link>
            <Link className="hover:text-cloud-purple" href="/homeworkpage">
              <button
                // disabled={todoType === "Homework Due Dates"}
                onClick={() => setTodoType("Homework Due Dates")}
                className="button small"
              >
                Todo Homework Due Dates List
              </button>
            </Link>
            <Link className="hover:text-cloud-purple" href="/eventpage">
              <button
                // disabled={todoType === "Grocery List"}
                onClick={() => setTodoType("Events List")}
                className="button small"
              >
                Todo Event List:
              </button>
            </Link>
          </div>

          <form onSubmit={addTodo}>
            <div className="h2">Add New Todo</div>
            <div className="my-5">
              {/* -----------INPUT BOX FOR TODO---------- */}
              <label htmlFor="todoTitle" className="inline-block w-[75px]">
                Todo Title:
              </label>
              <input
                id="todoTitle"
                className="border border-2 border-black px-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                type="text"
              />

              <label htmlFor="Select Todo Type">
                <select
                  // value="Grocery List"
                  onChange={(e) => setTodoType(e.target.value)}
                >
                  {selectTodoTypes.map((todoType) => (
                    <option key={todoType.id} value={todoType.value}>
                      {todoType.text}
                    </option>
                  ))}
                </select>
              </label>
              {/* ------------SUBMIT BUTTON-------------- */}
              <div className="text-center">
                <input
                  type="submit"
                  className="button small"
                  // disabled={isInputDisabled}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TodoList;
