INSERT INTO Forms (formId, waitTime, cleanliness, gender, formTimestamp)
VALUES (0, 1.6, 5, "Female", "2024-06-20 19:35:31.313");

INSERT INTO isFormOf (washroomId, formId) 
	VALUES (1, 0);

INSERT INTO Forms (formId, waitTime, cleanliness, gender, formTimestamp)
VALUES (1, 3.33, 3, "Male", "2024-06-20 19:37:31.313");

INSERT INTO isFormOf (washroomId, formId) 
	VALUES (2, 1);

INSERT INTO Forms (formId, waitTime, cleanliness, gender, formTimestamp)
VALUES (2, 5.0, 2, "Female", "2024-06-20 20:35:31.313");

INSERT INTO isFormOf (washroomId, formId) 
	VALUES (1, 2);

SELECT * FROM FORMS;
SELECT * FROM isFormOf;

SELECT w.longitude, w.latitude FROM Washrooms w;

SELECT w.washroomName, w.category, w.onCall, w.street, w.hoursOfOperation
FROM Washrooms w WHERE w.washroomId = 1;

WITH avgWaitTimes AS (SELECT w.washroomId, f.gender, AVG(f.waitTime) AS avgWaitTime
    FROM Washrooms w, Forms f
    WHERE EXISTS(
        SELECT i.formId FROM isFormOf i WHERE i.washroomId = w.washroomId AND i.formId = f.formId)
    GROUP BY w.washroomId, f.gender)
SELECT avgWaitTime FROM avgWaitTimes WHERE washroomId = 1 AND gender = "Female";

INSERT INTO Reviews VALUES (0, "2024-06-18", "good");
INSERT INTO IsReviewOf VALUES (1, 0);

INSERT INTO Reviews VALUES (1, "2024-06-19", "neutral");
INSERT INTO IsReviewOf VALUES (1, 1);

INSERT INTO Reviews VALUES (2, "2024-06-20", "bad");
INSERT INTO IsReviewOf VALUES (1, 2);

SELECT r.reviewTimestamp, r.text
FROM Reviews r, IsReviewOf i
WHERE r.reviewId = i.reviewId AND 
	i.washroomId = 1;
