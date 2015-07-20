// *** prototype inheritance. *** Remember, set prototype before instantiating
var animal = { eats: true }

function Rabbit(name) {
 this.name = name
}

Rabbit.prototype = animal;

var rabbit = new Rabbit('John');
alert( rabbit.eats );

//*** looping properties in object
for(var p in rabbit) {
 alert (p + " = " + rabbit[p]) // outputs both "name" and "eats"
}