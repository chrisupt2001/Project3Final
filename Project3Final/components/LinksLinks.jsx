/** @format */

import { getLinksLinks } from "csc-start/utils/data";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

const GetLinksLinks = async ({ user_id }) => {
  const { data: links } = await getLinksLinks(user_id);

  return (
    <div className='barge flex flex-col gap-[24px] pb-[60px]'>
      {Array.isArray(links) &&
        links.map(({ id, title }) => {
          return (
            <a
              key={id}
              title={title}
              // target='_blank'
              // rel='noopener noreferrer'
              // href={url}
              className='button'
            >
              {title}
            </a>
          );
        })}
    </div>
  );
};

export default GetLinksLinks;
