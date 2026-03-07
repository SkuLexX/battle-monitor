(function () {
  const container = document.createElement('div');

  Object.assign(container.style, {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '99999',
  });

  container.id = 'notification-container';

  document.body.appendChild(container);

  const TARGET = "damage.php";
  const JOIN_TARGET = "user_join_battle.php";


  const origFetch = window.fetch;

  window.fetch = async (...args) => {

    const response = await origFetch(...args);

    const url = typeof args[0] === "string" ? args[0] : args[0].url;

    const options = args[1] || {};
    let payload = {};
    for (const [k, v] of options.body.entries()) {
      payload[k] = v;
    }

    console.log(payload)

    const id = payload.monster_id;

    const autoRemoveDead = localStorage.getItem("autoRemoveDead")


    if (url.includes(TARGET)) {

      const clone = response.clone();
      const text = await clone.text();

      let atkRes = JSON.parse(text);


      if (autoRemoveDead && (atkRes.status == "error" && atkRes.message.includes("dead") || atkRes.hp.value == 0)) {
        const monsterCard = document.querySelector(`.monster-card[data-monster-id="${id}"]`);
        if (monsterCard) {
          monsterCard.remove();
          showNotification("Dead Monster Removed")
        }
      }
      if (atkRes.status != "success") return;

      const monsterCard = document.querySelector(`.monster-card[data-monster-id="${id}"]`);
      if (!monsterCard) return;

      let dmgSpan = monsterCard.querySelector('span[title="Your damage dealt"]');
      if (!dmgSpan) {
        const container = monsterCard.querySelector('label.pickWrap')?.parentElement;
        dmgSpan = document.createElement('span');
        dmgSpan.className = 'mini-chip party-chip';
        dmgSpan.title = 'Your damage dealt';
        container.appendChild(dmgSpan);
      }

      dmgSpan.innerHTML = `🩸 You: ${atkRes.totaldmgdealt.toLocaleString()}`;

      const hpValueElem = monsterCard.querySelector('.stat-row:nth-child(1) .stat-value');
      if (hpValueElem) {
        hpValueElem.innerHTML = `${atkRes.hp.value.toLocaleString()} / ${atkRes.hp.max.toLocaleString()}`;
      }

      const hpFill = monsterCard.querySelector('.hp-fill');
      if (hpFill) {
        const percent = (atkRes.hp.value / atkRes.hp.max) * 100;
        hpFill.style.width = `${percent}%`;
      }


    }
    return response;
  };
  function showNotification(msg) {

    const note = document.createElement('span');
    note.textContent = msg;

    // Apply the styles
    Object.assign(note.style, {
      background: 'rgb(3, 63, 226)',
      color: 'rgb(255, 255, 255)',
      padding: '4px 8px',
      borderRadius: '4px',
      margin: '5px 10px',
      display: 'inline-block',
      fontSize: '15px',
      width: '120px',
      opacity: '0',
      textAlign: 'center',
      transition: 'opacity 0.5s'
    });

    // Append to an existing container or body
    const container = document.getElementById('notification-container') || document.body;
    container.appendChild(note);

    // Fade in
    requestAnimationFrame(() => {
      note.style.opacity = '1';
    });

    // Fade out after 5 seconds
    setTimeout(() => {
      note.style.opacity = '0';
      note.addEventListener('transitionend', () => note.remove());
    }, 5000);
  }
})();
