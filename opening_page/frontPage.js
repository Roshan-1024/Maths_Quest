document.addEventListener('DOMContentLoaded', function() {
    function updateTime() {
        const timeElement = document.getElementById('displayTime');
        if (!timeElement) return; // Check if the element exists

        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const amPm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // Convert hour '0' to '12'
        const formattedHours = hours.toString().padStart(2, '0');

        const currentTime = `${formattedHours}:${minutes}:${seconds} ${amPm}`;
        timeElement.innerHTML = currentTime;
    }

    // Initial call to display the time immediately when the page loads
    updateTime();

    // Update the time every second
    setInterval(updateTime, 1000);
});


function openLevelSelectionPage() {
    var username = prompt("What is your name?");
    while(!username){
        username = prompt("Please, enter your name to proceed.");
    }
    var userKey = "User_" + username;   //User_Roshan will be used to load game progress.
    localStorage.setItem(userKey, JSON.stringify({ username: username }));
    localStorage.setItem("Recent User", username);
    
    var url = "../level_selection_page/level_selection_page.html";
    window.open(url, '_self');
}
