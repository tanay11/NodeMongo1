
var http=require("http");
var fs=require("fs");
var qs=require("querystring");
var MongoClient=require('mongodb').MongoClient;
http.createServer(function(req,res){
    
    if(req.method=="GET"){
        if(req.method=="GET"){
            res.writeHead(200,{"Content-Type":"text/html"});
            fs.createReadStream("./EmployeeDetails.html").pipe(res);
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
            var id=out.id;


            MongoClient.connect("mongodb://127.0.0.1:27017/",function(err,db){
                var dbo=db.db("Employee");
                var findObj={_id:id};
                dbo.collection("emp").findOne(findObj,function(err,doc){
                    if(!doc){
                        res.end("Employee not present");
                    }

                    else if (doc) {
                        res.end(
                            `
                            <!DOCTYPE html>
                            <html>
                            <head>
                            <title>Employee Details</title>
                            </head>
                            <body>
                            <H1>Employee Details</H1>
                            <form>
                            <label>Id : </label>
                            <input type="text" name="id" value=${id}>
                            
                            <label>Name : </label>
                            <input type="text" name="name" value=${doc.Name}>
                            
                            <label>Basic pay : </label>
                            <input type="text" name="bp" value=${doc.BasicPay}>
                            
                            
                            <label>Net pay : </label>
                            <input type="text" name="bp" value=${doc.NetPay}>
                            
                            
                            </form>
                            </body>
                            </html>
                            `
                        )
                    }
                });
            });



            
           
          
    });
}

}).listen(3000);
console.log("Server running on port 3000");