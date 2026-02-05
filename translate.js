document.addEventListener('DOMContentLoaded', function() {
  const content = document.getElementById("comp");
  const popup = document.getElementById("popup");

  function wrapWords(element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false,
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      if (!node.parentElement) return;
      if (node.parentElement.tagName === "SCRIPT") return;

      const parts = node.nodeValue.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      parts.forEach((part) => {
        if (/^[a-zA-Z'-]+$/.test(part)) {
          const span = document.createElement("span");
          span.textContent = part;
          span.className = "word";
          fragment.appendChild(span);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });

      node.parentNode.replaceChild(fragment, node);
    });
  }

  wrapWords(content);

  content.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("word")) return;

    e.stopPropagation();

    const word = e.target.textContent;

    popup.style.display = "block";
    popup.textContent = "Đang dịch...";
    popup.style.left = e.pageX + 10 + "px";
    popup.style.top = e.pageY + 10 + "px";

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`;
      const res = await fetch(url);
      const data = await res.json();

      popup.textContent = `${word} : ${data.responseData.translatedText}`;
    } catch (err) {
      popup.textContent = "Không dịch được 😢";
    }
  });

  document.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
