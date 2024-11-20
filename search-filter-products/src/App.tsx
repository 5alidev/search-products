import "./App.css";

// filterContextProvider
import FilterContextProvide from "./contexts/FilterContext";

// my components
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

// routes
import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <main className="w-full min-h-screen">
      {/* container */}
      <FilterContextProvide>
        <div className="flex px-60 text-mutedBlack/80">
          <Sidebar />
          <div className="w-full">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/home" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
        </div>
      </FilterContextProvide>
    </main>
  );
}

export default App;
