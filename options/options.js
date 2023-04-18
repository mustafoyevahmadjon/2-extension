const timeOption = document.getElementById("time-option")
timeOption.addEventListener("change", (event) => {
    const val = event.target.value;
    if(val < 1 || val > 60) {
        timeOption.value = 25
    }
})

const saveBtn = document.getElementById("save_btn");
saveBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        timeOption: timeOption.value,
        isRunning: false
    })
})

chrome.storage.local.get(["timeOption"],(result) => {
    timeOption.value = result.timeOption
})