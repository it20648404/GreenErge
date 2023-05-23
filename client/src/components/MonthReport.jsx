import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MonthReport() {
  const [powerChartData, setPowerChartData] = useState([]);
  const [carbonChartData, setCarbonChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/calculators');
      const { data } = response;

      // Assuming the response contains an array of objects with the data structure you provided
      const formattedPowerData = data.map((entry) => ({
        x: entry.month,
        y: parseFloat(entry.points),
      }));

      const formattedCarbonData = data.map((entry) => ({
        x: entry.month,
        y: parseFloat(entry.carbon_percentage),
      }));

      // Update chart data
      setPowerChartData(formattedPowerData);
      setCarbonChartData(formattedCarbonData);

      // Update chart options
      setChartOptions({
        xaxis: {
          type: 'month',
          categories: data.map((entry) => entry.month),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////////////

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        row.month.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  const getdata = () => {
    axios
      .get('http://localhost:5000/api/calculators/')

      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (cal_id) => {
    // handle edit button click
    navigate(`/calculatorupdate/${cal_id}`);
  };

  const handleDelete = (cal_id) => {
    axios
      .delete(`http://localhost:5000/api/calculators/delete/${cal_id}`)
      .then(() => {
        // refresh the data
        getdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <form>
          <div className="relative mt-10 mb-10 me-10 ms-10">
            <input
              type="search"
              id="default-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-white border border-white rounded-lg bg-light focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-white dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white"
              placeholder="Search"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </form>

        <h3 className="mt-2 mb-10 font-medium text-gray-900 dark:text-dark ml-6 text-2xl">
          Monthly
        </h3>

        <div className="grid grid-cols-4 gap-1 mt-2">
          <div className="flex flex-col">
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>
                  <div
                    className="ms-10 me-20 mt-5 text-dark bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-dark font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-white dark:hover:bg-green-500 dark:focus:ring-white"
                    style={{ width: '300px', justifyContent: 'space-between' }}
                  >
                    <span className="-12">{row.month}</span>
                    <div style={{ marginLeft: 'auto' }}>
                      <button>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 22 22"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          onClick={() => handleDelete(row.cal_id)}
                        >
                          <path
                            fillRule="evenodd"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          ></path>
                        </svg>
                      </button>
                      <button>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 22 22"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          onClick={() => handleEdit(row.cal_id)}
                        >
                          <path
                            fillRule="evenodd"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </td>
              </tr>
            ))}

            {/* ///////////////////// */}
            <br />
          </div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <h3 className="mt-2 mb-10 font-medium text-gray-900 dark:text-dark ml-6 text-2xl">
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
              width="700px"
              height="300px"
            />

            <h3 className="mt-10 mb-10 font-medium text-gray-900 dark:text-dark ml-6 text-2xl">
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
              width="700px"
              height="300px"
              className="mb-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
