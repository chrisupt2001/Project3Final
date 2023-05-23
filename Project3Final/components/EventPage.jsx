/** @format */

import { getTodoList } from "csc-start/utils/data";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

const EventTodoList = async (user_id) => {
  const todoType = "Event List";

  const { data: Events } = await getTodoList(todoType);

  const filteredList = Events.filter((list) => {
    return list.user_id === user_id;
  });

  console.log("todoType", todoType);
  console.log(Events);
  return (
    <div className="barge flex flex-col gap-[24px] pb-[60px]">
      {Array.isArray(Events) &&
        Events.map(({ id, title }) => {
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
    </div>
  );
};

export default EventTodoList;
