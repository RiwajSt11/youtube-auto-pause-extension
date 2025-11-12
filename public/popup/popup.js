const toggle = document.getElementById("toggle");

chrome.storage.sync.get(["enabled"], (result) => {
  const enabled = result.enabled;

  if (enabled === undefined) {
    toggle.checked = true; 
    chrome.storage.sync.set({ enabled: true }); 
  } else {
    toggle.checked = enabled; 
  }
});

toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});
