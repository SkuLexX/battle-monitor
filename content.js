chrome.storage.local.get('interceptorEnabled',async ({ interceptorEnabled }) => {
    if (!interceptorEnabled) return;
    chrome.storage.local.get('hidebatchAttackModal', async ({ hidebatchAttackModal }) => {
        if(hidebatchAttackModal){
            modal = await getElement("#batchAttackModal")
            modal.style.visibility= "hidden";
        }
    })
    const { autoRemoveDead } = await chrome.storage.local.get('autoRemoveDead');

    localStorage.setItem("autoRemoveDead",autoRemoveDead)

    const s = document.createElement("script");
    s.src = chrome.runtime.getURL("interceptor.js");
    (document.head || document.documentElement).appendChild(s);
    s.onload = () => s.remove();
});

async function getElement(selector) {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const btn = document.querySelector(selector);

      if (btn) {
        clearInterval(interval);
        resolve(btn);
      }
    }, 200);
  });
}
