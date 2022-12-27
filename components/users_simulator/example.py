import threading


def print_cube(num):
	# function to print cube of given num
	print("Cube: {}" .format(num * num * num))


def print_square(num):
	# function to print square of given num
	print("Square: {}" .format(num * num))


if __name__ == "__main__":
	# creating thread
	t1 = threading.Thread(target=print_square, args=(10,))
	t2 = threading.Thread(target=print_cube, args=(10,))

	# starting thread 1
	t1.start()
	# starting thread 2
	t2.start()

	# wait until thread 1 is completely executed
	t1.join()
	# wait until thread 2 is completely executed
	t2.join()

	# both threads completely executed
	print("Done!")



from datetime import datetime

dateFormat = '%y/%m/%d' # 2014-01-01

class DataRange:
    fromDate: datetime
    toDate: datetime

    def __init__(self, fromDate: str, toDate: str) -> None:
        self.fromDate = datetime.strptime(fromDate, dateFormat)
        self.toDate = datetime.strptime(toDate, dateFormat)

class User:
    userId: str
    home: str 
    role: str 
    lengthOfStay: DataRange

    def __init__(self, userId: str, home: str, role: str, lengthOfStay: DataRange) -> None:
        self.userId = userId
        self.home = home
        self.role = role
        self.lengthOfStay = lengthOfStay



def createUser(userId, home: str, role: str, fromDate: str, toDate: str):
    return User(userId,home,role, DataRange(fromDate, toDate))


def createUsers(): 
    return [
        createUser("homeOwnerA", ["homeA"], "HomeOwner", "2014-01-01", None)
    ];
