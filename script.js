//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const checkInBtn = document.getElementById("checkInBtn");
const attendeeList = document.getElementById("attendeeList");
const emptyAttendeeMessage = document.getElementById("emptyAttendeeMessage");

function getWinningTeamName() {
  const waterCount = parseInt(
    document.getElementById("waterCount").textContent,
  );
  const zeroCount = parseInt(document.getElementById("zeroCount").textContent);
  const powerCount = parseInt(
    document.getElementById("powerCount").textContent,
  );

  let winningTeamName = "Team Water Wise";
  let winningTeamCount = waterCount;

  if (zeroCount > winningTeamCount) {
    winningTeamName = "Team Net Zero";
    winningTeamCount = zeroCount;
  }

  if (powerCount > winningTeamCount) {
    winningTeamName = "Team Renewables";
  }

  return winningTeamName;
}

//track attendance
let count = 0;
const maxCount = 5;

//Handle form submission

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (count >= maxCount) {
    greeting.textContent = `Check-in closed. Limit of ${maxCount} attendees reached.`;
    greeting.style.display = "block";
    greeting.className = "success-message";
    return;
  }

  //get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);
  //increment count
  count++;
  console.log("Total check-ins: " + count);

  //update progress bar

  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);
  attendeeCount.textContent = `${count}/${maxCount} attendees`;
  progressBar.style.width = percentage;

  //update team counter
  const teamCounter = document.getElementById(team + "Count");
  console.log(teamCounter);
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  if (emptyAttendeeMessage && emptyAttendeeMessage.parentElement) {
    emptyAttendeeMessage.remove();
  }

  const attendeeItem = document.createElement("li");
  attendeeItem.className = "attendee-item";

  const attendeeName = document.createElement("span");
  attendeeName.className = "attendee-list-name";
  attendeeName.textContent = name;

  const attendeeTeam = document.createElement("span");
  attendeeTeam.className = "attendee-list-team";
  attendeeTeam.textContent = teamName;

  attendeeItem.appendChild(attendeeName);
  attendeeItem.appendChild(attendeeTeam);
  attendeeList.appendChild(attendeeItem);

  //show welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  console.log(message);
  greeting.textContent = message;
  greeting.style.display = "block";
  greeting.className = "success-message";

  if (count === maxCount) {
    const winningTeamName = getWinningTeamName();
    greeting.innerHTML = `🎉 Goal reached! Winning team: <span class="winner-name">${winningTeamName}</span>!`;
    greeting.className = "success-message celebration-message";
    checkInBtn.disabled = true;
    nameInput.disabled = true;
    teamSelect.disabled = true;
  }

  form.reset();
});
