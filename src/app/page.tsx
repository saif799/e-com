// import { addPost, deletePost } from "@/actions/addpost";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { db } from "@/server/db";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  // const fetchedPosts = await db.query.posts.findMany();

  return (
    <main className="h-full pt-16">
      <div className="flex items-center justify-center  w-full h-full p-20">
        <div> 

        <img
          src="/Group 2.jpg"
          alt="slide 4"
          className="object-cover"
           
          />
          </div>
      </div>
    </main>
  );
}
