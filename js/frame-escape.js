document.addEventListener("DOMContentLoaded", () => {
  // Select all <a> tags
  const links = document.querySelectorAll("a[href]");

  links.forEach(link => {
    if (link.closest(".md-search-result__item")) return;
    link.addEventListener("click", event => {
      const url = link.href;

      // If it's an external link
      if (!url.includes(window.location.host)) {
        event.preventDefault();
        try {
          window.top.location.href = url;
        } catch (e) {
          window.location.href = url;
        }
      }
    });
  });
});
