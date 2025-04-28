"use client";

let loadingBars: string[] = [];

export function useTheme() {
  function showLoadingBar(loadingBarName: string) {
    if (typeof window !== "undefined") {
      const loadingBarElement = document.querySelector(".loading-bar");
      if (!loadingBarElement) {
        return;
      }
      if (loadingBarElement) {
        loadingBars.push(loadingBarName);
        loadingBarElement.classList.add("active");
      } else {
      }
    }
  }

  function hideLoadingBar(loadingBarName: string) {
    if (typeof window !== "undefined") {
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
  }

  function copy(elementSelector: string) {
    const element = document.querySelector(elementSelector);
    const temp = document.createElement("input");
    document.body.append(temp);
    if (!element?.textContent) return;
    temp.value = element.textContent;
    temp.select();
    document.execCommand("copy");
    temp.remove();
  }

  return { showLoadingBar, hideLoadingBar, copy };
}
