// DOM selection
const numberInput = document.querySelector("#number");
const times = document.querySelector("#times");
const secondaryForm = document.querySelector("#secondary-Form");
const secondarySection = document.querySelector(".secondary-section");
const nOptions = document.querySelector(".n-options");
const checkboxs = document.querySelectorAll(".checkbox");
const checkSelect = document.querySelector("#checkbox-select-form");
const outputSection = document.querySelector(".output");
const finCheckboxes = document.querySelector("#checkboxes");
const defaultSelection = document.querySelector(".default-select");
const alert = document.querySelector(".alert");

// Get Number Of Options
const getTimes = e => {
  e.preventDefault();
  let numberOfOptions = numberInput.value;

  // set Range for Number OF options need
  if (numberOfOptions > 0 && numberOfOptions < 100) {
    if (checkboxs[0].checked) {
      nOptions.innerHTML = "";
      for (let i = 1; i <= numberOfOptions; i++) {
        nOptions.innerHTML += `<input type='text' class='option checkBoxFun' id='${i}'/> <input type="checkbox"   name="file${i}"></input><br><br>`;
      }
    } else {
      nOptions.innerHTML = "";
      for (let i = 1; i <= numberOfOptions; i++) {
        nOptions.innerHTML += `<input type='text' class='option' id='${i}'/><br><br>`;
      }
    }

    // reset input field
    numberInput.value = "";
    secondarySection.style.display = "block";
    checkSelect.style.display = "none";
    outputSection.style.display = "none";
  } else if (numberOfOptions === "") {
    alert.textContent = "this field cannot be  empty";
    setTimeout(() => {
      alert.textContent = "";
    }, 1500);
  } else {
    alert.textContent = "please provide a valid input";
    setTimeout(() => {
      alert.textContent = "";
    }, 2000);
  }
};

// Get Select Box with number of options given
const getSection = e => {
  e.preventDefault();

  const options = document.querySelectorAll(".option");
  const optionsArray = [];

  for (let i = 0; i < options.length; i++) {
    if (options[i].value != "") {
      optionsArray.push(options[i]);
    }
  }

  // when check BOx is true or need check box
  if (checkboxs[0].checked) {
    checkSelect.style.display = "block";
    finCheckboxes.innerHTML = "";
    let lengthOfSelected = [];

    for (let i = 0; i < optionsArray.length; i++) {
      if (optionsArray[i].nextElementSibling.checked) {
        lengthOfSelected.push(optionsArray[i]);
        finCheckboxes.innerHTML += `<label for="${optionsArray[i].value}"><input type="checkbox" class='checkBoxFun selectedCheckBoxes' checked id="${optionsArray[i].value}" />${optionsArray[i].value}</label>`;
      } else {
        finCheckboxes.innerHTML += `<label for="${optionsArray[i].value}"><input type="checkbox" class='checkBoxFun selectedCheckBoxes' id="${optionsArray[i].value}" />${optionsArray[i].value}</label>`;
      }
    }

    // Display Number of selected options are given by user
    if (lengthOfSelected.length === 0 || lengthOfSelected.length === 1) {
      defaultSelection.textContent = `${lengthOfSelected.length} File Selected`;
    } else {
      defaultSelection.textContent = `${lengthOfSelected.length} File(s) Selected`;
    }
  }

  // check box value is if NO or Don't need check box
  if (checkboxs[1].checked) {
    outputSection.style.display = "block";
    outputSection.innerHTML = "";
    outputSection.innerHTML = `<br /><select id='output-select'></select>`;
    const outputSelectBox = document.querySelector("#output-select");
    outputSelectBox.innerHTML = "";

    for (let i = 0; i < optionsArray.length; i++) {
      outputSelectBox.innerHTML += `<option value='${optionsArray[i].value}'>${optionsArray[i].value}</option>`;
    }
  }

  let selectedCheckBoxes = document.querySelectorAll(".selectedCheckBoxes");
  const checkedBoxes = [];
  for (let i = 0; i < selectedCheckBoxes.length; i++) {
    if (selectedCheckBoxes[i].checked) {
      checkedBoxes.push(selectedCheckBoxes[i]);
    }
  }

  const getSelectedCheckBoxes = e => {
    for (let i = 0; i < checkedBoxes.length; i++) {
      if (checkedBoxes[i].checked === false) {
        checkedBoxes.slice(0, checkedBoxes[i]);
      }
    }

    if (e.target.checked) {
      checkedBoxes.push(e.target);
      const optionsGivenOne = document.querySelectorAll(".option");

      for (let i = 0; i < optionsGivenOne.length; i++) {
        if (optionsGivenOne[i].value === e.target.id) {
          optionsGivenOne[i].nextElementSibling.checked = true;
        }
      }
    }

    if (e.target.checked === false) {
      for (let i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i] === e.target) {
          let removeableItemIntex = checkedBoxes.indexOf(checkedBoxes[i]);
          checkedBoxes.splice(removeableItemIntex, 1);
        }
      }

      const optionsGivenTwo = document.querySelectorAll(".option");
      for (let i = 0; i < optionsGivenTwo.length; i++) {
        if (optionsGivenTwo[i].value === e.target.id) {
          optionsGivenTwo[i].nextElementSibling.checked = false;
        }
      }
    }

    // Display Number of selected options are given by user
    if (checkedBoxes.length === 0 || checkedBoxes.length === 1) {
      defaultSelection.textContent = `${checkedBoxes.length} File Selected`;
    } else {
      defaultSelection.textContent = `${checkedBoxes.length} File(s) Selected`;
    }
  };
  for (let i = 0; i < selectedCheckBoxes.length; i++) {
    selectedCheckBoxes[i].addEventListener("click", getSelectedCheckBoxes);
  }

  const optionsGivenThree = document.querySelectorAll(".option");
  const selectedCheckBoxesCheckSame = document.querySelectorAll(
    ".selectedCheckBoxes"
  );
  const getSameSelectedOption = e => {
    for (let i = 0; i < selectedCheckBoxesCheckSame.length; i++) {
      if (e.target.checked) {
        if (
          e.target.previousElementSibling.value ===
          selectedCheckBoxesCheckSame[i].id
        ) {
          selectedCheckBoxesCheckSame[i].checked = true;
        }
      }
      if (e.target.checked === false) {
        if (
          e.target.previousElementSibling.value ===
          selectedCheckBoxesCheckSame[i].id
        ) {
          selectedCheckBoxesCheckSame[i].checked = false;
        }
      }
    }
  };

  for (let i = 0; i < optionsGivenThree.length; i++) {
    optionsGivenThree[i].nextElementSibling.addEventListener(
      "click",
      getSameSelectedOption
    );
  }
};

var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

// listen for event
secondaryForm.addEventListener("submit", getSection);
times.addEventListener("submit", getTimes);
