<?php 
if(isset($_POST["name"]) && $_POST["name"] != "" && isset($_POST["pasw"]) && $_POST["pasw"] != "") {
	$dbConnection = pg_connect(getenv("DATABASE_URL")) or die('Could not connect: ' . pg_last_error());
	$query="SELECT id FROM users WHERE name=$1 AND password=$2";
	$id = pg_query_params($query, array($_POST["name"], /*"fe453@^#/f*5%$3dw99a9/*//*2sqdw./adw2'".*/$_POST["pasw"]/*."#*fhm3/98d483d@4D4d949w4D@%#9*+#@#+56d3"*/)) or die('Query failed: ' . pg_last_error());
	echo("id: ".$id);
} else {
	header( 'Location: index.html' ) ;  
}
?>