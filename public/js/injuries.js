document.querySelectorAll('.injury-card').forEach((card, index) => {
  card.animate(
    [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    {
      duration: 420,
      delay: index * 55,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'both'
    }
  );

  card.addEventListener('click', () => {
    const playerData = JSON.parse(card.dataset.player);
    const fullName = `${playerData.first_name} ${playerData.last_name}`;
    const injuryMarkup = playerData.injury
      ? `
        <div style="display:grid;gap:12px;text-align:left;">
          <div style="padding:14px 16px;border-radius:18px;background:rgba(239,68,68,0.08);border:1px solid rgba(248,113,113,0.2);">
            <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#ef4444;font-weight:700;">Status</div>
            <div style="margin-top:8px;font-size:18px;font-weight:700;color:#0f172a;">${playerData.injury.status || 'Reported'}</div>
          </div>
          <div style="padding:14px 16px;border-radius:18px;background:#f8fafc;border:1px solid rgba(148,163,184,0.25);">
            <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#64748b;font-weight:700;">Comment</div>
            <div style="margin-top:8px;font-size:15px;line-height:1.6;color:#1e293b;">${playerData.injury.comment || 'No additional injury note was returned.'}</div>
          </div>
        </div>`
      : `
        <div style="padding:14px 16px;border-radius:18px;background:rgba(16,185,129,0.1);border:1px solid rgba(52,211,153,0.24);text-align:left;">
          <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#059669;font-weight:700;">Current Report</div>
          <div style="margin-top:8px;font-size:15px;line-height:1.6;color:#1e293b;">No injury was matched for this player in the current feed.</div>
        </div>`;

    Swal.fire({
      title: fullName,
      html: `
        <div style="display:grid;gap:16px;">
          <div style="display:flex;align-items:center;gap:14px;padding:18px;border-radius:22px;background:linear-gradient(135deg,#111827,#1f2937);text-align:left;">
            <div style="display:flex;align-items:center;justify-content:center;height:64px;width:64px;border-radius:20px;background:rgba(248,113,113,0.18);color:#fee2e2;font-size:24px;font-weight:700;flex-shrink:0;">${playerData.first_name.charAt(0)}${playerData.last_name.charAt(0)}</div>
            <div>
              <div style="font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#94a3b8;font-weight:700;">${playerData.position || 'N/A'}</div>
              <div style="margin-top:6px;font-size:15px;color:#e2e8f0;">${playerData.team || 'Free Agent'}</div>
            </div>
          </div>
          ${injuryMarkup}
        </div>`,
      confirmButtonText: 'Close',
      confirmButtonColor: '#ef4444',
      background: '#ffffff',
      color: '#0f172a',
      width: 560,
      customClass: {
        popup: 'injury-swal-popup'
      }
    });
  });
});

 