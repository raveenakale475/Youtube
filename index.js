//searchvideos here

//es6=.arrow function use

function addDetails(v, t, ct, d) {
  this.videoId = v;
  this.title = t;
  this.channelTitle = ct;
  this.description = d;
}

const searchVideos = async () => {
  try {
    const query = document.getElementById("query").value;

    const api_key = `AIzaSyBW2qv9GUSsfRHRFucylsSTUjUFiD0YOE8`;

    //'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]'

    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${api_key}`
    );

    const data = await res.json();

    const actual_data = data.items;

    appendVideos(actual_data);

    //console.log(data);
  } catch (error) {
    console.log("error:", error);
  }
};

const container_div = document.getElementById("container");

const appendVideos = (data) => {
  container_div.innerHTML = null;

  data.forEach(({ snippet, id }) => {
    const title = snippet.title;

    const videoId = id.videoId;

    const thumbnail = snippet.thumbnails.high.url;

    const channel_name = snippet.channelTitle;

    const Description = snippet.description;

    const div = document.createElement("div");

    const img = document.createElement("img");

    img.src = thumbnail;
    img.style.width = "95%";

    const title_html = document.createElement("h4");
    title_html.innerText = title;

    const channel_html = document.createElement("h5");
    channel_html.innerText = channel_name;

    div.append(img, title_html, channel_html);

    container_div.append(div);

    div.onclick = () => {
      let gift = new addDetails(videoId, title, channel_name, Description);

      localStorage.setItem("Details", JSON.stringify(gift));

      window.location.href = "videoDetails.html";
    };
  });
};

// Most popular videos

const AppendVideos = (data) => {
  container_div.innerHTML = null;

  data.forEach(({ snippet, id }) => {
    const title = snippet.title;

    const videoId = id;

    const thumbnail = snippet.thumbnails.high.url;

    const channel_name = snippet.channelTitle;

    const Description = snippet.description;

    const div = document.createElement("div");

    const img = document.createElement("img");

    img.src = thumbnail;
    img.style.width = "95%";

    const title_html = document.createElement("h4");
    title_html.setAttribute("id", "title");
    title_html.innerText = title;

    const channel_html = document.createElement("h5");
    channel_html.innerText = channel_name;

    div.append(img, title_html, channel_html);

    container_div.append(div);

    div.onclick = () => {
      let gift = new addDetails(videoId, title, channel_name, Description);

      localStorage.setItem("Details", JSON.stringify(gift));

      window.location.href = "videoDetails.html";
    };
  });
};

// Most popular search
const FetchV = async () => {
  const api_key = `AIzaSyBW2qv9GUSsfRHRFucylsSTUjUFiD0YOE8`;

  const popular_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=IN&key=${api_key}`;

  const res = await fetch(popular_url);

  const container = await res.json();

  const Most = container.items;

  AppendVideos(Most);
};
