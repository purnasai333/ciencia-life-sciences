(function () {
  "use strict";

  if (document.querySelector(".cls-chatbot")) return;

  var chatbotScript = document.currentScript;
  var engineScript = document.createElement("script");
  var styleLink = document.createElement("link");
  var root = document.createElement("div");

  root.className = "cls-chatbot";
  styleLink.rel = "stylesheet";
  styleLink.href = new URL("../css/ciencia-chatbot.css", chatbotScript.src).href;
  document.head.appendChild(styleLink);

  function showLoadError() {
    root.innerHTML = '<div class="cls-chatbot__load-error" role="status">Ciencia assistant could not be loaded. Please refresh the page to try again.</div>';
    document.body.appendChild(root);
  }

  function renderText(container, text) {
    var lines = text.split("\n");
    var paragraphLines = [];
    var list = null;

    function flushParagraph() {
      if (!paragraphLines.length) return;
      var paragraph = document.createElement("p");
      paragraph.textContent = paragraphLines.join(" ");
      container.appendChild(paragraph);
      paragraphLines = [];
    }

    lines.forEach(function (line) {
      var bullet = line.match(/^\s*[-•]\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        if (!list) {
          list = document.createElement("ul");
          container.appendChild(list);
        }
        var item = document.createElement("li");
        item.textContent = bullet[1];
        list.appendChild(item);
      } else {
        if (list) list = null;
        if (line.trim()) paragraphLines.push(line.trim());
        else flushParagraph();
      }
    });
    flushParagraph();
  }

  function initialize() {
    var engine = window.CienciaChatbotEngine;
    if (!engine) {
      showLoadError();
      return;
    }

    var logo = new URL("../img/ciencia-mark.jpg", chatbotScript.src).href;
    root.innerHTML = '<section class="cls-chatbot__panel" id="cls-chatbot-panel" role="dialog" aria-label="Ciencia Life Sciences assistant" aria-hidden="true">' +
      '<header class="cls-chatbot__header"><div class="cls-chatbot__identity"><img class="cls-chatbot__logo" src="' + logo + '" alt="" width="46" height="46">' +
      '<div><span class="cls-chatbot__eyebrow">CIENCIA LIFE SCIENCES</span><h2>Ciencia assistant</h2><p>Reliable answers from published information</p></div></div>' +
      '<button class="cls-chatbot__close" type="button" aria-label="Close chat"><span aria-hidden="true">&times;</span></button></header>' +
      '<div class="cls-chatbot__messages" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation"></div>' +
      '<div class="cls-chatbot__suggestions" aria-label="Suggested questions"><button type="button">What courses do you offer?</button><button type="button">Do you have a 2027 internship?</button><button type="button">How can I contact Ciencia?</button></div>' +
      '<form class="cls-chatbot__form"><label class="cls-chatbot__sr-only" for="cls-chatbot-input">Ask a question about Ciencia Life Sciences</label>' +
      '<input id="cls-chatbot-input" name="question" maxlength="500" placeholder="Ask about courses, research or services" autocomplete="off" required>' +
      '<button class="cls-chatbot__send" type="submit" aria-label="Send question"><span aria-hidden="true">&#8593;</span></button></form>' +
      '<p class="cls-chatbot__note">Answers are based on information published by Ciencia. Confirm current schedules and fees with the team.</p></section>' +
      '<button class="cls-chatbot__launcher" type="button" aria-expanded="false" aria-controls="cls-chatbot-panel"><img class="cls-chatbot__launcher-mark" src="' + logo + '" alt="" width="38" height="38"><span>Ask Ciencia</span></button>';
    document.body.appendChild(root);

    var panel = root.querySelector(".cls-chatbot__panel");
    var launcher = root.querySelector(".cls-chatbot__launcher");
    var closeButton = root.querySelector(".cls-chatbot__close");
    var messages = root.querySelector(".cls-chatbot__messages");
    var suggestions = root.querySelector(".cls-chatbot__suggestions");
    var form = root.querySelector(".cls-chatbot__form");
    var input = root.querySelector(".cls-chatbot__form input");
    var sendButton = root.querySelector(".cls-chatbot__send");
    var context = null;
    var isBusy = false;

    function setOpen(open) {
      panel.setAttribute("aria-hidden", String(!open));
      launcher.setAttribute("aria-expanded", String(open));
      root.classList.toggle("is-open", open);
      if (open) input.focus();
    }

    function addMessage(text, sender, sources) {
      var message = document.createElement("article");
      message.className = "cls-chatbot__message cls-chatbot__message--" + sender;
      message.setAttribute("aria-label", sender === "user" ? "Your message" : "Ciencia assistant response");
      renderText(message, text);
      if (sources && sources.length) {
        var sourceList = document.createElement("div");
        sourceList.className = "cls-chatbot__sources";
        sources.forEach(function (source) {
          var link = document.createElement("a");
          link.href = source.href;
          link.textContent = source.title;
          if (source.target) {
            link.target = source.target;
            link.rel = source.rel || "noopener noreferrer";
          }
          sourceList.appendChild(link);
        });
        message.appendChild(sourceList);
      }
      messages.appendChild(message);
      messages.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
    }

    function setBusy(busy) {
      isBusy = busy;
      input.disabled = busy;
      sendButton.disabled = busy;
      root.classList.toggle("is-busy", busy);
      var indicator = root.querySelector(".cls-chatbot__typing");
      if (busy && !indicator) {
        indicator = document.createElement("div");
        indicator.className = "cls-chatbot__typing";
        indicator.setAttribute("role", "status");
        indicator.setAttribute("aria-label", "Ciencia assistant is preparing an answer");
        indicator.innerHTML = "<span></span><span></span><span></span>";
        messages.appendChild(indicator);
        messages.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
      } else if (!busy && indicator) {
        indicator.remove();
      }
    }

    function answerQuestion(question) {
      if (isBusy) return;
      addMessage(question, "user");
      suggestions.hidden = true;
      setBusy(true);
      window.setTimeout(function () {
        try {
          var response = engine.respond(question, context);
          context = response.context || context;
          var sources = response.items.map(function (item) {
            return { title: item.title, href: item.href, target: item.target, rel: item.rel };
          });
          addMessage(response.answer, "assistant", sources);
          setBusy(false);
        } catch (error) {
          setBusy(false);
          addMessage("I couldn't process that question just now. Please try again or contact Ciencia at +91 8247307129 or ciencialifesciences@gmail.com.", "assistant", [
            { title: "Contact Ciencia", href: "contact.html" }
          ]);
          if (window.console && window.console.error) window.console.error("Ciencia chatbot error:", error);
        }
      }, 180);
    }

    launcher.addEventListener("click", function () {
      setOpen(!root.classList.contains("is-open"));
    });
    closeButton.addEventListener("click", function () {
      setOpen(false);
      launcher.focus();
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var question = input.value.trim();
      if (!question || isBusy) return;
      input.value = "";
      answerQuestion(question);
    });
    root.querySelectorAll(".cls-chatbot__suggestions button").forEach(function (button) {
      button.addEventListener("click", function () {
        answerQuestion(button.textContent);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("is-open")) {
        setOpen(false);
        launcher.focus();
      }
    });

    addMessage("Hello. I can help with Ciencia's courses, projects, research services, facilities, patents, and contact information.", "assistant");
  }

  engineScript.src = new URL("ciencia-chatbot-engine.js", chatbotScript.src).href;
  engineScript.onload = initialize;
  engineScript.onerror = showLoadError;
  document.head.appendChild(engineScript);
})();
