const formBtn = document.getElementById("searchBtn");
const selectType = document.getElementById("selectType");
const selectOption = document.getElementById("selectOption");

formBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
});

selectType.addEventListener("change", () => {
    selectOption.replaceChildren();
    if (selectType.selectedIndex == "0") {
        selectOption.setAttribute("disabled", "true");
    } else {
        selectOption.removeAttribute("disabled");
    }

    const selectedValue = selectType[selectType.selectedIndex].value;
    fetch(`https://swapi.dev/api/${selectedValue}`, {
        method: "GET",
    })
        .then((result) => {
            return result.json();
        })
        .then((json) => {
            console.log(json);
            let index = 1;
            json.results.forEach((element) => {
                if (selectedValue == "films") {
                    createOption(element.title, selectOption, index);
                } else {
                    createOption(element.name, selectOption, index);
                }
                index += 1;
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

function createOption(name, parent, value) {
    let newOption = document.createElement("option");
    newOption.setAttribute("value", value);
    newOption.innerText = name;
    parent.appendChild(newOption);
}

window.addEventListener("DOMContentLoaded", (evt) => {
    formBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        const selectedValue = selectType[selectType.selectedIndex].value;
        const selectedOptionValue =
            selectOption[selectOption.selectedIndex].value;
        fetch(`https://swapi.dev/api/${selectedValue}/${selectedOptionValue}`)
            .then((result) => {
                return result.json();
            })
            .then((json) => {
                console.log(json);
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
