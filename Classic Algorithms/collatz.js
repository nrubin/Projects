function collatz_iter(num){
	var steps = 0;
	while (num  > 1){
		if (num % 2 === 0) {
			num = num / 2;
			steps += 1;
		} else {
			num = 3*num + 1;
			steps += 1
		}
	}
	return steps;
}

function collatz_recur(num,steps){
	if (num <= 1) {
		return steps;
	}
	else{
		if (num % 2 === 0) {
			return collatz_recur(num / 2,steps+1);
		} else {
			return collatz_recur(3*num+1,steps+1);
		}
	};

}

var collatz_memo = function(){
	this.memo = {};
	that = this;
	this.collatz = function (num){
		//Have we seen this initial argument before?
		var steps = that.memo[num];
		if (steps) {
			return steps
		} else {
			steps = 0
		}

		var orig_num = num;
		while (num > 1){
			//Have we seen this intermediate number before?
			var prev_steps = that.memo[num]
			if (prev_steps) {
				that.memo[orig_num] = steps + prev_steps;
				return steps + prev_steps;
			};
			steps += 1;
			if (num % 2 === 0) {
				num = num / 2;
			} else {
				num = 3*num + 1;
			}
		}
		that.memo[orig_num] = steps;
		return steps;
	}
	return that;
}

var elapsed_time = function(note){
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    start = process.hrtime(); // reset the timer
}
var limit = 2000;
var numbers = []
for (var i = 0; i < limit; i++) {
	numbers.push(i);
};
var start = process.hrtime();
elapsed_time("begin")
for (var i = 0; i < numbers.length; i++) {
	collatz_iter(numbers[i])
};
elapsed_time("iter time")
for (var i = 0; i < numbers.length; i++) {
	collatz_recur(numbers[i],0)
};
elapsed_time("recur time")
var obj = collatz_memo();
for (var i = 0; i < numbers.length; i++) {
	obj.collatz(numbers[i])
};
elapsed_time("memo time")
