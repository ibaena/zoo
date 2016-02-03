var mysql = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'April2488',
    database: 'zoo_db'
});

prompt.start();
prompt.message = '';

//Zoo Object
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
    console.log('To add an animal to the zoo please fill out the following form for us!');
    prompt.get(['caretaker_ID','name', 'type', 'age'], function(err, result){
      var query = "INSERT INTO animals(caretaker_id, name, type, age) VALUES (?,?,?,?)";
      var addAnimal = [result.caretaker_ID, result.name, result.type, result.age];
      connection.query(query, addAnimal, function(err, data){
        if(err){ throw err;
        }console.log(result.name + ' was added to the zoo!');

    currentScope.menu();
    currentScope.promptUser();
      });
    });
  },
  visit : function(){
    console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!");
    console.log("Enter (N): ------> do you know the animal by it's name? We will visit that animal!");
    console.log("Enter (A): ------> here's the count for all animals in all locations!");
    console.log("Enter (C): ------> here's the count for all animals in this one city!");
    console.log("Enter (O): ------> here's the count for all the animals in all locations by the type you specified!");
    console.log("Enter (Q): ------> Quits to the main menu!");
  },
  view : function(input_scope){
    var currentScope = input_scope;
    console.log('Please choice what you like to visit!');
    prompt.get(['->','visit'], function(err,result){
      if (result.visit == "Q") {
        currentScope.menu();
        currentScope.promptUser();
      }else if (result.visit == "O") {
        currentScope.type(input_scope);
      }else if (result.visit == "I") {
        currentScope.animid(input_scope);
      }else if (result.visit == "N") {
        currentScope.name(input_scope)
      }else if (result.visit == "A") {
        currentScope.all(input_scope);
      }else if (result.visit == "C") {
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
    prompt.get(['->','animal_type'], function(err,result){
      var query = 'SELECT COUNT (type) FROM animals WHERE type=?';
      connection.query(query, result,animal_type, function(err,data){
        if(err){
          throw err;
        }console.log('This zoo has ' + data[0]['COUNT(type)'] + ' of this animal type: ' + result.animal_type +'\r\n');
        currentScope.menu();
        currentScope.promptUser();
      });
    });
  },
  care : function(input_scope){
    var currentScope = input_scope;
    console.log('Enter city name NY/SF.');
    prompt.get(['->','city-name'], function(err, result){
      var query = 'SELECT COUNT(*) FROM animals a, caretakers c WHERE a.caretaker_id = c.id AND city = ?';
      connection.query(query, result.city_name, function(err, data){
        if(err){ throw err; }

        console.log('There are ' + data[0]['COUNT(*)'] + ' animals in' + result.city_name + ' zoo.');

        currentScope.visit();
        currentScope.view(currentScope);
    });
  });
  },
  animid : function(input_scope){
    var currentScope = input_scope;
    console.log('Enter ID of the animal you want to visit.');
    prompt.get(['->','animal_id'], function(err, result){
      var query = 'SELECT * FROM animals WHERE id=?';
      connection.query(query, result.animal_id, function(err, data){
        if(err){ throw err;
        }
        console.log('Name: '+data[0].name);
        console.log('Type: '+data[0].type);
        console.log('Age: '+data[0].age+'\r\n');

        currentScope.visit();
        currentScope.view(currentScope);
      });
    });
  },
  name : function(input_scope){
    var currentScope = input_scope;
    console.log('Enter the name of the animal you want to visit.');
    prompt.get(['->','animal_name'], function(err, result){
      var query = 'SELECT * FROM animals WHERE name=?';
      connection.query(query, result.animal_name, function(err, data){
        if(err){ throw err;
        }
        console.log('Animal ID: '+data[0].id);
        console.log('Animal name: '+data[0].name);
        console.log('Animal type: '+data[0].type);
        console.log('Animal age: '+data[0].age+'\r\n');

        currentScope.visit();
        currentScope.view(currentScope);
      });
    });
  },
  all : function(input_scope){
    var currentScope = input_scope;
    console.log('Enter animal to find how many animals we have of those type.');
    prompt.get(['->','animal_type'], function(err,result){
      connection.query('SELECT COUNT(*) FROM animals', function(err, data){
      if(err){ throw err;
      }
      console.log(data[0]['COUNT(*)'] + ' animals are in the zoo.\r\n');

      currentScope.menu();
      currentScope.promptUser();
    });
  });
},
  update : function(input_scope){
    var currentScope = input_scope;
    prompt.get(['--->','id', 'new_name', 'new_age', 'new_type', 'new_caretaker_id'],function(err,result){
      var query = 'UPDATE animals SET id=?, caretaker_id=?, name=?, type=?, age=? WHERE id=?';
      var updateInfo = [result.id, result.new_caretaker_id, result.new_name, result.new_type, result.new_age, result.id];
      connection.query(query, updateInfo, function(err, data){
        if(err){ throw err
        }console.log('Table Updated Success!');
      });

      currentScope.menu();
      currentScope.promptUser();
    });
  },
  adopt : function(input_scope){
    var currentScope = input_scope;
    prompt.get(['->','animal_id'],function(err,result){
      var query = 'DELETE FROM animals WHERE id=?';
      connection.query(query, result.animal_id, function(err, data){
        if(err){ throw err; }

        console.log('Congrats! you have adopted animal #'+result.animal_id+'.');
      });

      currentScope.visit();
      currentScope.view(currentScope);
    });
  },
  promptUser : function(){
    var self = this;
    prompt.get(['input'],function(err,result){
      if (result.input == "Q") {
        self.exit();
      }else if (result.input == 'A') {
        self.add(self);
      }else if (result.input == 'V') {
        self.visit();
        self.view(self);
      }else if (result.input =='D') {
        self.adopt(self);
      }else if (result.input =='U') {
        self.update(self);
      }
      else {
        console.log('Sorry didnt get that come again');
      }
    });
  },
  exit : function(){
    console.log('Thank you for visiting us goodbye!');
    process.exit();
  },
  open : function(){
    this.welcome();
    this.menu();
    this.promptUser();
  }
};

zoo.open();
