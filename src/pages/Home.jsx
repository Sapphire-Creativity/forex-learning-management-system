import React from "react";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <h1 className="font-sans">Hello world!</h1>
      <h1 className="font-jakarta">Hello world!</h1>
      <h1 className="font-raleway">Hello world!</h1>
      <h2>I am Hello World, testing my font</h2>
      <h2 className="font-raleway">I am Hello World, testing my font</h2>
      <h2 className="font-jakarta">I am Hello World, testing my font</h2>
      <h2 className="font-montserrat">I am Hello World, testing my font</h2>

      <p className="my-10 font-raleway">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro magnam
        similique doloremque minus consectetur est debitis labore vitae in
        aliquid nostrum eveniet dignissimos quos, eligendi, nobis, corrupti
        tenetur odit explicabo sequi eaque placeat laborum? Debitis perferendis,
        nam molestiae hic odit corrupti ipsum assumenda nobis aliquid,
        dignissimos dicta, et delectus inventore.
      </p>
      <p className="my-10 font-jakarta">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro magnam
        similique doloremque minus consectetur est debitis labore vitae in
        aliquid nostrum eveniet dignissimos quos, eligendi, nobis, corrupti
        tenetur odit explicabo sequi eaque placeat laborum? Debitis perferendis,
        nam molestiae hic odit corrupti ipsum assumenda nobis aliquid,
        dignissimos dicta, et delectus inventore.
      </p>
      <p className="my-10 font-sans">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro magnam
        similique doloremque minus consectetur est debitis labore vitae in
        aliquid nostrum eveniet dignissimos quos, eligendi, nobis, corrupti
        tenetur odit explicabo sequi eaque placeat laborum? Debitis perferendis,
        nam molestiae hic odit corrupti ipsum assumenda nobis aliquid,
        dignissimos dicta, et delectus inventore.
      </p>
      <p className="my-10 font-montserrat">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro magnam
        similique doloremque minus consectetur est debitis labore vitae in
        aliquid nostrum eveniet dignissimos quos, eligendi, nobis, corrupti
        tenetur odit explicabo sequi eaque placeat laborum? Debitis perferendis,
        nam molestiae hic odit corrupti ipsum assumenda nobis aliquid,
        dignissimos dicta, et delectus inventore.
      </p>

      <div>
        <button className="btn btn-primary">Primary Button</button>

        <button className="btn btn-secondary">Hello</button>
      </div>
    </div>
  );
};

export default Home;
