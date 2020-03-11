let newsList = [];
let sourceTitle = {};
let page = 1


let callAPI = async () => {
    let apiKey = `c74225add6af4f70b0edb124c26f779e`
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&page=${page}`
    
    let data = await fetch(url);
    let result = await data.json();
    console.log("data", data);
    console.log("json", result)

    newsList = newsList.concat(result.articles);
    console.log('data', data);
    console.log('json', result);
    console.log('article list', newsList);

    // nameTitle(newsList);

    render(newsList)

}
let render = (array) => {
    let htmlForNews = array.map((item,index) =>{
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
            <p>${index+1} of ${array.length}</p>
        </div>   
    </div> 
    `;
    }).join('')

document.getElementById('newsArea').innerHTML = htmlForNews
}


callAPI()

function seemore(){
    page = page +1 ;
    callAPI();
}

