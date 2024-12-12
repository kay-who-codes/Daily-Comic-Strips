// Old Comics: Existing array for comic RSS
const comics = [
  {
    title: "Garfield",
    rssUrl: "https://www.comicsrss.com/rss/garfield.rss",
    moreLink: "https://www.gocomics.com/random/garfield",
  },
  {
    title: "B.C.",
    rssUrl: "https://www.comicsrss.com/rss/bc.rss",
    moreLink: "https://www.gocomics.com/random/bc",
  },
  {
    title: "1 And Done",
    rssUrl: "https://www.comicsrss.com/rss/1-and-done.rss",
    moreLink: "https://www.gocomics.com/random/1-and-done",
  },
  {
    title: "9 to 5",
    rssUrl: "https://www.comicsrss.com/rss/9to5.rss",
    moreLink: "https://www.gocomics.com/random/9to5",
  },
  {
    title: "2 Cows and a Chicken",
    rssUrl: "https://www.comicsrss.com/rss/2cowsandachicken.rss",
    moreLink: "https://www.gocomics.com",
  },
  {
    title: "Bizzaro",
    rssUrl: "https://www.comicsrss.com/rss/bizarro.rss",
    moreLink: "https://comicskingdom.com/comics?sortby=rand",
  },
  {
    title: "Mother Goose & Grimm",
    rssUrl: "https://www.comicsrss.com/rss/mothergooseandgrimm.rss",
    moreLink: "https://www.gocomics.com/random/mother-goose-and-grimm",
  },
  {
    title: "Fowl Language",
    rssUrl: "https://www.comicsrss.com/rss/fowl-language.rss",
    moreLink: "https://www.gocomics.com/random/fowl-language",
  },
  {
    title: "Berkeley Mews",
    rssUrl: "https://www.comicsrss.com/rss/berkeley-mews.rss",
    moreLink: "https://www.gocomics.com/random/berkeley-mews",
  },
  {
    title: "Foolish Mortals",
    rssUrl: "https://www.comicsrss.com/rss/foolish-mortals.rss",
    moreLink: "https://www.gocomics.com/random/foolish-mortals",
  },
];

// New Buttons: Separate array for the new comic buttons
const otherComics = [
  {
    title: "xkcd",
    buttonLink: "https://xkcd.com/",
  },
  {
    title: "Cyanide and Happiness",
    buttonLink: "https://explosm.net/",
  },
  {
    title: "The Oatmeal",
    buttonLink: "https://theoatmeal.com/feed/random",
  },
  {
    title: "The Awkward Yetti",
    buttonLink: "https://theawkwardyeti.com/comic-archive/",
  },
  
];

const container = document.getElementById("comics-container");
const newButtonsContainer = document.getElementById("other-comic-button-container");

// Fetch and display old comics (Garfield, xkcd, etc.)
comics.forEach((comic) => {
  fetch(comic.rssUrl)
    .then((response) => response.text())
    .then((xmlText) => {
      // Parse RSS XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");

      // Get the latest comic item
      const item = xmlDoc.querySelector("item");
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const description = item.querySelector("description").textContent;
      
      // Use a more robust regex to match the image URL in the description
      const imageUrlMatch = description.match(/<img src="([^"]+)"/);
      const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';  // Default to empty string if not found

      // Create the comic element
      const comicElement = document.createElement("div");
      comicElement.classList.add("comic");

      comicElement.innerHTML = `
        <div class="comic-title">${title}</div>
        <img src="${imageUrl}" alt="${title}">
        <a href="${comic.moreLink}" class="more-button" target="_blank">MORE</a>
      `;

      container.appendChild(comicElement);
    })
    .catch((error) => {
      console.error(`Error fetching comic "${comic.title}":`, error);
    });
});

// Create and display new buttons for the new section
otherComics.forEach((comic) => {
  const buttonElement = document.createElement("a");
  buttonElement.href = comic.buttonLink;
  buttonElement.classList.add("other-comic-button");
  buttonElement.textContent = comic.title;

  newButtonsContainer.appendChild(buttonElement);
});