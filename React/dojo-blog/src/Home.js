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

import { useState } from "react";
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

const Home = () => {
  const [bolgs, setBlogs] = useState([
    { title: "My new website", body: "lorem ipsum...", author: "mario", id: 1 },
    { title: "Welcome party!", body: "lorem ipsum...", author: "yoshi", id: 2 },
    {
      title: "Web dev top tips",
      body: "lorem ipsum...",
      author: "mario",
      id: 3,
    },
  ]);
  return (
    <div className="home">
      {bolgs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <h2>{blog.title}</h2>
          <p>Written byt {blog.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
