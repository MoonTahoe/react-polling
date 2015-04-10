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
* Join as speaker link on audience
* Speaker form with title filed CSS
* Join as speaker
* Emit and Handle Speaker Details (name, title)
    * Display Name and Title
    * Hide Speaker Link
* Handle Speaker Disconnect

Attendance and Pinging
-----------------------
* Add Attendance Table
* Link to Audience Connections and Disconnections
* Add Ping Button and Style
* Ping Audience Member

Asking Questions
----------------
* Incorporate Question JSON (Array, not hash)
* Add Question Selection Component
* Ask Question
* Questions show on student screens

Answering Questions
--------------------
* emit student answer
* navigate back to welcome screen
    * Display audience answers 0/6, 10/10, etc...

Graphing Results
-----------------
* select auto d3 bar graph chart components
* Bar Graph Sample Data Set
* Add Bar Graph Socket and change data
* Add Student Count Component

Deliver
-------
* Publish Repository
* Setup Heroku App
* Setup Travis for deployment
* Deploy Application
* Create Course TOC
* Create Overview Video
* Deliver everything in an email

Enhance
-------
* Deal with Auto-rejoin Join form flicker (Fade-In)
* Better Bootstrap those components
* Display audience count component on speaker question
* When all questions are answered grey out speaker question
* Save Question Data Results and get back to it
* Add Pie Chart Scoreboard Route