// public/js/socketClient.js

const socket = io(); // Establish connection to the Socket.IO server

// Check if the user is logged in before doing anything
if (typeof isLoggedIn !== "undefined" && isLoggedIn && userId) {
  // Emit "userLoggedIn" when the connection is established
  socket.emit("userLoggedIn", userId);

  // Handle the browser close or page unload event
  window.addEventListener("beforeunload", () => {
    socket.emit("userLoggedOut", userId); // Emit "userLoggedOut" when the user leaves
  });

  // Listen for online/offline updates for other users
  socket.on("userStatusUpdate", (data) => {
    const { userId: updatedUserId, isOnline, lastSeen } = data;

    // Dynamically update the UI (if required)
    const statusElement = document.querySelector(`#user-status-${updatedUserId}`);
    if (statusElement) {
      if (isOnline) {
        statusElement.textContent = "Online";
        statusElement.classList.add("text-green-500");
        statusElement.classList.remove("text-gray-500");
      } else {
        statusElement.textContent = `Last seen: ${new Date(lastSeen).toLocaleString()}`;
        statusElement.classList.add("text-gray-500");
        statusElement.classList.remove("text-green-500");
      }
    }
  });
}
