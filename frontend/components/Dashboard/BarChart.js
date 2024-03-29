import React from "react";
import Chart from "chart.js";

export default function BarChart({stationLabel,solvedComplaints,pendingComplains}) {
  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels:stationLabel,
        datasets: [
          {
            label: 'Pending',
            backgroundColor: "#e60000",
            borderColor: "#4a5568",
            data: pendingComplains,
            fill: false,
            barThickness: 15,
          },
          {
            label: "Solved",
            fill: false,
            backgroundColor: "#00cc00",
            borderColor: "#3182ce",
            data: solvedComplaints,
            barThickness: 15,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Complaints",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [pendingComplains,solvedComplaints,stationLabel]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-2/3 mb-6 shadow-lg rounded mx-auto">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
            
              <h2 className="text-blueGray-700 text-xl font-semibold mx-auto">
                 Complaint Statistics
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}