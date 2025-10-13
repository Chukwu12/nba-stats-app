 const teamStats = {
        labels: ["Wins", "Losses", "PPG", "RPG", "APG"],
        datasets: [{
          label: "Team Performance",
          data: [
            <%= info.wins || 0 %>,
            <%= info.losses || 0 %>,
            <%= info.points_per_game || 0 %>,
            <%= info.rebounds_per_game || 0 %>,
            <%= info.assists_per_game || 0 %>
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(153, 102, 255, 0.6)"
          ],
          borderColor: "#fff",
          borderWidth: 2
        }]
      };

      const ctx = document.getElementById("teamStatsChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: teamStats,
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: "#fff" } },
            title: {
              display: true,
              text: "Team Stats Overview",
              color: "#fff",
              font: { size: 18 }
            }
          },
          scales: {
            x: { ticks: { color: "#fff" } },
            y: { ticks: { color: "#fff" } }
          }
        }
      });


