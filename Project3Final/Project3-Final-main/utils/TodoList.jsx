/** @format */

"use client";

import useUser from "csc-start/hooks/useUser";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import {
  addNewTodo,
  getGroceriesTodoList,
  // deleteNewLink,
  getCurrentUser,
  getTodoLists,
} from "csc-start/utils/data";
import { useState, useEffect } from "react";
import supabase from "csc-start/utils/supabase";
const TodoList = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [currentUser, setCurrentUser] = useState(0);
  const [currentLinks, setCurrentLinks] = useState([]);
  const [todos, setTodos] = useState([]);
  const [inputDisabled, isInputDisabled] = useState(false);
  const [localTodoLists, setLocalTodoLists] = useState([]);
  // const [checked, setChecked] = useState(false);

  const selectTodoTypes = [
    { id: "1", value: "Grocery List", text: "Grocery List" },
    { id: "2", value: "House Chores", text: "House Chores" },
    { id: "3", value: "Pay Bills", text: "Pay Bills" },
    { id: "4", value: "Call Mom", text: "Call Mom" },
  ];
  const [todoType, setTodoType] = useState("Grocery List");

  // const { data: lists } = await getTodoLists(user_id);
  // var allLists = new Set();
  // setLocalTodoLists(allLists);
  // the user hook, will, provide us with the following, and it is completely abstracted away
  //  - user, and update whenever it's changed (undefined if loading, set if loaded)

  const { user, refreshUser, error, loading } = useUser();
  // we removed the useUser in the userMustBeLogged component, and now are supplying the user
  useUserMustBeLogged(user, "in", "/login");
  useEffect(() => {
    if (user) {
      // let tempCurrentLinks = user.socialLinks;
      let tempCurrentLinks = user.socialLinks;

      if (todoType === "Grocery List") {
        // tempCurrentLinks = user.linkLinks;
        tempCurrentLinks = user.linkLinks;
      }

      setCurrentLinks(tempCurrentLinks);
      setCurrentUser(user);
    }
  }, [user, todoType]);

  const addNewTodo = async (e) => {
    e.preventDefault();

    const order = currentLinks.length + 1;
    const addedTodo = await addNewTodo(user.id, title, order, todoType);

    if (addedTodo.success == false) {
      //handle error
      return;
    }
    setUrl("");
    setTitle("");
    // setTodoType("");
    // setIsInputDisabled(true);

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
    refreshUser();
    //handle success
  };

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
    <div className='barge'>
      {!!error && (
        <div
          className={`bg-red-200 border-2 border-red-800 text-red-800 py-2 px-5 my-10 text-center`}
        >
          <span className='font-bold'>{error.message}</span>
        </div>
      )}
      {!error && loading && <p>Loading...</p>}
      {!error && !loading && (
        <div>
          <div className='flex justify-between my-5'>
            <button
              // disabled={todoType === "Grocery List"}
              onClick={() => setTodoType("House Chores")}
              className='button small'
            >
              Todo List #1:
            </button>
            <button
              // disabled={todoType === "House Chores"}
              onClick={() => setTodoType("Grocery List")}
              className='button small'
            >
              Todo House Chores List
            </button>
          </div>
          <p className='h2 my-5'>
            Currently Viewing <span className='capitalize'>{todoType}</span>
          </p>
          <table>
            <thead>
              <tr>
                <th>
                  <u>Todo Title</u>
                </th>
                <th>
                  <u>Todo Type</u>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentLinks.map((link) => {
                return (
                  <tr key={link.id}>
                    <td>{link.title}</td>
                    {/* Future Delete Button */}
                    <button
                      className='button small text-25xl'
                      // onClick={(e) => deleteTodo(e)}
                    >
                      &times;
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <form onSubmit={addNewTodo}>
            <p className='h2'>Add New Todo</p>
            <p className='my-5'>
              {/* -----------INPUT BOX FOR TODO---------- */}
              <label htmlFor='todoTitle' className='inline-block w-[75px]'>
                Todo Title:
              </label>
              <input
                id='todoTitle'
                className='border border-2 border-black px-2'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                type='text'
              />
            </p>
            {/* ------------SELECT TODO TYPE INPUT AND DROP DOWN MENU----------------- */}
            <p className='my-5'>
              <label htmlFor='todoItems' className='inline-block w-[75px]'>
                Selected Todo Type is : {todoType}
              </label>
              <label htmlFor='Select Todo Type'>
                <select
                  defaultValue='Grocery List'
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
              <p className='text-center'>
                <input
                  type='submit'
                  className='button small'
                  // disabled={isInputDisabled}
                />
              </p>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default TodoList;
