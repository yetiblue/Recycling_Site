var Datastore = require('nedb');
//create instance of datastore
//will save data  into json file
var finaldb = new Datastore({filename: "final.db", autoload:true})
var guiltdb = new Datastore({filename: "guilt.db", autoload:true})

var showdb = new Datastore({filename:"showData.db", autoload:true});
var yesdb = new Datastore({filename:"yes.db", autoload:true})
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser); 

app.set('view engine', 'ejs');
app.use(express.static('public'));
//Final Project


var alldatas = [];
app.post('/submit', function (req, res) {

  var data = {
    rating: req.body.selectedNumber,
    age: req.body.age,
    yesno1: req.body.buttonresponse,
    yesno2: req.body.buttonresponse2,
    timestamp: Date.now()
  };

res.render('scatter.ejs');
  // console.log(data.faceloc);

  //alldatas.push(data);
  finaldb.insert(data, function (err, newDocs) {
	   console.log("err: " + err);
	    console.log("newDocs: " + newDocs);
  });
});
app.post('/guilt',function(req,res){
  var guiltdata ={
    eco: req.body.buttonresponse,
    average: req.body.buttonresponse2,
    bad: req.body.buttonresponse3,
    timestamp: Date.now()

  };
  res.render('sketch12.ejs');
  guiltdb.insert(guiltdata, function (err, newDocs) {
    console.log("err: " + err);
     console.log("newDocs: " + newDocs);
 });
});

  app.get('/data2', function(req,res) {
    finaldb.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
      console.log(docs);
      res.send({thedata: docs});
    });
    
});
  app.get('/guiltdata',function(req,res){
    guiltdb.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
      console.log(docs);
      res.send({guiltdata: docs});
  });
});
app.get('/',function(req,res){
  res.redirect(firstpage.html);
});









//APRIL 2 -- P5JS HOMEWORK
app.get('/favshow',function(req,res){
    showdb.find({},function(err,docs){
        res.render('response.ejs',{data:docs})
    })

})
// app.get('/guilt', function(req,res){
//   res.render(p5.ejs);
// });

app.get('/data',function(req,res){
    showdb.find({},function(err,docs){
        //var passData = {data:docs}
        res.send({data:docs})
    })
})
app.post('/showForm',function(req,res){
    var show;
    if (req.body.show){
        //update the database
        console.log("you added to existing show: ", req.body.show)
        showdb.update({show: req.body.show},{$inc: {count: 1}}, {upsert:true},function(){
            console.log("update")
        })
    } else{
        //add to database
        let data = {
            show:req.body.newOption,
            count:1,
            xLoc: Math.floor(Math.random()*600),
            yLoc:Math.floor(Math.random()*400),
            color:[Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)]
        }
        showdb.insert(data,function(err,newDocs){
            console.log("err: ", err);
            console.log("new show doc: ", newDocs)
        })
        console.log("new show: ", req.body.newOption)
    }
    //console.log("data: ", req.body)
    showdb.find({},function(err,docs){
        res.render('response.ejs',{data:docs})
    })
})
app.listen(80, function () {
  console.log('Example app listening on port 80!')
});


app.post('/submitting', function(req,res){
	var responses = {
		"yes": req.body.buttonresponse,
		"no": req.body.buttonresponse2,
		"reason": req.body.reasoning,
	};
    res.redirect('youtube/gamepage2.html')

	yesdb.insert(responses);
  console.log("submitted"+responses);
  
	
});
app.get('/submitdata', function(req,res) {
    yesdb.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
      console.log(docs);
      res.send({responses: docs});
	});
});
app.post('/submitting2', function(req,res){
	var responses = {
		"yes2": req.body.buttonresponse,
		"no2": req.body.buttonresponse2,
		"reason2": req.body.reasoning,
	};
    res.redirect('youtube/gamepage3.html')

	yesdb.insert(responses);
  console.log("submitted"+responses);
  
	
});
app.get('/submitdata', function(req,res) {
    yesdb.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
      console.log(docs);
      res.send({responses: docs});
	});
});
app.post('/submitting3', function(req,res){
	var responses = {
		"yes3": req.body.buttonresponse,
		"no3": req.body.buttonresponse2,
		"reason3": req.body.reasoning,
	};
    res.redirect('youtube/gamepage4.html')

	yesdb.insert(responses);
  console.log("submitted"+responses);
  
	
});
app.get('/submitdata', function(req,res) {
    yesdb.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
      console.log(docs);
      res.send({responses: docs});
	});
});
var reasonbase = [];
app.post('/submitting4', function(req,res){
	var responses = {
		"yes4": req.body.buttonresponse,
		"no4": req.body.buttonresponse2,
    "reason4": req.body.reasoning,
  
  };
  var data = req.body.data;
  reasonbase.push(data);
  var objecttopass={reasons: reasonbase};
  // res.render('reasons.ejs',objecttopass);

    res.redirect('youtube/graph.html')
    // res.render('responses.ejs')

	yesdb.insert(responses);
  console.log("submitted"+responses);
  
	
});
app.get('/submitdata', function(req,res) {
    yesdb.find({}).sort({ timestamp: 1 }).exec(function (err, docs) {
      console.log(docs);
      res.send({responses: docs});
	});
});

