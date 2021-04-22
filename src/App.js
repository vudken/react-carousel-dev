import React from "react";
import { Images } from "./components/Data";
import Carousel from "./components/Carousel";
import "normalize.css";
import "./app.css";

function App() {
  return (
    <div className="container">
      <Carousel slides={Images} />
    </div>
  );
}

export default App;
