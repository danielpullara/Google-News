let newsList = [];
let sourceTitle = {};
let page = 1
let apiKey = `c74225add6af4f70b0edb124c26f779e`

let callAPI = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&page=${page}`
    let data = await fetch(url);
    let result = await data.json();
    console.log("data", data);
    console.log("json", result)

    newsList = newsList.concat(result.articles);
    console.log('data', data);
    console.log('json', result);
    console.log('article list', newsList);

    render(newsList)

}

let searchByCategory = async () => {
    let category = document.getElementById("category").value;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}`
    let data = await fetch(url);
    let result = await data.json();
    
    newsList = result.articles;
    render(newsList);
};

let searchBySource = () => {
    let sourceNames = newsList.map(item => item.source.name);

    let sourceObject = sourceNames.reduce((total, name) => {
        console.log("total:", total);
        if (name in total) {
            total[name]++;
        } else {
            total[name] = 1;
        }
        return total;
    }, {});

    let sourceArray = Object.keys(sourceObject);

    let htmlForSource = sourceArray.map(
        item =>
            `<input onchange='sourceClicked("${item}")' type="checkbox" id="${item}"/> ${item} (${sourceObject[item]})`
    );

    document.getElementById("sourceArea").innerHTML = htmlForSource;
};

// let sourceClicked = index => {
//     if (document.getElementById(index).checked == true) {
//         let filteredNews = newsList.filter(item => item.source.name === index);
//         render(filteredNews);
//     } else {
//         render(newsList);
//     }
// };


let render = (array) => {
    let htmlForNews = array.map((item, index) => {
        return `<div id="news" style="display: flex; border: 1px solid grey">
        <img style="width: 200px;"
        src="${item.urlToImage}"
            alt="">
        <div>
            <h2>${item.title}</h2>
            <p>${item.author}</p>
            <a href="${item.url}">Get Full Coverage</a> 
             <div>${item.description}</div>
             <div>${moment(item.publishedAt, "YYYYMMDD").fromNow()}</div>
            <p>${index + 1} of ${array.length}</p>
        </div>   
    </div> 
    `;
    }).join('')

    document.getElementById('newsArea').innerHTML = htmlForNews;
}


callAPI()

function seemore() {
    page = page + 1;
    callAPI();
}

