window.addEventListener("DOMContentLoaded", async () => {
  // Visitor Counter
  try {
    const res = await fetch("/api/VisitorCounter");
    const data = await res.json();
    document.getElementById("visitorCount").textContent = `Visitor Count: ${data.count}`;
  } catch (err) {
    console.error("Visitor counter failed:", err);
  }

  // Contact Form Submission
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    const res = await fetch('http://localhost:7071/api/SubmitForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const text = await res.text();
    document.getElementById('responseMessage').innerText = text;
  });
});
