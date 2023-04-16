chrome.alarms.create("Timero Extension",{
    periodInMinutes: 1/60
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name = "Timero Extension") {
        chrome.storage.local.get(["timer", "isRunning"], (result) => {
            if(result.isRunning) {
                let timer = result.timer + 1
                chrome.storage.local.set({timer})
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning"], (result) => {
    chrome.storage.local.set({
        timer: "timer" in result ? result.timer : 0,
        isRunning: "isRunning" in result ? result.isRunning : false
    })
})