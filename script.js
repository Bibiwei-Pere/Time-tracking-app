const items = document.querySelectorAll("[data-chart-item]")

addEventListener("load", ()=>{
})

setupChart()


function setupChart() {
    getData().then(previous => renderChart(previous))
}

async function getData() {
    try {
        const response = await fetch("/data.json")
        if (!response.ok) {
            console.log("Response wasn't ok!")
            return []
        }
        const data = await response.json()
        return data.map(d => d.previous)
    } catch (err) {
        console.log("Yo, some errors happened, err.message:", err.message)
        return []
    }
}

function renderChart(amounts) {
    const maxAmount = Math.max(...amounts)
    const today = mapDay2Index(new Date().getDay())
    items.forEach((item, index) => {
        item.querySelector("[data-spending]").textContent = amounts[index].toString()
        const bar = item.querySelector("[data-bar]")
        bar.style.height = (amounts[index] / maxAmount) * 100 + "%"
        bar.classList.add("cha__bar--animate")
        if (today === index) bar.classList.add("chart__bar--today")
        bar.addEventListener("transitionend", () => {
            item.querySelector("[data-chart-container]").style.overflow = "initial"
        })
    })

}

function mapDay2Index(day){
    if (day === 0) return 6
    return day - 1
}