
document.getElementById("icon").addEventListener("click", function() {

    const dayInput = parseInt(document.getElementById("day-input").value);
    const monthInput = parseInt(document.getElementById("month-input").value);
    const yearInput = parseInt(document.getElementById("year-input").value);

    let thisyears = document.getElementById("this-years");
    let thismonths = document.getElementById("this-months");
    let thisdays = document.getElementById("this-days");

    if (isValidDate(yearInput, monthInput, dayInput)) {
        let nowDate = new Date(); 
        let dateInput = new Date(yearInput, monthInput - 1, dayInput);

        let daysDifference = nowDate.getDate() - dayInput; 
        let monthDifference = nowDate.getMonth() - monthInput + 1;
        let yearDifference = nowDate.getFullYear() - yearInput;

        if (daysDifference < 0) { 
            monthDifference--;
            daysDifference += new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate();
        }

        if (monthDifference < 0) {
            yearDifference--;
            monthDifference += 12;
        }
        thisyears.innerHTML = yearDifference + " ";
        thismonths.innerHTML = monthDifference + " ";
        thisdays.innerHTML = daysDifference + " ";

        //to store calculated values in local storage
        localStorage.setItem("years", yearDifference)
        localStorage.setItem("months", monthDifference)
        localStorage.setItem("days", daysDifference)
    } else {

        let inputs = document.querySelectorAll("input");

        inputs.forEach((input) => {
            input.classList.add("err");
            input.classList.remove("class"); 
        });

        let divInput = document.querySelectorAll(".up");
        divInput.forEach((input) => {
            input.classList.add("err2");
            input.classList.remove("class"); 
        });

        // day invalid display
        let loseDay = document.createElement("span");
        let textSpan1 = document.createTextNode("must be a valid date");
        loseDay.appendChild(textSpan1);
        loseDay.setAttribute("class", "invDay");
        document.querySelector(".day").appendChild(loseDay);

        // month invalid display
        let loseMonth = document.createElement("span");
        let textSpan2 = document.createTextNode("must be a valid month");
        loseMonth.appendChild(textSpan2);
        loseMonth.setAttribute("class", "invMonth");
        document.querySelector(".month").appendChild(loseMonth);
        // year invalid display
        let loseYear = document.createElement("span");
        let textSpan3 = document.createTextNode("must be a valid year"); 
        loseYear.appendChild(textSpan3);
        loseYear.setAttribute("class", "invYear");
        document.querySelector(".year").appendChild(loseYear); 
    }

    function isValidDate(year, month, day) {
        let date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }
});