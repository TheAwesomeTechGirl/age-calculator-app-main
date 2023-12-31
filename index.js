document.getElementById("icon").addEventListener("click", function() {
    // Clear error classes and messages from previous attempts
    document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("err");
        input.classList.remove("class");
    });
    document.querySelectorAll(".up").forEach((input) => {
        input.classList.remove("err2");
        input.classList.remove("class");
    });
    document.querySelectorAll(".invDay, .invMonth, .invYear").forEach((element) => {
        element.remove();
    });

    const dayInput = parseInt(document.getElementById("day-input").value);
    const monthInput = parseInt(document.getElementById("month-input").value);
    const yearInput = parseInt(document.getElementById("year-input").value);

    let thisyears = document.getElementById("this-years");
    let thismonths = document.getElementById("this-months");
    let thisdays = document.getElementById("this-days");

    if (isValidDate(yearInput, monthInput, dayInput) && yearInput <= 2023) {
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

        // Clear stored values from previous attempts
        localStorage.removeItem("years");
        localStorage.removeItem("months");
        localStorage.removeItem("days");

        // Store new calculated values in local storage
        localStorage.setItem("years", yearDifference);
        localStorage.setItem("months", monthDifference);
        localStorage.setItem("days", daysDifference);
    } else {
        let inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
            input.classList.add("err");
        });

         // Add this part to fetch and display stored values
         window.addEventListener("DOMContentLoaded", function () {
            let storedYears = localStorage.getItem("years");
            let storedMonths = localStorage.getItem("months");
            let storedDays = localStorage.getItem("days");
        
            if (storedYears !== null && storedMonths !== null && storedDays !== null) {
                document.getElementById("this-years").textContent = storedYears;
                document.getElementById("this-months").textContent = storedMonths;
                document.getElementById("this-days").textContent = storedDays;
            }
        });
        
        function isValidDate(year, month, day) {
            let date = new Date(year, month - 1, day);
            return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        }
        

        // Display error messages
        if (!isValidDate(yearInput, monthInput, dayInput)) {
            let loseDay = document.createElement("span");
            let textSpan1 = document.createTextNode("must be a valid date");
            loseDay.appendChild(textSpan1);
            loseDay.setAttribute("class", "invDay");
            document.querySelector(".day").appendChild(loseDay);
        }

        if (yearInput > 2023) {
            let loseYear = document.createElement("span");
            let textSpan3 = document.createTextNode("incorrect date");
            loseYear.appendChild(textSpan3);
            loseYear.setAttribute("class", "invYear");
            document.querySelector(".year").appendChild(loseYear);
        }
    }

    function isValidDate(year, month, day) {
        let date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }
});

