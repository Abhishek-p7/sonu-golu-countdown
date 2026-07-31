const weddingDate = new Date("2027-01-29T00:00:00+05:30").getTime();

const fields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  milliseconds: document.getElementById("milliseconds"),
  message: document.getElementById("message")
};

function updateCountdown() {
  const now = Date.now();
  let distance = weddingDate - now;

  if (distance <= 0) {
    fields.days.textContent = "0";
    fields.hours.textContent = "0";
    fields.minutes.textContent = "0";
    fields.seconds.textContent = "0";
    fields.milliseconds.textContent = "000";
    fields.message.textContent = "Today is our forever day! ❤️";
    return;
  }

  const days = Math.floor(distance / 86400000);
  distance %= 86400000;
  const hours = Math.floor(distance / 3600000);
  distance %= 3600000;
  const minutes = Math.floor(distance / 60000);
  distance %= 60000;
  const seconds = Math.floor(distance / 1000);
  const milliseconds = distance % 1000;

  fields.days.textContent = days;
  fields.hours.textContent = String(hours).padStart(2, "0");
  fields.minutes.textContent = String(minutes).padStart(2, "0");
  fields.seconds.textContent = String(seconds).padStart(2, "0");
  fields.milliseconds.textContent = String(milliseconds).padStart(3, "0");

  requestAnimationFrame(updateCountdown);
}

document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "Sonu ❤️ Golu Wedding Countdown",
    text: "Count down with us to 29 January 2027!",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Countdown link copied.");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      alert("Unable to share right now.");
    }
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(console.error);
  });
}

updateCountdown();
