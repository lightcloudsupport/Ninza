document.getElementById("year").textContent = new Date().getFullYear();
const nav = document.getElementById("nav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const toast = document.getElementById("toast");
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3600);
}

document.getElementById("checkDomain").addEventListener("click", () => {
  const raw = document.getElementById("domainName").value.trim().toLowerCase();
  const result = document.getElementById("domainResult");
  if (!/^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/.test(raw)) {
    result.textContent = "Enter a valid name using letters, numbers, or internal hyphens.";
    return;
  }
  result.textContent = "Suggested hostname: " + raw + ".ninzacloud.bond — format checked only; availability and registration are not checked.";
});
document.getElementById("domainName").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("checkDomain").click();
});
document.querySelectorAll(".faq button").forEach(button => {
  button.addEventListener("click", () => {
    const faq = button.closest(".faq");
    faq.classList.toggle("open");
    button.querySelector("span").textContent = faq.classList.contains("open") ? "−" : "＋";
  });
});
