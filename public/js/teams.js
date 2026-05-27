const teamChartCanvas = document.getElementById("teamChart");

if (teamChartCanvas && typeof Chart !== "undefined") {
  const chartData = JSON.parse(teamChartCanvas.dataset.chart || "[]");
  const chartLabel = teamChartCanvas.dataset.label || "Team historical snapshot";
  const teamChartContext = teamChartCanvas.getContext("2d");

  new Chart(teamChartContext, {
    type: "bar",
    data: {
      labels: ["Championships", "Best Wins", "Best Losses"],
      datasets: [
        {
          label: chartLabel,
          data: chartData,
          borderRadius: 12,
          backgroundColor: [
            "rgba(34, 211, 238, 0.75)",
            "rgba(16, 185, 129, 0.75)",
            "rgba(251, 191, 36, 0.75)"
          ],
          borderColor: [
            "rgba(125, 211, 252, 1)",
            "rgba(52, 211, 153, 1)",
            "rgba(252, 211, 77, 1)"
          ],
          borderWidth: 1.5
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Historical team snapshot",
          color: "#e2e8f0",
          font: {
            family: "Space Grotesk",
            size: 16,
            weight: "700"
          }
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.94)",
          titleColor: "#f8fafc",
          bodyColor: "#cbd5e1",
          borderColor: "rgba(255, 255, 255, 0.08)",
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#cbd5e1",
            font: {
              family: "Space Grotesk",
              size: 12,
              weight: "600"
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#94a3b8",
            font: {
              family: "Space Grotesk",
              size: 12
            }
          },
          grid: {
            color: "rgba(148, 163, 184, 0.12)"
          }
        }
      }
    }
  });
}


