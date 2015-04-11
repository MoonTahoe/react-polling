Socket IO Polling with React
============================
React view only app with socket io.

Connection and Header
---------------------
* *~~express page~~*
* *~~socket outline~~*
* *~~APP.getInitialState - route~~*
* *~~Initial State to Header~~*
    * *~~connection status~~*
    * *~~audience count css~~*
    * *~~instructor name css~~*
    * *~~Move bootstrap to css~~*
    * *~~Further Decompose Header Components?~~*
* *~~Initial State Header - disconnect~~*
* *~~Make Sure Connection Refreshes~~*
    * *~~Page Refresh~~*
    * *~~Server Shutdown~~*

Joining as Audience Member
--------------------------
* *~~Incorporate Routing~~*
    * *~~Home : Placeholder~~*
    * *~~Speaker : Placeholder~~*
    * *~~Score Graph : Placeholder~~*
* *~~Audience Form CSS and Validation~~*
* *~~Join Button Click~~*
* *~~Join Socket Complete~~*
* *~~Show Welcome View for joined audience member~~*
* *~~Auto Join Members on Refreshed Instance~~*
* *~~Ask Internet about setting child props from state~~*

Joining as Speaker
------------------
* *~~Join as speaker link on audience~~*
* *~~Speaker form with title filed CSS~~*
* *~~Join as speaker~~*
* *~~Emit and Handle Speaker Details (name, title)~~*
    * *~~Display Name and Title~~*
    * *~~Hide Speaker Link~~*
* *~~Handle Speaker Disconnect~~*

Attendance and Pinging
-----------------------
* *~~Add Attendance Table~~*
* *~~Link to Audience Connections and Disconnections~~*
* *~~Add Ping Button and Style~~*
* *~~Ping Audience Member~~*

Asking Questions
----------------
* *~~Incorporate Question JSON (Array, not hash)~~*
* *~~Add Question Selection Component~~*
* *~~Ask Question~~*
* *~~Questions show on student screens~~*

Answering Questions
--------------------
* *~~emit student answer~~*
* *~~navigate back to welcome screen~~*

Graphing Results
-----------------
* Create Scoreboard Component
* Display No Question State
* Display Current Question
* Listen for answers display x out of y x/y
* select auto d3 bar graph chart components
* Bar Graph Sample Data Set
* Add Bar Graph Socket and change data

Deliver
-------
* Setup basic test framework for future testing
* Publish Repository
* Move Enhancements to Issues
* Generate Readme.md Documentation
* Setup Heroku App
* Setup Travis for deployment
* Deploy Application
* Create Course TOC
* Create Overview Video
* Deliver everything in an email

Enhance
-------
* Bug : Answer Question
	a. Connect speaker and 3 audience
	b. Ask a question
	c. Answer all three
	d. Refresh One
	e. The question gets asked for the other two
* Speaker Leaving in middle of question
	a. should return all screens to welcome
* Speaker Refreshing in the middle of a question
    a. should return all screens back to current question
* Member refreshing unanswered question
	a. should show question
* Member refreshing answered question
	a. should show answer
* server restarting mid question
	a. Should return All screens to current question state    
* Each Component listens for specific sockets
* Add Prop Type validation to views
* Use Mixins to reduce redundancy
* Deal with Auto-rejoin Join form flicker (Fade-In)
* Better Bootstrap those components
* Display audience count component on speaker question
* When all questions are answered grey out speaker question
* Save Question Data Results and get back to it
* Add Pie Chart Scoreboard Route
* Unit Testing : Each View, Server Sockets, Server
* Cucumber Testing : Acceptance Testing