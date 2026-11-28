document.addEventListener("DOMContentLoaded", () => {
  // Material for MkDocs logo element
  const logo = document.querySelector(".md-header__button.md-logo, .md-logo");

  if (!logo) return;

  logo.addEventListener("click", (event) => {
    event.preventDefault();

    const targetUrl = "https://ldt4ssc.eu/";

    try {
      // Try to navigate the top-level window (escapes the frameset)
      window.top.location = targetUrl;
    } catch (e) {
      // Fallback: at least navigate the current frame
      window.location = targetUrl;
    }
  });
});
