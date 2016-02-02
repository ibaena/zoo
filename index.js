var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'April2488',
    database: 'zoo_db'
});

var prompt = require('prompt');
prompt.start();

var zoo = {
  welcome : function (){
    console.log("welcome to the zoo and friends app~");
  },
  menu : function (){
    console.log("Enter (A): ------> to Add a new animal to the Zoo!");
    console.log("Enter (U): ------> to Update info on an animal in the Zoo!");
    console.log("Enter (V): ------> to Visit the animals in the Zoo!");
    console.log("Enter (D): ------> to Adopt an animal from the Zoo!");
    console.log("Enter (Q): ------> to Quit and exit the Zoo!");
  },
  add : function(input_scope) {
    var currentScope = input_scope;
    var query = "INSERT INTO zoo_db(name, type, age) VALUES (?,?,?)";
    console.log('To add an animal to the zoo please fill out the following form for us!');
    prompt.get(["->", "name", "type", "age"], function(err, result){
        connection.query(query);
    });
    currentScope.menu();
    currentScope.promptUser();
  },
  visit : function(){
    console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!");
    console.log("Enter (N): ------> do you know the animal by it's name? We will visit that animal!");
    console.log("Enter (A): ------> here's the count for all animals in all locations!");
    console.log("Enter (C): ------> here's the count for all animals in this one city!");
    console.log("Enter (O): ------> here's the count for all the animals in all locations by the type you specified!");
    console.log("Enter (Q): ------> Quits to the main menu!");
    currentScope.visit();
    currentScope.view(currentScope);
  },
  view : function(){
    var currentScope = input_scope;
    console.log('Please choice what you like to visit!');
    prompt.get(['->','visit']), function(err,result){
      if (result.visit == "Q") {
        currentScope.menu();
      }else if (result.visit == "O") {
        currentScope.type(input_scope);
      }else if (result.type == "I") {
        currentScope.type(input_scope);
      }else if (result.animId == "N") {
        currentScope.name(input_scope)
      }else if (result.name == "A") {
        currentScope.all(input_scope);
      }else if (result.all == "C") {
        currentScope.care(input_scope);
      }else {
        console.log("Sorry didn't get that, come again?");
        currentScope.visit();
        currentScope.view(currentScope);
      }
    });
  },
  type : function(input_scope){
    var currentScope = input_scope;
    console.log('Enter animal type to find how many animals we have of those type.');
    prompt.get(['->','animal_type']), function(err,result){
      connection.query();
      currentScope.menu();
      currentScope.promptUser();
    });
  }


};
