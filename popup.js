const checkbox = document.getElementById('switch');

// Load saved state
chrome.storage.local.get('interceptorEnabled', data => {
    checkbox.checked = data.interceptorEnabled ?? false;
});

// Save state when changed
checkbox.addEventListener('change', () => {
    chrome.storage.local.set({ interceptorEnabled: checkbox.checked });
});



const hidebatchAttackModalCheckbox = document.getElementById('hidebatchAttackModal');

// Load saved state
chrome.storage.local.get('hidebatchAttackModal', data => {
    hidebatchAttackModalCheckbox.checked = data.hidebatchAttackModal ?? false;
});

// Save state when changed
hidebatchAttackModalCheckbox.addEventListener('change', () => {
    chrome.storage.local.set({ hidebatchAttackModal: hidebatchAttackModalCheckbox.checked });
});


const autoRemoveDeadCheckbox = document.getElementById('autoRemoveDead');

// Load saved state
chrome.storage.local.get('autoRemoveDead', data => {
    autoRemoveDeadCheckbox.checked = data.autoRemoveDead ?? false;
});

// Save state when changed
autoRemoveDeadCheckbox.addEventListener('change', () => {
    chrome.storage.local.set({ autoRemoveDead: autoRemoveDeadCheckbox.checked });
});