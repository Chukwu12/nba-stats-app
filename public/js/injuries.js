// ===========================================opening/closing Modal ========================//
 async function openInjuryReport() {
    const modal = document.getElementById("injuryModal");
    const content = document.getElementById("injuryModalContent");

    // Fetch data from Express route
    try {
      const res = await fetch("/api/injury-report");
      const data = await res.json();

      // Build list of injuries
      let html = "<h2 class='text-xl font-bold mb-4'>Injury Report</h2>";
      if (data.length === 0) {
        html += "<p>No current injuries reported ✅</p>";
      } else {
        data.forEach(player => {
          html += `
            <div class="border-b border-gray-200 py-2">
              <strong>${player.name}</strong> - ${player.team}<br/>
              <span class="text-red-600">${player.injury}</span>
            </div>
          `;
        });
      }

      content.innerHTML = html;
    } catch (err) {
      content.innerHTML = "<p class='text-red-500'>Error loading injury report.</p>";
    }

    modal.classList.remove("hidden");
  }

  function closeInjuryReport() {
    document.getElementById("injuryModal").classList.add("hidden");
  }



  document.querySelectorAll('.injury-card').forEach(card => {
    card.addEventListener('click', () => {
      const playerData = JSON.parse(card.dataset.player);

      const injuryInfo = playerData.injury
        ? `<p><strong>Status:</strong> ${playerData.injury.status}</p>
           <p><strong>Comment:</strong> ${playerData.injury.comment}</p>`
        : '<p>No injury reported</p>';

      Swal.fire({
        title: `${playerData.first_name} ${playerData.last_name}`,
        html: `<p><strong>Team:</strong> ${playerData.team}</p>${injuryInfo}`,
        icon: playerData.injury ? 'warning' : 'success',
        confirmButtonText: 'Close'
      });
    });
  });

