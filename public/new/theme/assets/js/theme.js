let wrapper = document.querySelector("#wrapper");

var cookieNotice = false;
var collapsibleForums = true;
var prefetchForms = true;
var stickyNavbar = false;
var chroma = false;
var chromaSaturation = "50%";
var chromaLightness = "50%";
var chromaMultiplier = 1;
var locale = {
  submit: "Submit",
  cancel: "Cancel",
  close: "Close",
  confirmDelete: "Are you sure you wish to delete this?",
  copied: "Kopiert!!!",
  cookieNotice:
    "Diese Website benutzt Cookies, wenn sie sich anmelden akzeptieren sie diese Automatisch.",
  noMessages: "No new messages",
  newMessage1: "You have 1 new message",
  newMessagesX: "You have {{count}} new messages",
  noAlerts: "No new alerts",
  newAlert1: "You have 1 new alert",
  newAlertsX: "You have {{count}} new alerts",
  andMoreX: "and {{count}} more",
  bungeeInstance: "This server is a Bungee instance.",
  onePlayerOnline: "There is currently 1 player online.",
  xPlayersOnline: "There are currently {{count}} players online.",
  noPlayersOnline: "There are no players online.",
  offline: "Offline",
};
var stickyNavbar = true;

let loadingBars = [];

function showLoadingBar(loadingBarName) {
  const loadingBarElement = document.querySelector(".loading-bar");
  if (loadingBarElement) {
    loadingBars.push(loadingBarName);
    loadingBarElement.classList.add("active");
  }
}

function hideLoadingBar(loadingBarName) {
  const loadingBarElement = document.querySelector(".loading-bar");
  if (loadingBarElement) {
    loadingBars = loadingBars.filter(
      (loadingBar) => loadingBar !== loadingBarName,
    );
    if (loadingBars.length === 0) {
      loadingBarElement.classList.remove("active");
    }
  }
}

function copy(elementSelector) {
  let element = document.querySelector(elementSelector);
  let temp = document.createElement("input");
  document.body.append(temp);
  temp.value = element.textContent;
  temp.select();
  document.execCommand("copy");
  temp.remove();
  toastr.success(locale.copied);
}

function findAncestor(el, sel) {
  if ((el.matches || el.matchesSelector).call(el, sel)) {
    return el;
  }

  while (
    (el = el.parentElement) &&
    !(el.matches || el.matchesSelector).call(el, sel)
  );
  return el;
}

function addDynamicEventListener(type, elementSelector, callback) {
  wrapper.addEventListener(type, (event) => {
    const element = findAncestor(event.target, elementSelector);
    if (element) {
      callback(event, element);
    }
  });
}

function getCookie(cookieName) {
  let name = `${cookieName}=`;
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}

function setCookie(cookieName, cookieValue, cookieExpiration = null) {
  if (cookieExpiration === null) {
    cookieExpiration = 3600 * 1000 * 24 * 365; // One year
  }

  let date = new Date();
  date.setTime(date.getTime() + cookieExpiration);
  document.cookie = `${cookieName} = ${cookieValue}; expires = ${date.toUTCString()}; path = /`;
}

