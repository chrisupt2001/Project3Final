/** @format */
"use client";

import Link from "next/link";
import Header from "./Header";
const HomePage = () => {
  return (
    <div>
      {/* <h1 className='barge button small'>Welcome to Our Todo List App</h1> */}
      <Link
        className='hover:text-cloud-purple duration-300 transition-all'
        href='/todolist'
      >
        <button className='barge button small'>Create TODO LIST</button>
      </Link>
    </div>
  );
};

export default HomePage;
