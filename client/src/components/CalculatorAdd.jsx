import { Link } from 'react-router-dom';
import mnthbtn from '../assets/mnthbtn.png';
import yrbtn from '../assets/yrbtn.png';
import swal from 'sweetalert';
import axios from 'axios';
import { useState } from 'react';

export default function CalculatorAdd() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [points, setPoints] = useState('');
  const [date, setDate] = useState('');
  const [carbon_percentage, setCarbonPercentage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      month,
      year,
      points,
      date,
      carbon_percentage,
    };

    // Validation

    if (
      month.length === 0 ||
      year.length === 0 ||
      points.length === 0 ||
      date.length === 0
    ) {
      swal(' Fields Cannot empty !', 'Please enter all data !', 'error');
    } else {
      console.log(data);
      axios
        .post('http://localhost:5000/api/calculators/', data)
        .then(function (response) {
          console.log(response.data);
          setMonth('');
          setYear('');
          setPoints('');
          setDate('');
          setCarbonPercentage('');

          swal({
            text: 'Successfully Added',
            icon: 'success',
            button: 'Okay!',
          }).then(() => {
            window.location = '/calculator';
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function handleCalculation() {
    const points = document.getElementById('points').value;
    const carbonPercentage = (points * 0.998) / 1000;

    setCarbonPercentage(carbonPercentage.toFixed(3));
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-1">
        <div>
          <div className="mt-10 mb-10 ms-10 w-full max-w-sm p-4 bg-white border border-white rounded-lg shadow sm:p-6 md:p-8 dark:bg-transparent dark:border-white">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Calculator
            </h5>
            <br />

            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Month
              </label>

              <select
                id="month"
                name="month"
                onChange={(e) => setMonth(e.target.value)}
                autoComplete="Month"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-dark"
              >
                <option></option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>Sepember</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
            <br />

            <div>
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Year
              </label>
              <input
                type="year"
                name="year"
                id="year"
                onChange={(e) => setYear(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-dark"
                placeholder="year"
                required
              />
            </div>
            <br />
            <div>
              <label
                htmlFor="points"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Points in KWH
              </label>
              <input
                type="points"
                name="points"
                id="points"
                onChange={(e) => setPoints(e.target.value)}
                placeholder="points in KWH"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-dark"
                required
              />
            </div>
            <br />
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                placeholder="date"
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-dark"
                required
              />
            </div>
            <br />
            <button
              onClick={handleCalculation}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* ////////////////////////////// */}
        <div>
          <div className="mt-10 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-transparent dark:border-white">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Carbon Percentage
              </h5>
              <div>
                <input
                  type="number"
                  name="carbon_percentage"
                  id="carbon_percentage"
                  value={carbon_percentage}
                  onChange={(e) => setCarbonPercentage(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save Month Report
              </button>
            </form>
          </div>
        </div>
        <div>
          <h1
            className="mt-10 font-medium text-gray-900 dark:text-white"
            style={{ marginLeft: '160px', fontSize: '40px' }}
          >
            Reports
          </h1>
          <div className="grid grid-cols-2 gap-1 mt-20">
            <div>
              <Link to="/monthreport">
                <img className="block h-25" src={mnthbtn} alt="Your Company" />
              </Link>
            </div>
            <div>
              <Link to="/yearreport">
                <img className="block h-25" src={yrbtn} alt="Your Company" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
