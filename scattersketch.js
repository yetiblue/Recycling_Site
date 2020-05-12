//used a for loop to go through 'data' and from get the list of cases
//needed to take all those seperate values and loop through them with a for loop and put them into an array
// a lot of stuff -> one array = need for loop :)


let data = [
];
console.log(data);
let formattedData = [];

function setup() {
  var canvas = createCanvas(1000, 690);
   canvas.parent('sketch-holder');

}


function draw() {
  //youngest person 3 years old
  background(34,34,51);
    // background(256);
   for (let i =0; i < data.length; i++){
  noStroke();
   ellipse(30+data[i].age*9,(500-(data[i].rating*40)),20,20);

   if (data[i].yesno1 == 'yes'){
     fill(255, 7, 58);

  }else fill(221,221,0);
    // fill(168,255,255);
 }


  stroke(0,0,0)
  // line(50,20,50,550);
  // line(50,550, 780,550);



}
setTimeout(draw, 1000);

// setTimeout(draw, 10000);

this.show = function(val){
    noStroke();
    fill(255,0,255,200);

       ellipse(216,520,10,10);


}


val = formattedAge = [];
val2 = formattedRating = [];


function getData(){
fetch('/data2')
  .then((response) => {
  return response.json();
  })
  .then((incoming) => {
  console.log("*****");
  console.log(incoming);
  data = incoming.thedata;
})
};
getData()
