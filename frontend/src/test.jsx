// test.jsx
import React from "react";
import { MouseEnterProvider } from "./components/ui/3d-card";
import { CardContainer, CardBody, CardItem } from "./components/ui/3d-card";
import { Link } from "react-router-dom";

export function ThreeDCardDemo({ link, title, image }) {
  return (
    <MouseEnterProvider>
      <Link to={link}>
        <CardContainer className="w-96">
          <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.1] border-gray-300 w-full sm:w-[30rem] h-auto rounded-xl p-8 border">
            <CardItem translateZ="50" className="w-full mt-4">
              <img
                src={image}
                className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="w-full flex justify-center align-center mt-4">
              <CardItem translateZ="100" className="text-2xl font-light bg-black rounded-full text-white w-full py-2">
                {title}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </Link>
    </MouseEnterProvider>
  );
}
