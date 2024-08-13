const items = [
    {
      title: "Бюстгальтер Flower",
      description: "Позволь самым красивым цветам распуститься прямо на тебе. Расцветай вместе с нашим бельём",
      tags: ["new", "sale"],
      price: 2500,
      img: "./img/bra_flower.jpg",
      rating: 4.5,
    },
    {
      title: "Комплект Tenderness",
      description: "Невероятно нежный и невесомый комплект",
      price: 7500,
      img: "./img/set_tenderness.jpg",
      rating: 3.5,
    },
    {
        title: "Трусики Сomfort",
        description: "Из линейки Basic для носки на каждый день",
        tags: ["sale"],
        price: 700,
        img: "./img/underpants_comfort.jpg",
        rating: 3.8,
      },
      {
        title: "Бюстгальтер Milano",
        description: "Наша новинка ,представленная в трёх цветах",
        tags: ["new"],
        price: 1700,
        img: "./img/bra_milano.jpg",
        rating: 3.2,
      },
    {
        title: "Комплект Animals prints",
        description: "Истинная природная красота в комплекте  Animals prints",
        tags: ["sale"],
        price: 4500,
        img: "./img/set_animals_prints.jpg",
        rating: 4.5,
      },
      {
        title: "Трусики Provans",
        description: "Почувствуй французскую душу в наших новых трусиках",
        price: 1500,
        tags: ["new"],
        img: "./img/underpants_provans.jpg",
        rating: 3.5,
      },
      {
        title: "Комплект Love",
        description: "Комплект Love - это обжигающий концентрат чувственности в особом дизайне, почувствуй себя желанной и особенной",
        price: 8500,
        tags: ["new"],
        img: "./img/set_love.jpg",
        rating: 5,
      },
      {
        title: "Комплект Aphrodite",
        description: "Невероятно легкое кружево в обворожительном комплекте",
        price: 10500,
        img: "./img/set_aphrodite.jpg",
        rating: 5,
      },
      {
        title: "Бюстгальтер Shell",
        description: "Сделан только из премиальных тканей",
        price: 4500,
        tags: ["new"],
        img: "./img/bra_shell.jpg",
        rating: 3.5,
      },
      {
        title: "Комплект Basic",
        description: "Идеально подойдет на каждый день, дышащая ткань",
        price: 2500,
        tags: ["sale"],
        img: "./img/set_basic.jpg",
        rating: 3.2,
      },
      {
        title: "Трусики Amour",
        description: "Выразительные и неповторимые",
        price: 2500,
        tags: ["new"],
        img: "./img/underpants_amour.jpg",
        rating: 3.5,
      },
      {
        title: "Комплект Zebra",
        description: "Наша новинка из серии Animals prints",
        price: 4500,
        tags: ["new", "sale"],
        img: "./img/set_zebra.jpg",
        rating: 3.5,
      },
]

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;

    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < Math.floor(rating); i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector(".tags");
    if (tags && tags.length) {
        tags.forEach((tag) => {
            const element = document.createElement("span");
            element.textContent = tag;
            element.classList.add("tag");
            tagsHolder.append(element);
        });
    }

    return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) => el.title.toLowerCase().includes(searchString));
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("input", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive": {
            currentState.sort((a, b) => b.price - a.price);
            break;
        }
        case "cheap": {
            currentState.sort((a, b) => a.price - b.price);
            break;
        }
        case "rating": {
            currentState.sort((a, b) => b.rating - a.rating);
            break;
        }
        case "alphabet": {
            currentState.sort((a, b) => sortByAlphabet(a, b));
            break;
        }
    }
    renderItems(currentState);
});