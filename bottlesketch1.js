
data = [];
var plasticCounter = 0;

function setup() {
  createCanvas(1280, 3200);
  img = createImg('bottle.png');
  img.hide();
  img.height = 20;
}
//Command used to change the canvas size once it's been set in setup()
function windowResized() {
  b=0;
  plasticIf();
  c=(800+b);
  console.log(c, "windowresized");
  resizeCanvas(1200, c);
}
//Dynamically changes the height of the canvas based on the value of 'plasticCounter'
function plasticIf(){
  console.log(plasticCounter)
    if(plasticCounter >= 0 && plasticCounter < 18399){
      b = 0
      console.log(800+b);
  }
  else if(plasticCounter > 18399 && plasticCounter < 36801){
    b = b+800;
    console.log(800+b);
    console.log(plasticCounter);
       // console.log(c)
  }
  else if(plasticCounter > 36801 && plasticCounter < 55101){
    b = b+1600;
    console.log(800+b);
    console.log(plasticCounter);
  }
  else if(plasticCounter > 55101 && plasticCounter < 73601){
    b = b+2400;
    console.log(800+b);
    console.log(plasticCounter);
  }
  else if(plasticCounter > 73601 && plasticCounter < 92001){
    b = b+3200;
    console.log(800+b);
    console.log(plasticCounter);
  }
  else if(plasticCounter > 92001 && plasticCounter < 110401){
    b = b+4000;
    console.log(800+b);
    console.log(plasticCounter);
  }
  else{
    b=b+7000;
    console.log(plasticCounter);
  }
}
//Converts the button response of previous page into a number to be added to 'plasticCounter'
function counter(){
  // console.log("counter is working",data);
  for(let i=0; i< data.length; i++){
    if(data[i].eco == "1"){
      plasticCounter = plasticCounter + 100;
    }
    else if(data[i].average == "2"){
      plasticCounter = plasticCounter + 200;
      console.log(plasticCounter);
    }
    else if(data[i].bad == "3"){
      plasticCounter = plasticCounter + 300;
    }
  };
  document.getElementById("myText").innerHTML = plasticCounter;
};

function draw() {
  var x = 0;
  var y = 0;
  var xPadding = 4;
  var yPadding = 12;
  var w = 1200;
  background(34,34,51);

//loop through the dataset
  for(let i=0; i< data.length; i++){
    if(data[i].eco == "1"){
      //Second loop to determine how many bottles to draw
      for(let j =0; j<1; j++){
        x = x+40;
        image(img,x,y,img.width / 4, img.height / 4);
      };
    }
    else if(data[i].average =="2"){
      //draws 2 bottles
      for(let j =0; j<2; j++){
        x = x+ 40;
        image(img,x,y,img.width / 4, img.height / 4);
      };
    }
    else if(data[i].bad == "3"){
      //draws 3 bottles
      for(let j =0; j<3; j++){
        x = x+ 40;
        image(img,x,y,img.width / 4, img.height / 4);
      };
    }
    //If the space between the last bottle and the canvas edge is less than 40,
    //make a new line of bottles
    if((w -x) < 40){
      y = y+130;
      x = 0;
    };
  };
};

function getData(){
  fetch('/guiltdata')
    .then((response) => {
      return response.json();
    })
    .then((incoming) => {
      console.log("*****");
      console.log(incoming);
      data = incoming.guiltdata;
      // call it here or else itll happen asynchonouslly if in setup or in another function
      counter();
      console.log(data);
      //call it here or else it wont run
      windowResized();
    })

  $(document).ready(function() {
    setTimeout(jQuery,1000);
      function jQuery(){
          // console.log(data);
          console.log("here i am");
          //checks the last received data item and outputs that value as html
          if(data[data.length-1].eco =="1"){
            $('#countText').text("100lb");
            console.log("100");
          }
          else if(data[data.length-1].average =="2"){
            $('#countText').text("200lb");
            console.log("200!");
          }
          else if(data[data.length-1].bad =="3"){
            $("#countText").text("300lb");
            console.log("300!");
          }
      }
  });
};
getData()
