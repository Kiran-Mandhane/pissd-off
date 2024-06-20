CREATE TABLE Washrooms (
 	washroomId INT NOT NULL PRIMARY KEY,
	washroomName VARCHAR(100),
	category VARCHAR(100),
	street VARCHAR(100),
	hoursOfOperation VARCHAR(100),
	onCall BOOL,
	latitude VARCHAR(100),
	longitude VARCHAR(100)
);

CREATE TABLE Reviews (
	reviewId INT NOT NULL PRIMARY KEY,
	reviewTimestamp DATETIME NOT NULL,
	text VARCHAR(30)
);

CREATE TABLE isReviewOf(
	washroomId INT NOT NULL REFERENCES Washroom(washroomId),
	reviewId INT NOT NULL REFERENCES Reviews(reviewId),
	PRIMARY KEY(washroomId, reviewId) 
);

CREATE TABLE Forms (
	formId INT NOT NULL PRIMARY KEY,
	formTimestamp DATETIME NOT NULL,
	gender VARCHAR(6) NOT NULL,
	waitTime DECIMAL(3,2),
	cleanliness INT
);

CREATE TABLE isFormOf (
	washroomId INT NOT NULL REFERENCES Washrooms(washroomId),
	formId INT NOT NULL REFERENCES UserForms(formId),
	PRIMARY KEY (washroomId, formId)
);