async function requestFormModal(modalName, formSource) {
  const modalSelector = `#modal-${modalName}`;

  let modal = bootstrap.Modal.getInstance(
    document.querySelector(modalSelector),
  );
  if (modal) {
    modal.show();
    return;
  }

  showLoadingBar(`modal-${modalName}`);

  const response = await fetch(formSource);
  const data = await response.text();

  const fetchedDocument = document.createElement("div");
  fetchedDocument.innerHTML = data;

  const modalTitle = fetchedDocument.querySelector("h2").innerHTML;

  const modalSubmitButton = fetchedDocument.querySelector(
    'button[type="submit"]',
  );
  const modalSubmitButtonText = modalSubmitButton
    ? modalSubmitButton.innerHTML
    : null;

  const modalForm = fetchedDocument.querySelector("form");

  const modalFormActions = modalForm.querySelector(".form-actions");
  if (modalFormActions) {
    modalFormActions.remove();
  }

  const modalFormHtml = modalForm.innerHTML;

  const oauthProviders = fetchedDocument.querySelector(".oauth-providers");
  if (oauthProviders) {
    oauthProviders.classList.add("pb-3");
  }

  const oauthProvidersHtml = oauthProviders?.outerHTML ?? "";

  let modalCaptchaScriptSrc = null;
  let modalCaptchaScriptCode = null;
  let captchaScriptElement = null;

  if (!modalCaptchaScriptSrc) {
    captchaScriptElement = fetchedDocument.querySelector(
      'script[src^="https://www.google.com/recaptcha/api.js"]',
    );
    if (captchaScriptElement) {
      modalCaptchaScriptSrc = captchaScriptElement.src;
      let captchaScriptCodeElement = fetchedDocument.querySelector(
        'script[src^="https://www.google.com/recaptcha/api.js"] + script',
      );
      if (captchaScriptCodeElement && captchaScriptCodeElement.innerHTML) {
        modalCaptchaScriptCode = captchaScriptCodeElement.innerHTML;
      }
    }
  }

  if (!modalCaptchaScriptSrc) {
    captchaScriptElement = fetchedDocument.querySelector(
      'script[src^="https://hcaptcha.com/1/api.js"]',
    );
    if (captchaScriptElement) {
      modalCaptchaScriptSrc = captchaScriptElement.src;
    }
  }

  let modalElement = document.createElement("div");
  modalElement.classList.add("modal", "fade");
  modalElement.id = `modal-${modalName}`;

  let modalElementHtml = `
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<div class="modal-title">
						${modalTitle}
					</div>
				</div>
				<form action="${formSource}" method="post" id="${modalForm.id}">
					<div class="modal-body">
						${modalFormHtml}
						${oauthProvidersHtml}
					</div>
	`;

  if (modalSubmitButton) {
    modalElementHtml += `
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">${locale.cancel}</button>
						<button type="submit" class="btn btn-primary btn-sm">${modalSubmitButtonText}</button>
					</div>
		`;
  } else {
    modalElementHtml += `
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">${locale.close}</button>
					</div>
		`;
  }

  modalElementHtml += `
				</form>
			</div>
		</div>
	`;

  modalElement.innerHTML = modalElementHtml;

  const randomId = (Math.random() + 1).toString(36).substring(7);

  const modalInputElements = modalElement.querySelectorAll("input");
  for (const element of modalInputElements) {
    if (element.id) {
      element.id = randomId + "-" + element.id;
    }
  }

  const modalLabelElements = modalElement.querySelectorAll("label");
  for (const element of modalLabelElements) {
    if (element.htmlFor) {
      element.htmlFor = randomId + "-" + element.htmlFor;
    }
  }

  wrapper.appendChild(modalElement);

  if (modalCaptchaScriptSrc) {
    let modalCaptchaScript = document.createElement("script");
    modalCaptchaScript.setAttribute("src", modalCaptchaScriptSrc);
    document.body.appendChild(modalCaptchaScript);
    if (modalCaptchaScriptCode) {
      eval(modalCaptchaScriptCode);
    }
  }

  modal = new bootstrap.Modal(document.querySelector(modalSelector));
  modal.show();

  hideLoadingBar(`modal-${modalName}`);
}

function toggleOcNav(ocNav) {
  if (ocNav.classList.contains("active")) {
    document.body.style.paddingRight = "0";
    document.body.classList.remove("overflow-hidden");
    ocNav.classList.remove("active");
  } else {
    document.body.style.paddingRight =
      window.innerWidth - document.body.clientWidth + "px";
    document.body.classList.add("overflow-hidden");
    ocNav.classList.add("active");
  }
}

showLoadingBar("page");

addDynamicEventListener("click", '[href~="#"]', (event) => {
  event.preventDefault();
});

addDynamicEventListener("click", "[data-href]", (event, element) => {
  redirect(element.dataset.href);
});

addDynamicEventListener(
  "mouseover",
  '[data-bs-toggle="tooltip"]',
  (event, element) => {
    let tooltipInstance = bootstrap.Tooltip.getInstance(element);
    if (!tooltipInstance) {
      tooltipInstance = new bootstrap.Tooltip(element);
      tooltipInstance.show();
    }
  },
);

const dropdownHoverList = document.querySelectorAll(".dropdown-hover");
for (const dropdown of dropdownHoverList) {
  const dropdownToggler = dropdown.querySelector(".dropdown-toggle");

  let dropdownInstance = bootstrap.Dropdown.getInstance(dropdownToggler);
  if (!dropdownInstance) {
    dropdownInstance = new bootstrap.Dropdown(dropdownToggler);
  }

  dropdownToggler.addEventListener("click", () => dropdownInstance.show());
  dropdown.addEventListener("mouseover", () => dropdownInstance.show());
  dropdown.addEventListener("mouseout", () => dropdownInstance.hide());
}

const navbar = document.querySelector("#navbar");
if (
  navbar &&
  stickyNavbar == true &&
  navbar.classList.contains("navbar-default")
) {
  const header = document.querySelector("#header");

  let navbarOffsetTop = null;
  window.addEventListener("scroll", () => {
    if (navbarOffsetTop == null) {
      navbarOffsetTop = navbar.offsetTop;
    }
    if (window.pageYOffset >= navbarOffsetTop) {
      navbar.classList.add("navbar-fixed");
      document.body.style.paddingTop = navbar.offsetHeight + "px";
      if (header) {
        header.style.marginTop = navbar.offsetHeight * -1 + "px";
        header.style.paddingTop = navbar.offsetHeight + "px";
      }
    } else {
      navbar.classList.remove("navbar-fixed");
      document.body.style.paddingTop = null;
      if (header) {
        header.style.marginTop = null;
        header.style.paddingTop = null;
      }
    }
  });
}

