window.addEventListener("DOMContentLoaded", async () => {
  // Visitor Counter
  try {
    const res = await fetch("/api/VisitorCounter");
    const data = await res.json();
    const counterElem = document.getElementById("visitorCount");
    if (counterElem) {
      counterElem.textContent = `Visitor Count: ${data.count}`;
    } else {
      console.warn("visitorCount element not found in DOM");
    }
  } catch (err) {
    console.error("Visitor counter failed:", err);
  }

  // Contact Form Submission (still using local API)
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    const res = await fetch('/api/SubmitForm', {  // ✅ also change this to relative URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const text = await res.text();
    document.getElementById('responseMessage').innerText = text;
  });
});
