const formBtn = document.getElementById("searchBtn");
const selectType = document.getElementById("selectType");
const selectOption = document.getElementById("selectOption");
const errorDiv = document.getElementById("errorDiv");
const resultDiv = document.getElementById("result");
const loadDiv = document.getElementById("loading");

formBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
});

selectType.addEventListener("change", () => {
    displayLoading();
    clearHTML(errorDiv, resultDiv);
    selectOption.replaceChildren();
    hideBorder();
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
            selectOption.replaceChildren();
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
        })
        .finally(() => {
            hideLoading();
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
        hideBorder();
        clearHTML(errorDiv, resultDiv);
        if (selectOption.selectedIndex != -1) {
            displayLoading();
            const selectedValue = selectType[selectType.selectedIndex].value;
            const selectedOptionValue =
                selectOption[selectOption.selectedIndex].value;
            fetch(
                `https://swapi.dev/api/${selectedValue}/${selectedOptionValue}`
            )
                .then((result) => {
                    return result.json();
                })
                .then((json) => {
                    resultDiv.classList.add("styled");
                    resultDiv.innerHTML = processRequest(json);
                })
                .catch((error) => {
                    hideBorder();
                    errorDiv.style.display = "block";
                    const statusCode = error.status;
                    handleError(error, statusCode, errorDiv);
                    console.log(error);
                })
                .finally(() => {
                    hideLoading();
                });
        }
    });
});

function handleError(error, errorCode, errorContainer) {
    if (errorCode >= 500) {
        errorContainer.innerText = `Server error! ${errorCode}`;
    } else if (errorCode >= 400) {
        errorContainer.innerText = `Incorrect input. Error ${errorCode}`;
    } else if (errorCode >= 300) {
        errorContainer.innerText = `Redirected: ${error}`;
    } else {
        errorContainer.innerText = `${error}`;
    }
}

function clearHTML(error, result) {
    error.innerText = "";
    error.style.display = "none";
    result.innerHTML = "";
}

function processRequest(result) {
    for (property in result) {
        if (!result[property] || result[property] == "n/a") {
            result[property] = "unknown";
        }
    }
    switch (selectType.selectedIndex) {
        case 1:
            return `<p>Name: ${result.name}.</p><p>Height: ${result.height}cm</p><p>Mass: ${result.mass}kg</p><p>Hair color: ${result.hair_color}</p><p>Skin color: ${result.skin_color}</p><p>Eye color: ${result.eye_color}</p><p>Birth year: ${result.birth_year}</p><p>Gender: ${result.gender}</p>`;
        case 2:
            return `<p>Title: ${result.title}</p><p>Director: ${result.director}</p><p>Producer: ${result.producer}</p><p>Release date: ${result.release_date}</p><p>Opening crawl: ${result.opening_crawl}</p>`;
        case 3:
            return `<p>Name: ${result.name}</p><p>Classification: ${result.classification}</p><p>Designation: ${result.designation}</p><p>Average height: ${result.average_height} cm</p><p>Skin colors: ${result.skin_colors}</p><p>Average lifespan: ${result.average_lifespan}</p><p>Eye colors: ${result.eye_colors}</p><p>Hair colors: ${result.hair_colors}</p><p>Language: ${result.language}</p>`;
        case 4:
            return `<p>Name: ${result.name}</p><p>Rotation period: ${result.rotation_period} h</p><p>Orbital period: ${result.orbital_period} days</p><p>Diameter: ${result.diameter} km</p><p>Climate: ${result.climate}</p><p>Gravity : ${result.gravity}</p><p>Population: ${result.population}</p><p>Surface water: ${result.surface_water}</p><p>Terrain: ${result.terrain}</p>`;
    }
}

function displayLoading() {
    loadDiv.style.display = "block";
}

function hideLoading() {
    loadDiv.style.display = "none";
}

function hideBorder() {
    resultDiv.classList.remove("styled");
}
