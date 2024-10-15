"use client";
interface IComment {
  id: number;
  name: string;
  email: string;
  body: string;
}

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Page = () => {
  const { ref, inView } = useInView({ threshold: 0.9 });
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<IComment[]>([]);

  console.log("inView", inView);

  const getComments = async (page: number = 1) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`
      );
      const json: IComment[] = await response.json();
      setComments([...comments, ...json]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (inView) {
      getComments(page);
    }
  }, [inView]);

  return (
    <section>
      <div className="max-w-[1000px] m-auto">
        <h1 className="text-primary align-center font-bold m-5 text-3xl text-center">
          Lazy-loading on scroll
        </h1>
        {comments.length > 0 &&
          comments?.map((comment: IComment) => (
            <div key={comment.id} className=" border-2 rounded-sm p-4 mb-5">
              <div className="flex items-center gap-2">
                <span>{comment.id}.</span>
                <p>{comment.email}</p>
              </div>
              <p className="font-bold">{comment.name}</p>
              <p>{comment.body}</p>
            </div>
          ))}
        <div ref={ref} className="trigger"></div>
      </div>
    </section>
  );
};

export default Page;
