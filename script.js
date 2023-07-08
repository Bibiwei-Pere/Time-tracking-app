const subtitles = document.querySelectorAll(".previous");
const times = document.querySelectorAll(".time");
const listItems = document.querySelectorAll("li");

fetch("./data.json")
  .then((res) => res.json())
  .then((json) => {
    const changeValues = (id) => {
      let timefr = "";
      switch (id) {
        case "Day":
          timefr = "daily";
          break;

        case "Week":
          timefr = "weekly";
          break;

        case "Month":
          timefr = "monthly";
          break;

        default:
          break;
      }
      times.forEach((element, ind) => {
        element.textContent = `${json[ind].timeframes[timefr].current}hrs`;
      });
      subtitles.forEach((element, ind) => {
        element.textContent = `Last Day - ${json[ind].timeframes[timefr].previous}hrs`;
      });
    };

    listItems.forEach((item) => {
      item.addEventListener("click", () => {
        listItems.forEach((item) => (item.className = ""));
        item.className = "selected";

        changeValues(item.id);
      });
    });
  })
  .catch((err) => console.log(err));
