import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

export default function YearReport() {
  const [powerChartData, setPowerChartData] = useState([]);
  const [carbonChartData, setCarbonChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [selectedYear, setSelectedYear] = useState('');
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch data when the selected year changes
    if (selectedYear !== '') {
      fetchData();
    }
  }, [selectedYear]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/calculators');
      const { data } = response;

      // Get unique years from the data
      const years = [...new Set(data.map((entry) => entry.year))];

      // Update available years
      setAvailableYears(years);

      // Filter data based on the selected year
      const filteredData = data.filter((entry) => entry.year === selectedYear);

      // Assuming the response contains an array of objects with the data structure you provided
      const formattedPowerData = filteredData.map((entry) => ({
        x: entry.month,
        y: parseFloat(entry.points),
      }));

      const formattedCarbonData = filteredData.map((entry) => ({
        x: entry.month,
        y: parseFloat(entry.carbon_percentage),
      }));

      // Update chart data
      setPowerChartData(formattedPowerData);
      setCarbonChartData(formattedCarbonData);

      // Update chart options
      setChartOptions({
        xaxis: {
          type: 'category',
          categories: filteredData.map((entry) => entry.month),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <>
      <div>
        <h3 className="mt-2 mb-10 font-medium text-gray-900 dark:text-dark ml-6 text-2xl">
          Yearly
        </h3>
        <div className="grid grid-cols-4 gap-1 ms-10">
          <select
            onChange={handleYearChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-dark"
          >
            <option value="">Select Year</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-1 mt-2 ms-20">
          <div className="flex flex-col">
            <h3 className="mt-10 mb-10 font-medium text-gray-900 dark:text-white ml-6 text-3xl">
              Power Consumption
            </h3>
            <Chart
              options={chartOptions}
              series={[
                {
                  name: 'Power Consumption',
                  data: powerChartData,
                },
              ]}
              type="bar"
              width="600px"
              height="300px"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="mt-10 mb-10 font-medium text-gray-900 dark:text-white ml-6 text-3xl">
              Carbon Accumulation
            </h3>
            <Chart
              options={chartOptions}
              series={[
                {
                  name: 'Carbon Accumulation',
                  data: carbonChartData,
                },
              ]}
              type="bar"
              width="600px"
              height="300px"
              className="mb-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
