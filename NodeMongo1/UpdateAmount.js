
var http=require("http");
var fs=require("fs");
var qs=require("querystring");
var MongoClient=require('mongodb').MongoClient;
http.createServer(function(req,res){
    
    if(req.method=="GET"){
        if(req.method=="GET"){
            res.writeHead(200,{"Content-Type":"text/html"});
            fs.createReadStream("./getAmount.html").pipe(res);
        }
    }
    else if(req.method=="POST")
    {
        var temp="";
        req.on("data",function(chunk){
            temp+=chunk;
        })
        req.on("end",function(){
            var out=qs.parse(temp); //now out is json document
            var amount=parseFloat(out.amount);


            MongoClient.connect("mongodb://127.0.0.1:27017/",function(err,db){
            var dbo=db.db("Employee");
            dbo.collection("emp").update({},{$inc:{BasicPay:amount}},{multi:true},function(err){
                           if(err){
                                    res.write(err);
                           }
                           else{
                               res.end("Updation successful");
                           }
                       })
                    
                });
            });



            
           
          
    }


}).listen(3000);
console.log("Server running on port 3000");