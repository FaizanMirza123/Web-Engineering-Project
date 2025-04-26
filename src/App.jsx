import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
// import SQLInjection from "./pages/SQLInjection";
// import XSSAttack from "./pages/XSSAttack";
// import DDoSAttack from "./pages/DDoSAttack";
// import NotFound from ".//NotFound";
import Navbar from "./Navbar";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Index />} />
        {/* <Route path="sql-injection" element={<SQLInjection />} />
        <Route path="xss" element={<XSSAttack />} />
        <Route path="ddos" element={<DDoSAttack />} />
        <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
