import { useEffect, useState } from "react";
import "./FlightList.css";
import useFetch from "../../utils/useFetch";
import { fetchFlightUrl } from "../../Constants";
import { getTime } from "../../utils/getTime";
import DropDown from "../DropDown/DropDown";

function FlightList() {
  const [flightData, setData] = useState(null);
  const [airlines, setAirlines] = useState(null);

  const { data, loading, error } = useFetch(fetchFlightUrl);

  useEffect(() => {
    if (data) setData(data?.data?.result);
    let allAirlines = new Set([]);
    data?.data?.result?.map((element) => {
      allAirlines.add(element?.displayData?.airlines[0]?.airlineName);
    });
    setAirlines(Array.from(allAirlines));
  }, [data]);

  function sortHandler(type = "asc") {
    const sortedFlights = [...flightData];
    if (type == "asc") {
      sortedFlights.sort((a, b) => a.fare - b.fare);
    } else if (type == "desc") {
      sortedFlights.sort((a, b) => b.fare - a.fare);
    }
    setData(sortedFlights);
  }
  function handleFilter(flight) {
    const filteredFlights = data?.data?.result?.filter((element, index) => {
      return flight == element?.displayData?.airlines[0]?.airlineName;
    });
    setData(filteredFlights);
  }
  function resetResults() {
    if (data?.data?.result) setData(data.data.result);
  }
  function getFilterList() {
    if (airlines) {
      const filterData = airlines?.map((airline, index) => {
        return {
          label: airline,
          onClickHandler: () => handleFilter(airline),
        };
      });
      return [
        ...filterData,
        {
          label: "Reset",
          onClickHandler: () => resetResults(),
        },
      ];
    }
  }
  if (data && !loading) {
    return (
      <div className="container">
        <div className="filter-sort-container">
          <DropDown dropDownList={getFilterList()} label="Filter" />
          <DropDown
            dropDownList={[
              {
                label: "price low to high",
                onClickHandler: () => sortHandler("asc"),
              },
              {
                label: "price high to low",
                onClickHandler: () => sortHandler("desc"),
              },
              {
                label: "Reset",
                onClickHandler: () => resetResults(),
              },
            ]}
            label="Sort ↕"
          />
        </div>
        {flightData?.map((element) => {
          return (
            <div className="cards-container" key={element.id}>
              {flightCard(element.displayData)}
              <div className="price-box">
                <div className="flight-name">
                  {element?.displayData?.airlines[0]?.airlineName}
                </div>
                <div>{`₹  ${element?.fare}`}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (loading) {
    return <div className="center-text">Loading....</div>;
  } else if (error) {
    return <div className="center-text">{error?.message}</div>;
  }
}
function flightCard(data) {
  return (
    <div className="card-info">
      <div className="departure-info">
        <div className="time">{getTime(data?.source?.depTime)}</div>
        <div className="airport">{data?.source?.airport?.cityCode}</div>
      </div>
      <div className="duration-container">
        <div className="stop-info">{data?.totalDuration}</div>
        <div className="stop-count">{data?.stopInfo}</div>
      </div>
      <div className="arrival-info">
        <div className="time">{getTime(data?.destination?.arrTime)}</div>
        <div className="airport">{data?.destination?.airport?.cityCode}</div>
      </div>
    </div>
  );
}
export default FlightList;
