function get(url){
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function() {
        resolve({ status: http.status, data: JSON.parse(http.response)});
    };
    http.open("GET", url);
    http.send();
  });
}

function post(url, data){
  data = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function() {
      resolve({ status: http.status, data: JSON.parse(http.response)});
    };
    http.open("POST", url);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(data);
  })
}

function formatUrl(url, user){
  const apiLink = url.concat(user);

  get(apiLink).then(function(response){

  if(response.status == 200){
  const username = response.data.id;
  const score = response.data.score;
  window.location.href = "S:/FizzBuzz/mainpage.html";
  }
  else{
      post(apiLink, { score: 0 });
      window.location.href = "S:/FizzBuzz/mainpage.html";
  }
  });
}
