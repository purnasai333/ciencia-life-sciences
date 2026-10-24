(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navigation = header && header.querySelector(".primary-nav");

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  function closeNavigation(restoreFocus) {
    const openItem = document.querySelector(".menu-item.is-open");
    const openTrigger = openItem && openItem.querySelector(".menu-trigger");
    const wasOpen = header && header.classList.contains("is-open");
    if (header) header.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    document.querySelectorAll(".menu-item.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      const trigger = item.querySelector(".menu-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
    if (restoreFocus) {
      if (wasOpen && toggle) toggle.focus();
      else if (openTrigger) openTrigger.focus();
    }
  }

  document.querySelectorAll(".menu-item").forEach(function (item) {
    const trigger = item.querySelector(".menu-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      const wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".menu-item.is-open").forEach(function (openItem) {
        openItem.classList.remove("is-open");
        const btn = openItem.querySelector(".menu-trigger");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (header && !header.contains(event.target)) {
      closeNavigation(false);
    } else if (!event.target.closest(".menu-item")) {
      document.querySelectorAll(".menu-item.is-open").forEach(function (item) {
        item.classList.remove("is-open");
        const trigger = item.querySelector(".menu-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNavigation(true);
  });

  if (navigation) {
    const currentPath = window.location.pathname;
    navigation.querySelectorAll("a[href]").forEach(function (link) {
      const linkUrl = new URL(link.href, window.location.href);
      if (linkUrl.origin === window.location.origin && linkUrl.pathname === currentPath) {
        link.setAttribute("aria-current", "page");
        const item = link.closest(".menu-item");
        const trigger = item && item.querySelector(".menu-trigger");
        if (trigger) trigger.setAttribute("aria-current", "page");
      }
      link.addEventListener("click", function () {
        if (header && header.classList.contains("is-open")) closeNavigation(false);
      });
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const search = document.querySelector("[data-filter-search]");
  const buttons = document.querySelectorAll("[data-filter-target]");
  const panels = document.querySelectorAll("[data-filter-panel]");

  function showPanel(id) {
    panels.forEach(function (panel) {
      panel.classList.toggle("is-active", panel.getAttribute("data-filter-panel") === id);
    });
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-filter-target") === id));
    });
  }

  if (buttons.length && panels.length) {
    showPanel(buttons[0].getAttribute("data-filter-target"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        showPanel(button.getAttribute("data-filter-target"));
        const panel = document.querySelector('[data-filter-panel="' + button.getAttribute("data-filter-target") + '"]');
        if (panel && window.matchMedia("(max-width: 980px)").matches) {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  if (search) {
    search.addEventListener("input", function () {
      const q = search.value.trim().toLowerCase();
      buttons.forEach(function (button) {
        const match = button.textContent.toLowerCase().includes(q);
        button.hidden = Boolean(q) && !match;
      });
    });
  }

  document.querySelectorAll("[data-tabs]").forEach(function (tablist) {
    const tabs = tablist.querySelectorAll("[role='tab']");
    const group = tablist.getAttribute("data-tabs");
    function activateTab(tab, moveFocus) {
      tabs.forEach(function (item) {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      document.querySelectorAll('[data-tab-panel="' + group + '"]').forEach(function (panel) {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });
      if (moveFocus) tab.focus();
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab, false);
      });
      tab.addEventListener("keydown", function (event) {
        const tabArray = Array.from(tabs);
        const index = tabArray.indexOf(tab);
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabArray.length;
        else if (event.key === "ArrowLeft") nextIndex = (index + tabArray.length - 1) % tabArray.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabArray.length - 1;
        else return;
        event.preventDefault();
        activateTab(tabArray[nextIndex], true);
      });
    });
    const initiallySelected = Array.from(tabs).find(function (tab) {
      return tab.getAttribute("aria-selected") === "true";
    }) || tabs[0];
    if (initiallySelected) activateTab(initiallySelected, false);
  });

  const legacyTabs = document.querySelector("#myTab");
  if (legacyTabs) {
    const tabs = Array.from(legacyTabs.querySelectorAll("[role='tab']"));
    function activateLegacyTab(tab, moveFocus) {
      const selectedId = tab.getAttribute("aria-controls");
      tabs.forEach(function (item) {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        const listItem = item.closest("li");
        if (listItem) listItem.classList.toggle("active", selected);
      });
      document.querySelectorAll("#myTabContent [role='tabpanel']").forEach(function (panel) {
        const selected = panel.id === selectedId;
        panel.hidden = !selected;
        panel.classList.toggle("active", selected);
        panel.classList.toggle("in", selected);
      });
      if (moveFocus) tab.focus();
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function (event) {
        event.preventDefault();
        activateLegacyTab(tab, false);
      });
      tab.addEventListener("keydown", function (event) {
        const index = tabs.indexOf(tab);
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") nextIndex = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        activateLegacyTab(tabs[nextIndex], true);
      });
    });
    const initiallySelected = tabs.find(function (tab) {
      return tab.closest("li").classList.contains("active");
    }) || tabs[0];
    if (initiallySelected) activateLegacyTab(initiallySelected, false);
  }

  document.querySelectorAll("#subjectList").forEach(function (list) {
    const items = Array.from(list.querySelectorAll("[data-subject]"));
    const isTrainingList = Boolean(document.querySelector("#sel_training_div"));
    const panels = isTrainingList
      ? [
          { selector: "[data-topic-intro]", attribute: "data-topic-intro" },
          { selector: "[data-topic-details]", attribute: "data-topic-details" }
        ]
      : [{ selector: "[data-project-topic]", attribute: "data-project-topic" }];

    function activateSubject(item) {
      const subject = item.getAttribute("data-subject");
      items.forEach(function (candidate) {
        const selected = candidate === item;
        candidate.classList.toggle("ci-list-group-item-active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      });
      panels.forEach(function (group) {
        const matches = Array.from(document.querySelectorAll(group.selector));
        const selectedPanel = matches.find(function (panel) {
          return panel.getAttribute(group.attribute) === subject;
        });
        matches.forEach(function (panel) {
          panel.hidden = panel !== selectedPanel;
        });
      });
      const heading = document.querySelector("#sel_training_div h3");
      if (heading) heading.textContent = item.textContent.trim();
    }

    function activateHashSubject() {
      if (isTrainingList || !window.location.hash) return;
      let fragment;
      try {
        fragment = decodeURIComponent(window.location.hash.slice(1)).trim().toLowerCase();
      } catch (error) {
        if (error instanceof URIError) return;
        throw error;
      }
      const matchingItem = items.find(function (item) {
        const subject = item.getAttribute("data-subject").trim().toLowerCase();
        if (subject === fragment) return true;
        return panels.some(function (group) {
          return Array.from(document.querySelectorAll(group.selector)).some(function (panel) {
            if (panel.getAttribute(group.attribute) !== item.getAttribute("data-subject")) return false;
            const heading = panel.querySelector("h2, h3, h4");
            return heading && heading.textContent.trim().toLowerCase() === fragment;
          });
        });
      });
      if (matchingItem) activateSubject(matchingItem);
    }

    items.forEach(function (item) {
      item.setAttribute("role", "button");
      item.tabIndex = 0;
      item.setAttribute("aria-pressed", String(item.classList.contains("ci-list-group-item-active")));
      item.addEventListener("click", function () { activateSubject(item); });
      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateSubject(item);
        }
      });
    });
    const initiallySelected = items.find(function (item) {
      return item.classList.contains("ci-list-group-item-active");
    }) || items[0];
    if (initiallySelected) activateSubject(initiallySelected);
    window.addEventListener("hashchange", activateHashSubject);
    activateHashSubject();
  });

})();
