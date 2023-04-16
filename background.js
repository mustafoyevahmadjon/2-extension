chrome.alarms.create("Timero Extension",{
    periodInMinutes: 1/60
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name = "Timero Extension") {
        chrome.storage.local.get(["timer", "isRunning"], (result) => {
            if(result.isRunning) {
                let timer = result.timer + 1
                let isRunning = true
                if(timer === 10) {
                    this.registration.showNotification("Time Extension", {
                        body: "25 minut has passed !",
                        icon: "clock.png"
                    })
                    timer = 0
                    isRunning=false
                }
                chrome.storage.local.set({timer, isRunning})
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