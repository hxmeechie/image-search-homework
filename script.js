const searchHint = document.querySelector(".hint");
const searchButton = document.querySelector(".searchButton");
const searchImage = document.querySelector(".searchImage");

const randomArrayElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const changeButtonState = (state) => {
  searchButton.classList.toggle("loading", state);
  searchButton.disabled = state;
};

const scrapeImage = async () => {
  const searchInput = document.querySelector(".searchBar").value;
  if (searchInput.length === 0) return;
  changeButtonState(true);
  const searchParams = new URLSearchParams({
    tbm: "isch",
    asearch: "isch",
    async: "_fmt:json,p:1",
    safe: "active",
    q: searchInput,
  });
  const response = await fetch(
    `https://corsproxy.io/?https://www.google.com/search?${searchParams}`
  );

  if (!response.ok) return;
  const data = await response.text();
  const { ischj } = JSON.parse(data.slice(data.indexOf("{")));
  if (Object.keys(ischj).length === 0) return;
  const { original_image, result } = randomArrayElement(ischj.metadata);
  searchHint.textContent = result.page_title;
  searchImage.src = original_image.url;
  changeButtonState(false);
};
