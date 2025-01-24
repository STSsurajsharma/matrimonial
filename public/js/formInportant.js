document.addEventListener("DOMContentLoaded", async () => {
    // Religion and caste dropdown logic
    const religionDropdown = document.getElementById("religion");
    const casteDropdown = document.getElementById("caste");
    const selectedValuesDisplay = document.getElementById("selectedValues");
    const hiddenReligionInput = document.getElementById("hiddenReligion");

    const response = await fetch("/edit/religion");
    const religions = await response.json();

    // Populate religion dropdown
    religions.forEach(religion => {
        const option = document.createElement("option");
        option.value = religion.id; // Use religion ID as the value
        option.textContent = religion.name; // Display religion name
        religionDropdown.appendChild(option);
    });

    // Populate caste dropdown based on selected religion
    religionDropdown.addEventListener("change", () => {
        casteDropdown.innerHTML = '<option value="">Caste</option>'; // Reset caste dropdown
        const selectedReligion = religions.find(
            religion => religion.id === religionDropdown.value
        );
        if (selectedReligion) {
            hiddenReligionInput.value = selectedReligion.name;
            selectedReligion.castes.forEach(caste => {
                const option = document.createElement("option");
                option.value = caste.name; // Use caste name as the value
                option.textContent = caste.name; // Display caste name
                casteDropdown.appendChild(option);
            });
        }
    });

    // Display selected religion and caste names
    casteDropdown.addEventListener("change", () => {
        const selectedReligion = religions.find(
            religion => religion.id === religionDropdown.value
        );

        const selectedCasteName = casteDropdown.value; // Get the selected caste name directly

        if (selectedReligion) {
            selectedValuesDisplay.textContent = `Selected Religion: ${
                selectedReligion.name
            }, Selected Caste: ${selectedCasteName}`;
        }
    });

    // Height dropdown logic for index page
    const heightSelect = document.getElementById("Height");

    if (heightSelect) {
        for (let feet = 4; feet <= 7; feet++) {
            for (let inches = 0; inches < 12; inches++) {
                const heightInInches = feet * 12 + inches;
                const displayHeight = `${feet}' ${inches}"`;
                const option = document.createElement("option");
                option.value = heightInInches;
                option.textContent = displayHeight;
                heightSelect.appendChild(option);
            }
        }
    }

    // Height dropdown logic for search page
    const minHeightSelect = document.getElementById("minHeight");
    const maxHeightSelect = document.getElementById("maxHeight");

    [minHeightSelect, maxHeightSelect].forEach(select => {
        if (select) {
            for (let feet = 4; feet <= 7; feet++) {
                for (let inches = 0; inches < 12; inches++) {
                    const heightInInches = feet * 12 + inches;
                    const displayHeight = `${feet}' ${inches}"`;
                    const option = document.createElement("option");
                    option.value = heightInInches;
                    option.textContent = displayHeight;
                    select.appendChild(option);
                }
            }
        }
    });
});
