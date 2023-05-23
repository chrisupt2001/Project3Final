/** @format */

"use client";

import { getTodoList } from "csc-start/utils/data";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { useState } from "react";

const GroceriesTodoList = async (user_id) => {
  // const [listItems, setListItems] = useState([]);

  const todoType = "Grocery List";

  const { data: groceries } = await getTodoList(todoType);

  // const filteredList = groceries.filter((list) => {
  //   return list.user_id === user_id;
  // });

  console.log("todoType", todoType);
  console.log(groceries);

  return (
    <div className="barge flex flex-col gap-[24px] pb-[60px]">
      {Array.isArray(groceries) &&
        groceries.map(({ id, title }) => {
          return (
            <ol
              key={id}
              title={title}
              // target='_blank'
              // rel='noopener noreferrer'
              // href={url}
            >
              {title}
            </ol>
          );
        })}
      <input type="text" id="type" name="type"></input>
      <button>
        <label for="button">add</label>
      </button>
    </div>
  );
};

export default GroceriesTodoList;
