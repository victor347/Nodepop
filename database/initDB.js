db.users.drop();
db.advertisements.drop();
db.users.insert({name:"Victor Ortegon", email:"victor@Nodepop.com", pass:"qwerty"});
db.users.insert({name:"Carlos Mafla", email:"carlos@Nodepop.com", pass:"qwerty"});
db.users.insert({name:"Migel Sierra", email:"miguel@Nodepop.com", pass:"qwerty"});
db.users.insert({name:"Diana Suarez", email:"diana@Nodepop.com", pass:"qwerty"});
db.users.insert({name:"Daniela Rico", email:"daniela@Nodepop.com", pass:"qwerty"});
db.advertisements.insert({name:"Bicicleta", sale:true, price:120000, image:"/public/images/bicicle.png", tags:["work", "lifestyle", "motor", "mobile"]});
db.advertisements.insert({name:"Play Station 4", sale:true, price:1300000, image:"/public/images/playStation.png", tags:["lifestyle", "motor", "mobile"]});

