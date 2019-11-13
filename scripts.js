function get(url){
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function() {
        resolve({ status: http.status, score: JSON.parse(http.response)});
    };
    http.open("GET", url);
    http.send();
  });
}

function post(url, score){
  score = JSON.stringify(score);
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function() {
      resolve({ status: http.status, score: JSON.parse(http.response)});
    };
    http.open("POST", url);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(score);
  })
}

function formatUrl(url, user){
  const apiLink = url + '?id=' + user;
  sessionStorage.setItem("apiLink", apiLink);

  get(apiLink).then(function(response){

  if(response.status == 200){
  sessionStorage.setItem("user", response.data.id);
  sessionStorage.setItem("score", response.data.score);
  window.location.href = "mainpage.html";
  }
  else{
      post(apiLink, { score: 0 }).then(function(response){
        if(response.status == 200 || response.status == 201){
          window.location.href = "mainpage.html";
        }
      });

  }

  document.getElementById("displayUsername").value = sessionStorage.getItem("user");

  });
}

function updateUserScore(){

  //get our stored values
  const apiLink = sessionStorage.getItem("apiLink");
  var score = sessionStorage.getItem("score");

  //increment score
  score += 1;

  if(score % 5 == 0 && score % 3 == 0){
    //output fizzbuzz
    document.getElementById("displayScore").value = "FizzBuzz";
  }
  else if(score % 5 == 0){
    //output Buzz
    document.getElementById("displayScore").value = "Buzz";
  }
  else if(score % 3 == 0){
    //output Fizz
    document.getElementById("displayScore").value = "Fizz";
  }
  else{
    //output just the number
    document.getElementById("displayScore").value = score;
  }

  sessionStorage.setItem("score", score);
  post(apiLink, { id: sessionStorage.getItem("user"), score: score });

}
