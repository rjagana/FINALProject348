# FINALProject348

### master branch - has all the code

#### Note: In the project sheet, it stated to describe particular things in the demo. Anything that wasn't discussed in the demo, I have written out thoroughly in my report document as I did not want to go above the 15 minute demo time limit! Thanks!

Files that show prepared statements/sanitization of user inputs and ORM: all in the controller folder in the backend

Files that show that data is being retrieved and populated as necessary: all in the&nbsp; frontend/src/components (specifically Restaurant_View, Update_Reservation, Delete_Reservation, Reservation, and Report)&nbsp;

#### How To Run:
##### Go to backend folder, and run `npm run dev` command
##### Go to frontend folder, and run `npm run dev` command which will take you to localhost link 


##### 348 Final Project RUBRIC (Required Report and Explanations to show each feature required by the Rubric)

###### Deliverable 1: Indexes Document
Index on Cuisine: I have implemented an index on the cuisine attribute, which is used in my Restaurants interface (where a list of all the restaurants available to users is retrieved from the database) when a user would like to filter the restaurants by cuisine. I chose to index based upon the cuisine field in the restaurant collection as it significantly enhances the query performance when searching for restaurants based on cuisine types. By creating an index on the cuisine column, MongoDB can quickly locate and retrieve restaurants that match specific cuisine criteria specified in queries. This improves search efficiency and reduces the time required to fetch relevant data, especially as my application involves frequent filter/ search for restaurants by cuisine type. Without an index, the database would need to perform a full table scan, examining every row in the table, which can be resource-intensive and lead to slower query execution times.
Index on Price: I have implemented indexes on the price field in order to allow efficient retrieval of restaurants based on their price categories. With an index in place, if a user would like to view restaurants in a specific price range, the application can utilize the index to quickly locate matching records, improving query performance. This is particularly beneficial in my application as the chances of users searching often for restaurants within specific price brackets is likely. As the indexed price range column allows the database to swiftly identify relevant restaurants, there is no need for exhaustive table scans. As a result, query response times are reduced, enhancing the overall user experience.
Index on Rating Range: Implementing an index on the rating filter is extremely beneficial to the application as it offers substantial performance benefits in applications where users seek restaurants based on their ratings within a specified range. Specifically, due to this being a range query,  the database can efficiently locate restaurants that fall within the desired rating range, significantly reducing query execution time. This optimization becomes particularly crucial when dealing with large datasets, as it allows the database engine to swiftly pinpoint relevant records without scanning the entire table. As a result, users experience faster response times when querying for restaurants with specific rating criteria, leading to improved application performance and user satisfaction.

###### Deliverable 2: Demo/Proof that Requirements 1 and 2 are Complete 
Demo Video has been submitted to Brightspace
Requirement 1: I have a Make Reservation, Update Reservation, and Delete Reservation that are all functional with my database- this covers all the bases for requirement 1. 
Requirement 2: I have my Restaurant interface that allows users to view the various restaurants that are available for reservation. Users are able to filter the restaurants that are available to them based on the type of cuisine, the price range, and the rating of restaurants. I also have satisfied requirement 2 by generating a report from the restaurants. The report gives varied statistics regarding the restaurants including the number of restaurants per cuisine, the average rating of each cuisine amongst the restaurants available, and the number of restaurants per each price range- this covers all the bases for requirement 2. 

