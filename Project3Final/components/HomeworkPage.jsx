/** @format */

import { getTodoList } from "csc-start/utils/data";

const HomeworkPage = async (user_id) => {
  const todoType = "Homework Due Dates";

  const { data: homework } = await getTodoList(todoType);

  const filteredList = homework.filter((list) => {
    return list.user_id === user_id;
  });

  console.log("todoType", todoType);
  console.log(homework);
  return (
    <div className="barge flex flex-col gap-[24px] pb-[60px]">
      {Array.isArray(homework) &&
        homework.map(({ id, title }) => {
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

export default HomeworkPage;
