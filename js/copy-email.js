(function () {
  var button = document.querySelector("[data-copy-email]");
  var feedback = document.querySelector("[data-copy-feedback]");
  if (!button) return;

  var email = button.getAttribute("data-copy-email") || "";
  var defaultLabel = button.getAttribute("aria-label") || "メールアドレスをコピー";
  var isEnglish = document.documentElement.lang === "en";
  var copiedLabel = isEnglish ? "Copied" : "コピーしました";
  var failedLabel = isEnglish ? "Failed to copy" : "コピーに失敗しました";
  var resetTimer;

  function showFeedback() {
    if (feedback) {
      feedback.hidden = false;
    }
    button.setAttribute("aria-label", copiedLabel);

    clearTimeout(resetTimer);
    resetTimer = window.setTimeout(function () {
      if (feedback) {
        feedback.hidden = true;
      }
      button.setAttribute("aria-label", defaultLabel);
    }, 2000);
  }

  function copyWithFallback(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    var ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (!ok) throw new Error("copy failed");
  }

  button.addEventListener("click", function () {
    if (!email) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(showFeedback).catch(function () {
        try {
          copyWithFallback(email);
          showFeedback();
        } catch (_err) {
          button.setAttribute("aria-label", failedLabel);
        }
      });
      return;
    }

    try {
      copyWithFallback(email);
      showFeedback();
    } catch (_err) {
      button.setAttribute("aria-label", failedLabel);
    }
  });
})();
