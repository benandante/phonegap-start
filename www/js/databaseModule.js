
//open database
 function onDeviceReady(){
	navigator.notification.alert("PhoneGap is working!!");
	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(populateDB, errorCB, successCB);
	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	
 }
 function gotFS(fileSystem) {
     fileSystem.root.getFile("a.txt", null, gotFileEntry, fail);
 }
 function gotFileEntry(fileEntry) {
     fileEntry.file(gotFile, fail);
 }

 function gotFile(file){
     readAsText(file);
 }
 function readAsText(file) {
     var reader = new FileReader();
     reader.onloadend = function(evt) {
        alert("Read as text");
        alert(evt.target.result);
     };
     reader.readAsText(file);
 }

 function fail(evt) {
     console.log(evt.target.error.code);
 }
 // Populate the database 
 function populateDB(tx) {
      tx.executeSql('DROP TABLE IF EXISTS TABLEFOODS');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TABLEFOODS (id unique, data)');
      tx.executeSql('INSERT INTO TABLEFOODS (id, data) VALUES (1, "Apple")');
      tx.executeSql('INSERT INTO TABLEFOODS (id, data) VALUES (2, "Rice")');
 }
 
 function createDB(tx) {
     tx.executeSql('DROP TABLE IF EXISTS TABLEFOODS');
     tx.executeSql('CREATE TABLE IF NOT EXISTS TABLEFOODS (id unique, data)');
     
}
 
// Transaction success callback
 function successCB() {
     var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
     db.transaction(queryDB, errorCB);
 }
 
 // Query the database
 function queryDB(tx) {
     tx.executeSql('SELECT * FROM TABLEFOODS', [], querySuccess, errorCB2);
 }

 // Query the success callback
 function querySuccess(tx, results) {
	 var len = results.rows.length;
   // this will be true since it was a select statement and so rowsAffected was 0
	 console.log("DEMO table: " + len + " rows found.");
     for (var i=0; i<len; i++){
        alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
     }
   // for an insert statement, this property will return the ID of the last inserted row
  alert("Last inserted row ID = " + results.insertId);
 }
 
 // Transaction error callback
 function errorCB2(tx, err) {
     alert("Error processing SQL2: "+err);
 }
 
 // Transaction error callback
 function errorCB(tx, err) {
     alert("Error processing SQL: "+err);
 }
     