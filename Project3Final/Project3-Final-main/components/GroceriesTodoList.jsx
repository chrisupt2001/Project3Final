/** @format */

import { getTodoLists } from "csc-start/utils/data";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

const GroceriesTodoList = async ({ user_id }) => {
  const { data: groceries } = await getTodoLists(user_id, todoType);
  console.log("todoType", todoType);
  return (
    <div className='barge flex flex-col gap-[24px] pb-[60px]'>
      {Array.isArray(groceries) &&
        groceries.map(({ id, title }) => {
          return (
            <a
              key={id}
              title={title}
              // target='_blank'
              // rel='noopener noreferrer'
              // href={url}
              className='button'
            >
              {title} {todoType}
            </a>
          );
        })}
    </div>
  );
};

export default GroceriesTodoList;
