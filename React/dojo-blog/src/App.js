import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";

function App() {
  // const title = "Welcome to the new blog";
  // const likes = 50;
  // const person = { name: "yoshi", age: 30 };
  // const link = "http://www.bing.com";

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          {/* <h1>App Component</h1>  */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

// https://github.com/iamshaunjp/Complete-React-Tutorial/