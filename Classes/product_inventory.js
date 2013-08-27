(function () {
	"use strict"

function Product (price, id, quant){
	this.price = price;
	this.id = id;
	this.quant = quant;
}

function Inventory (){
	this.prods = {};
	var that = this;
	this.addProduct = function(prod){
		if (prod.id in that.prods) {
			that.prods[prod.id].quant += prod.quant;
		}
		else{
			that.prods[prod.id] = prod;
		}
		}
	this.removeProduct = function(prod){
		if (prod.id in that.prods) {
			if (that.prods[prod.id].quant < prod.quant) {
				console.log("I don't have that many products to remove")
			} else {
				that.prods[prod.id].quant -= prod.quant;
			}
		} else {
			console.log("I don't have that product in stock")
		}
	}
	this.inventoryValue = function(){
		var sum = 0;
		for (var id in that.prods){
			var prod = that.prods[id];
			sum += prod.price * prod.quant;
		}
		return sum;
	}
}

var a = new Product(5,"a",10);
var b = new Product(6,"b",5);

var inv = new Inventory();

inv.addProduct(a);
inv.addProduct(b);
console.log(inv.inventoryValue())
}());