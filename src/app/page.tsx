import Image from "next/image";

export default function HomePage() {
  return (
    <main >
      <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/text mask.svg"
            alt="LEBRON NXXT"
            width={834}
            height={352}
            className="h-auto w-full max-w-5xl "
          />
        </div>

{/*  <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:items-center lg:pr-16">
        <div className="relative w-[80%] h-[50vh] max-w-[300px] lg:max-w-[500px] lg:h-[70vh] mt-20 lg:mt-0 lg:-ml-32">
          <Image
            src="/lakeres.svg"
            alt="LEBRON NXXT Shoe"
            layout="fill"
            objectFit="contain"
            className="transform scale-110 lg:scale-125"
          />
        </div>
      </div>*/}
        {/* Content container */}
        <div className="z-10 flex h-full items-center lg:justify-around justify-center px-8">
          <div></div>
          <div></div>
          <div></div>
          <div className="relative w-[80%] h-[50vh] max-w-[300px] lg:max-w-[500px] lg:h-[70vh] mt-20 lg:mt-0 lg:-ml-32">
            <Image
              src="/lakeres.svg"
              alt="LEBRON NXXT Shoe"
              layout="fill"
              objectFit="contain"
              className=" lg:scale-125 scale-110 transform"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
