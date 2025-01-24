const resendLimits = {}; // To store resend counts per mobile number
let timer;
const maxResendLimit = 3; // Limit to 3 resends per day

const otpModal = new bootstrap.Modal(document.getElementById("otpModal"));
const changeNumberForm = document.getElementById("changeNumberForm");
const verifyOtpForm = document.getElementById("verifyOtpForm");
const resendOtpButton = document.getElementById("resendOtpButton");
const resendTimer = document.getElementById("resendTimer");
const resendLimitMsg = document.getElementById("resendLimitMsg");
const successMessage = document.querySelector(".verification-success");

// Show OTP modal after submitting mobile number
changeNumberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();

    if (!mobileNumber) {
        alert("Please enter a mobile number.");
        return;
    }

    // AJAX to send OTP
    fetch("/api/send-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("OTP sent successfully!");

                // Initialize resend limit for the mobile number if not already present
                if (!resendLimits[mobileNumber]) {
                    resendLimits[mobileNumber] = 0;
                }

                // Store the current mobile number
                document.getElementById("hiddenMobileNumber").value = mobileNumber;

                otpModal.show();
                startResendTimer();
                updateResendUI(mobileNumber);
            } else {
                alert("Failed to send OTP. Try again.");
            }
        })
        .catch((error) => {
            console.error("Error sending OTP:", error);
            alert("An error occurred. Please try again.");
        });
});

verifyOtpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const otp = document.getElementById("otp").value.trim();
    const mobileNumber = document.getElementById("hiddenMobileNumber").value.trim();

    if (!otp) {
        alert("Please enter the OTP.");
        return;
    }

    // AJAX to verify OTP
    fetch("/api/verify-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber, otp }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                otpModal.hide();
                successMessage.style.display = "block"; // Show success message
            } else {
                alert("Invalid OTP. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error verifying OTP:", error);
            alert("An error occurred. Please try again.");
        });
});

// Resend OTP button logic
resendOtpButton.addEventListener("click", () => {
    const mobileNumber = document.getElementById("hiddenMobileNumber").value.trim();

    if (resendLimits[mobileNumber] < maxResendLimit) {
        resendLimits[mobileNumber]++;
        
        // AJAX to resend OTP
        fetch("/api/resend-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobileNumber }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(`OTP resent to ${mobileNumber}!`);
                    updateResendUI(mobileNumber);
                    startResendTimer();
                } else {
                    alert("Failed to resend OTP. Try again.");
                }
            })
            .catch((error) => {
                console.error("Error resending OTP:", error);
                alert("An error occurred. Please try again.");
            });
    }
});

// Update Resend OTP UI based on resend limit
function updateResendUI(mobileNumber) {
    if (resendLimits[mobileNumber] >= maxResendLimit) {
        disableResendLimit();
    } else {
        resendLimitMsg.style.display = "none";
        resendOtpButton.classList.add("resend-disabled");
        resendOtpButton.disabled = true;
    }
}

// Start the resend OTP timer
function startResendTimer() {
    let countdown = 30;
    clearInterval(timer);
    timer = setInterval(() => {
        resendTimer.textContent = countdown;
        if (countdown === 0) {
            clearInterval(timer);
            resendOtpButton.classList.remove("resend-disabled");
            resendOtpButton.disabled = false;
            resendTimer.textContent = "30"; // Reset timer display
        }
        countdown--;
    }, 1000);
}

// Disable resend button when limit is reached
function disableResendLimit() {
    resendOtpButton.classList.add("resend-disabled");
    resendOtpButton.disabled = true;
    resendLimitMsg.style.display = "block";
}

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {

        // Remove 'active' from all menu items
        document.querySelectorAll('.menu-item').forEach(menuItem => {
            menuItem.classList.remove('active');
        });

        // Add 'active' to the clicked menu item
        item.classList.add('active');



        document.querySelectorAll('.settings-section').forEach(section => {
            section.classList.remove('active');
            // item.classList.remove('active');
        });

        // Hide all sections
        document.querySelectorAll('.settings-section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show the clicked section
        const sectionId = item.getAttribute('data-section');
        const sectionToShow = document.getElementById(sectionId);
        //   active with some animation
        //   sectionToShow.classList.remove('hidden');
        sectionToShow.classList.add('active');
        sectionToShow.classList.remove('hidden');
    });
});

// Handle section switching in privacy settings
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
        // Add active class to clicked tab
        btn.classList.add('active');

        // Hide all privacy content sections
        document.querySelectorAll('.privacy-content').forEach(content => content.classList.remove('active'));
        // Show the relevant privacy content
        const tabId = btn.getAttribute('data-privacy-tab') + '-privacy';
        document.getElementById(tabId).classList.add('active');
    });
});

// back-btn  


document.querySelector('.back-btn').addEventListener('click', () => {
    // transfer to another page 
    document.location.href = "/"; // Replace with the actual URL of the dashboard page

});




