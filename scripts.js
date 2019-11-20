function get(url){
  //contacts backend to see if the info we've sent is there. Should return 200 if so
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
  //contacts backend to add info
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

function getUserInfo(url, user){

  //format url
  const apiLink = url + user;
  sessionStorage.setItem("apiLink", apiLink);

  //start the promise
  get(apiLink).then(function(response){

  //figure out whether the get worked or not
  if(response.status == 200){
  sessionStorage.setItem("user", response.score.id);
  sessionStorage.setItem("score", response.score.score);
  window.location.href = "mainpage.html";
  }
  else{
      // get didn't work, post new user to database
      post(apiLink, { score: 0 }).then(function(response){
        if(response.status == 200 || response.status == 201){
          window.location.href = "mainpage.html";
        }
      });

  }
  });
}

function displayUserInfo(){
  //assign our session info to variables
  const username = sessionStorage.getItem("user");
  const score = sessionStorage.getItem("score");

  //display given info with .textContent
  document.getElementById("displayUsername").textContent = "Welcome, " + username + "!"
  document.getElementById("displayScore").textContent = score;

}

function updateUserScore(){

  //get our stored values
  const apiLink = sessionStorage.getItem("apiLink");
  var temp = sessionStorage.getItem("score");
  var score = parseInt(temp, 10);

  //increment score
  score += 1;

  //output fizz, buzz, fizzbuzz, or the score based on some arithmetic following the fizzbuzz rules
  if(score % 5 == 0 && score % 3 == 0){
    document.getElementById("displayScore").textContent = "FizzBuzz";
  }
  else if(score % 5 == 0){
    document.getElementById("displayScore").textContent = "Buzz";
  }
  else if(score % 3 == 0){
    document.getElementById("displayScore").textContent = "Fizz";
  }
  else{
    document.getElementById("displayScore").textContent = score;
  }

  //set our session score again
  sessionStorage.setItem("score", score);

  //post new score to database
  post(apiLink, { id: sessionStorage.getItem("user"), score: score });

}
