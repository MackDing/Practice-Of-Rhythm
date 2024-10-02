// const Home = () => {
//   const handleClick = (e) => {
//     console.log("Hello ninjas", e);
//   };
//   const handleClickAgain = (name, e) => {
//     console.log("Hello " + name, e.target);
//   };
//   return (
//     <div className="home">
//       <h2>Homepage</h2>
//       <button onClick={handleClick()}>Click me</button>
//       <button
//         onClick={(e) =>
//           //   console.log("Hello");
//           handleClickAgain("mario", e)
//         }
//       >
//         Click me again
//       </button>
//     </div>
//   );
// };

// const Home = () => {
//   // let name = "mario";
//   const [name, setName] = useState("mario");

//   const [age, setAge] = useState(25);
//   const handleClick = () => {
//     setName("liugi");
//     setAge("30");
//     // name = "luigi";
//     // console.log(name);
//   };
//   return (
//     <div className="home">
//       <h2>Homepage</h2>
//       <p>
//         {name} is {age} years old
//       </p>
//       <button onClick={handleClick}>Click me</button>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: "My new website", body: "lorem ipsum...", author: "mario", id: 1 },
    { title: "Welcome party!", body: "lorem ipsum...", author: "yoshi", id: 2 },
    {
      title: "Web dev top tips",
      body: "lorem ipsum...",
      author: "mario",
      id: 3,
    },
  ]);

  const [name, setName] = useState("mario");

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  useEffect(() => {
    console.log("use effect ran");
    // console.log(blogs);
    console.log(name);
  }, [name]);

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} />
      <button onClick={() => setName("luigi")}>change me</button>
      <p>{name}</p>
    </div>
  );
};

export default Home;
