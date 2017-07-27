<?php 
if(isset($_POST["name"]) && $_POST["name"] != "" && isset($_POST["pasw"]) && $_POST["pasw"] != "") {
	$dbConnection = pg_connect(getenv("DATABASE_URL")) or die('Login server offline!');
	$query="SELECT id FROM users WHERE name=$1 AND password=$2";
	$id = pg_query_params($query, array($_POST["name"], /*"fe453@^#/f*5%$3dw99a9/*//*2sqdw./adw2'".*/$_POST["pasw"]/*."#*fhm3/98d483d@4D4d949w4D@%#9*+#@#+56d3"*/));
	$id = pg_fetch_array($id)[0];
	if($id) {
		$token = md5(uniqid(mt_rand(), true));
		$UPDATE =pg_query_params("UPDATE users SET token=$1 WHERE name=$2 AND password=$3", array($token, $_POST["name"], /*"fe453@^#/f*5%$3dw99a9/*//*2sqdw./adw2'".*/$_POST["pasw"]/*."#*fhm3/98d483d@4D4d949w4D@%#9*+#@#+56d3"*/)) or die('Failed to generate token!');
		echo($token);
	} else {
		die('Invalid name or password!');
	}
} else {
	header( 'Location: index.html' ) ;  
}
?>