###### Deliverable 3: Two Database Access Methods
Prepared Statements (however used sanitized user inputs and parameterized queries as MongoDB does not support prepared statements)
This is seen specifically in createRestaurant.js, insertManyRestaurants.js, reservation.js
And they have large block comments explaining my approach and the functionality of how I have sanitized the user inputs 
ORM - Below I will explain everywhere I have used ORM/ODM (Mongoose is an ODM (Object Data Modeling) library for MongoDB and is used consistently in my backend
get_reservations Endpoint:
When handling a GET request to retrieve reservations, the ODM/ORM is used to query the database for reservation data. In this case, Mongoose is the ODM tool that I am using in order to construct a query to fetch reservation documents from the database based on specified criteria. The retrieved data is then transformed into JavaScript objects and sent as a response to the client
createReservation Endpoint: 
For a POST request to create a new reservation, the ODM/ORM plays a significant role through the schema definition because I have defined the reservation schema using Mongoose's Schema defines the structure of reservation documents, specifying fields such as firstName, lastName, date, time, email, and phone. The reservation model created with Mongoose's ODM model function represents a blueprint for creating, updating, and querying reservation data. Additionally, the create method that is provided by Mongoose  is used to insert a new reservation document into the database. The method then maps JavaScript objects representing reservation data to MongoDB documents or relational database records, simplifying the creation process.
insertManyRestaurants Endpoint:
This endpoint uses ORM/ODM data handling as it uses the restaurant model, which is created with Mongoose’s model functional and allows the CRUD operations for the restaurant data.  Additionally, the insertMany method from Mongoose is an ODM/ORM that is used to streamline the process of inserting multiple restaurant documents into the database in a single operation, optimizing performance and reducing overhead.
updateReservation Endpoint:
This endpoint uses ORM as the reservation schema is defined using Mongoose's Schema class to specify the structure of reservation documents and fields that can be updated. Additionally, I used Mongoose ODM/ORM methods such as findIDAndUpdate in order to  locate the reservation document to be updated based on specified criteria. These methods encapsulate the logic for updating documents and handle the underlying database interactions. This ODM/ORM method used for updating reservations modifies the existing reservation document in the database according to the provided update data. This process abstracts away the complexities of manual document manipulation and ensures consistency in data handling.
deleteReservation Endpoint:
In order for any type of Delete request to remove a reservation from the database, the ODM/ORM layer facilitates efficient data deletion and abstraction of database operations. The ODM/ORM methods like findByIDAndDelete is used to locate and delete the reservation document based on specified criteria. This is used in order to handle the process of finding and removing documents from the database, simplifying the deletion process.

###### Deliverable 4: User interface built with data from the DB
For both requirement 1 and 2, you’ll notice that the data is being changed dynamically. For example, you’ll see that if you update a reservation or delete a reservation, when you return back to your reservations you will see that the reservations have been updated accordingly to match any changes that have been made. Data is sent to the backend, changed in the database, and then retrieved once again. Or looking at the restaurant interface, I have emphasized in my demo the GET endpoint that is used in order to retrieve the restaurants from the database in order to display the data on my user interface. 

###### Deliverable 5: Concurrency/Transaction
As my application currently is only created for a single user, I will be discussing the option in which multiple users can use the application concurrently. In such a version, I would set up an account/login system that will allow each person to be a different user and thereby have a set of reservations under their account. For each account, users can create reservations under their account, and update and delete their reservations according to the functionality that I have already created. Additionally, as a multi-user concurrent application, I would create options in which users can group up with others with an account if they would like to send a reservation to a friend, or make a group reservation, they will be able to do so. I would also have users have an email associated with their account so that they can receive an email confirmation of any reservations they have made. Finally, in a multi-user version I would introduce a feature in which users can see what restaurants have been most popular, include statistics on which restaurant has had the most crowd recently, and allow users the ability to comment and give reviews on restaurants. 

###### Deliverable 6:  Lessons Learned During Project Phase
Some lessons that I have learned during the project phase is that I've learned the importance of thorough planning and defining clear requirements before diving into development. It's crucial to have a detailed understanding of the application's functionality, user requirements, and potential challenges to build a robust and user-friendly system. Additionally, I've gained insights into the significance of data validation and sanitization to ensure the integrity and security of user inputs. Implementing proper validation measures, such as input sanitization and error handling, was essential to prevent unexpected behaviors and vulnerabilities, and this was something that I had not really considered in previous projects I have made. 
Reflecting on the development process, there are certain aspects I would change or improve in future iterations. One area for improvement is the user interface design and user experience (UI/UX). Enhancing the UI with intuitive navigation, responsive layouts, and visually appealing elements can enhance the overall user experience and make the application more engaging and user-friendly. Additionally, one thing I think I would change is not using MongoDB, as although it is a very well built database, I had limited capabilities in terms of being able to work with stored procedures and prepared statements as these are not supported by Mongo. 

###### Deliverable 7: Copy of the Code
Github Link: https://github.com/rjagana/FINALProject348.git


