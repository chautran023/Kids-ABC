import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './fonts/BubbleBobble-rg3rx.ttf';
import Login from "./Components/Login";
import SlideShow from "./Components/SlideShow";
import Test from "./Components/Test";
import Gallery from "./Components/Gallery";



function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/Slideshow" element={<SlideShow />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/Gallery" element={<Gallery />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
