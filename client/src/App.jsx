import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Calculator from './pages/Calculator';
import CalculatorUpdatePage from './pages/CalculatorUpdatePage';
import YearReportPage from './pages/YearReportPage';
import MonthReportPage from './pages/MonthReportPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route
            path="/calculatorupdate/:cal_id"
            element={<CalculatorUpdatePage />}
          />
          <Route path="/monthreport" element={<MonthReportPage />} />
          <Route path="/yearreport" element={<YearReportPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
