#collatz.py
import time

class collatz_memo:
	def __init__(self):
		self.memo = {}

	def collatz(self,num):
		steps = self.memo.get(num,0)
		if steps != 0:
			return self.memo[num]
		orig_num = num
		while num != 1:
			prev_steps = self.memo.get(num,0)
			if prev_steps != 0:
				# print "other memo hit"
				self.memo[orig_num] = steps + prev_steps
				return steps + prev_steps
			steps += 1
			if num % 2 == 0:
				num = num / 2
			else:
				num = 3 * num + 1
		self.memo[orig_num] = steps
		return steps



def collatz_iter(num):
	steps = 0;
	while num != 1:
		if num % 2 == 0:
			num = num /2
			steps += 1
		else:
			num = num * 3 + 1
			steps += 1
	return steps

def collatz_recur(num,steps):
	if num == 1:
		return steps
	elif num % 2 == 0:
		return collatz_recur(num/2,steps+1)
	else:
		return collatz_recur(3*num+1,steps+1)

def millis():
	return int(round(time.time()*1000))

def elapsed_time(note,start):
	elapsed = millis() - start
	print "%s in %f" % (note, elapsed)
	start = millis()

if __name__ == '__main__':
	limit = 2000
	start = time.clock()
	obj = collatz_memo()
	answers1 = [obj.collatz(x) for x in range(1,limit)]
	end1 = time.clock()
	answers2 = [collatz_iter(x) for x in range(1,limit)]
	end2 = time.clock()
	answers3 = [collatz_recur(x,0) for x in range(1,limit)]
	end3 = time.clock()
	print "memo took %f" % ((end1 - start)*1000)
	print "iter took %f" %  ((end2 - end1)*1000)
	print "recu took %f" % ((end3 - end2)*1000)
	# start = millis()
	# print collatz_iter(50000000000)
	# elapsed_time("iter done",start)
	# print collatz_recur(50000000000, 0)
	# elapsed_time("recur done",start)
	