const ocNav = document.querySelector("#nav-oc");
if (ocNav) {
  ocNav.addEventListener("click", (event) => {
    if (event.target == ocNav) {
      event.preventDefault();
      toggleOcNav(ocNav);
    }
  });
}

addDynamicEventListener("click", "#button-ocNavToggler", (event) => {
  event.preventDefault();
  toggleOcNav(ocNav);
});

if (prefetchForms == 1) {
  addDynamicEventListener("click", "[data-request-modal]", (event, element) => {
    event.preventDefault();
    let modalName = element.dataset.requestModal;
    let formSource = element.href;
    requestFormModal(modalName, formSource);
  });
}

addDynamicEventListener("click", "#button-darkModeToggler", (event) => {
  event.preventDefault();
  showLoadingBar("dark-mode");

  const darkModeCookie = getCookie("dark-mode");
  if (
    darkModeCookie == "1" ||
    document.documentElement.dataset.theme == "dark"
  ) {
    setCookie("dark-mode", "0");
  } else {
    setCookie("dark-mode", "1");
  }

  redirect(location.href);
});

addDynamicEventListener("click", "#button-autoLanguageToggler", (event) => {
  const autoLanguageValue = getCookie("auto-language") ?? "1";
  setCookie("auto-language", autoLanguageValue === "1" ? "0" : "1");
  window.location.reload();
});

addDynamicEventListener("click", '[href="#button-formSubmit"]', (event) => {
  event.preventDefault();

  const form = findAncestor(event.target, "form");
  if (form) {
    form.submit();
  }
});

addDynamicEventListener(
  "click",
  '[data-action="logout"]',
  async (event, element) => {
    event.preventDefault();

    showLoadingBar("logout");

    const url = element.dataset.link;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token: csrfToken }),
    });

    window.location.reload();
  },
);

const scrollToTopButton = document.querySelector("#button-scrollToTop");
if (scrollToTopButton) {
  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopButton.classList.add("active");
    } else {
      scrollToTopButton.classList.remove("active");
    }
  });

  const scrollToTopButtonAnchor = scrollToTopButton.querySelector("a");
  scrollToTopButtonAnchor.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    scrollToTopButtonAnchor.blur();
  });
}

const announcements = document.querySelectorAll('[id^="announcement"]');
for (const announcement of announcements) {
  const announcementCloseButton = announcement.querySelector(".close");
  if (announcementCloseButton) {
    announcementCloseButton.addEventListener("click", (event) => {
      event.preventDefault();
      setCookie(announcement.id, "1");
      for (const event of [
        "transitionend",
        "OTransitionEnd",
        "webkitTransitionEnd",
      ]) {
        announcement.addEventListener(event, () => {
          announcement.remove();
        });
      }
      announcement.style.opacity = "0";
    });
  }
}

const widgets = document.querySelectorAll(".widget");
for (const widget of widgets) {
  if (widget.innerHTML.trim() === "") {
    widget.remove();
  }
}

const updateAlert = document.querySelector("#alert-update");
if (updateAlert) {
  if (getCookie("update-alert-closed") == "true") {
    updateAlert.remove();
  }

  updateAlert.addEventListener("close.bs.alert", () => {
    setCookie("update-alert-closed", "true", 3600000);
  });
}

const timezone = document.getElementById("timezone");
if (timezone) {
  const timezoneValue = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezoneValue) {
    timezone.value = timezoneValue;
  }
}

if (collapsibleForums == 1) {
  const forumCollapsibles = document.querySelectorAll('[id^="collapse-forum"]');
  for (let collapsible of forumCollapsibles) {
    const collapsibleKey = collapsible.id.split("-").pop();
    const collapsibleCookie = getCookie(`forum-collapse-${collapsibleKey}`);

    let collapsibleInstance = bootstrap.Collapse.getInstance(collapsible);
    if (!collapsibleInstance) {
      collapsibleInstance = new bootstrap.Collapse(collapsible, {
        toggle: collapsibleCookie && collapsibleCookie == 1,
      });
    }

    collapsible.addEventListener("show.bs.collapse", () => {
      setCookie(`forum-collapse-${collapsibleKey}`, "0");
    });

    collapsible.addEventListener("hide.bs.collapse", () => {
      setCookie(`forum-collapse-${collapsibleKey}`, "1");
    });
  }
}

