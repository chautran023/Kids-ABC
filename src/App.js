import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import './App.css';
import './fonts/BubbleBobble-rg3rx.ttf';
import SlideShow from "./Components/SlideShow";
import Test from "./Components/Test";
import Gallery from "./Components/Gallery";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/slideshow" element={<SlideShow />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