if (1 == 1) {
  const header = document.querySelector("#header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (document.body.clientWidth > 991) {
        header.style.backgroundSize =
          100 + (100 * window.pageYOffset) / 450 + "%";
      } else {
        header.style.backgroundSize = "cover";
      }
    });
  }
}

if (chroma) {
  let hue = 0;

  const changeColor = () => {
    hue = hue < 360 ? hue + chromaMultiplier : 0;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty(
        "--primary",
        `hsl(${hue}, ${chromaSaturation}, ${chromaLightness})`,
      );
      changeColor();
    });
  };

  changeColor();
}

const minecraftServerStatus = document.querySelector("#status-minecraft");
if (minecraftServerStatus) {
  const minecraftServerPlayersCount = document.querySelector(
    "#count-minecraftServerPlayers",
  );
  if (minecraftServerPlayersCount) {
    (async () => {
      const serverIp = minecraftServerStatus.dataset.ip.split(":")[0];
      const serverPort =
        minecraftServerStatus.dataset.ip.split(":")[1] ?? "25565";

      let data = null;

      const minecraftQueryCache = sessionStorage.getItem("minecraftQuery");
      if (minecraftQueryCache) {
        data = JSON.parse(minecraftQueryCache);
      } else {
        const rawData = await fetch(
          `https://mcapi.us/server/status?ip=griefergames.net&port=25565`,
        );
        data = await rawData.json();
        sessionStorage.setItem("minecraftQuery", JSON.stringify(data));
      }

      minecraftServerPlayersCount.innerHTML = data.online
        ? data.players.now
        : 1000;
    })();
  }
}

const discordServerStatus = document.querySelector("#status-discord");
if (discordServerStatus) {
  const discordServerUsersCount = document.querySelector(
    "#count-discordServerUsers",
  );
  if (discordServerUsersCount) {
    (async () => {
      const serverId = discordServerStatus.dataset.id;

      let data = null;

      const discordQueryCache = sessionStorage.getItem("discordQuery");
      if (discordQueryCache) {
        data = JSON.parse(discordQueryCache);
      } else {
        const rawData = await fetch(
          `https://discord.com/api/guilds/${serverId}/widget.json`,
        );
        data = await rawData.json();
        sessionStorage.setItem("discordQuery", JSON.stringify(data));
      }

      discordServerUsersCount.innerHTML = data.presence_count
        ? data.presence_count
        : 0;
    })();
  }
}

if (cookieNotice == true) {
  toastr.info(locale.cookieNotice, null, {
    timeOut: 0,
    onHidden: () => setCookie("accept", "accepted"),
  });
}

let popoverCachedUsers = {};
let popoverTimeoutId = null;
let popoverHideTimeoutId = null;

const userPopoversTriggers = document.querySelectorAll("[data-poload]");
for (let trigger of userPopoversTriggers) {
  trigger.addEventListener("mouseover", () => {
    if (popoverTimeoutId) {
      return;
    }

    popoverTimeoutId = setTimeout(async () => {
      clearTimeout(popoverTimeoutId);
      popoverTimeoutId = null;

      let cachedData = popoverCachedUsers[trigger.dataset.poload];
      if (!cachedData) {
        showLoadingBar("user-popover");

        let rawData = await fetch(trigger.dataset.poload);
        let data = await rawData.json();

        if (typeof debugging !== "undefined" && debugging === 1) {
          console.log(data);
        }

        popoverCachedUsers[trigger.dataset.poload] = data;
        hideLoadingBar("user-popover");
      }

      cachedData = popoverCachedUsers[trigger.dataset.poload];

      let popoverInstance = bootstrap.Popover.getInstance(trigger);
      if (!popoverInstance) {
        new bootstrap.Popover(trigger, {
          trigger: "manual",
          html: true,
          placement: "top",
          animation: true,
          content: cachedData.html,
          sanitize: false,
        }).show();
      } else {
        popoverInstance.show();
      }

      let popover = document.querySelector(".popover");
      if (popover) {
        popover.addEventListener("mouseover", () => {
          if (popoverHideTimeoutId) {
            clearTimeout(popoverHideTimeoutId);
            popoverHideTimeoutId = null;
          }
        });

        popover.addEventListener("mouseout", () => {
          if (!document.querySelector(".popover:hover")) {
            bootstrap.Popover.getInstance(trigger).hide();
          }
        });
      }
    }, 750);

    trigger.addEventListener("mouseout", () => {
      if (popoverTimeoutId) {
        clearTimeout(popoverTimeoutId);
        popoverTimeoutId = null;
      } else {
        popoverHideTimeoutId = setTimeout(() => {
          if (!document.querySelector(".popover:hover")) {
            let popoverInstance = bootstrap.Popover.getInstance(trigger);
            if (popoverInstance) {
              popoverInstance.hide();
            }
          }
        }, 200);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  hideLoadingBar("page");
});

hideLoadingBar("page");
