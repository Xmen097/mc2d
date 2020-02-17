<?php 
if(isset($_POST["name"]) && isset($_POST["pasw"]) && isset($_POST["type"])) {
	if($_POST["type"] == "login") {
		$dbConnection = pg_connect(getenv("DATABASE_URL")) or die('Login server offline');
		$query="SELECT id FROM users WHERE name=$1 AND password=$2";
		$id = pg_query_params($query, array($_POST["name"], hash("sha256", "fe453@^#/f*5%$3dw99a9/*//*2sqdw./adw2'".$_POST["pasw"]."#*fhm3/98d483d@4D4d949w4D@%#9*+#@#+56d3")));
		$id = pg_fetch_array($id)[0];
		if($id) {
			$token = md5(uniqid(mt_rand(), true));
			$UPDATE =pg_query_params("UPDATE users SET token=$1 WHERE name=$2 AND password=$3", array($token, $_POST["name"], hash("sha256", "fe453@^#/f*5%$3dw99a9/*//*2sqdw./adw2'".$_POST["pasw"]."#*fhm3/98d483d@4D4d949w4D@%#9*+#@#+56d3"))) or die('Failed to generate token');
			echo($token);
		} else {
			die('Invalid name or password');
		}
	} else if($_POST["type"] == "create") {
		if(strlen($_POST['name']) < 5 || strlen($_POST['pasw']) < 5) {
			die("Name or password is too short (<5)");
		}  else if(strlen($_POST['name']) > 10) {
			die("Name is too long");
		} else if(preg_replace("/[^A-Za-z0-9]/", '', strtolower($_POST['name'])) == $_POST['name']) {
			$dbConnection = pg_connect(getenv("DATABASE_URL")) or die('Login server offline');
			$result = pg_query_params("SELECT name FROM users WHERE name=$1", array($_POST["name"]));
			if(pg_fetch_array($result)[0]) {
				die("User with that name already exists");
			}
			$query="INSERT INTO users (name, password, id) VALUES ($1, $2, 1)";
			pg_query_params($query, array($_POST["name"], hash("sha256", "fe453@^#/f*5%$3dw99a9/*//*2sqdw./adw2'".$_POST["pasw"]."#*fhm3/98d483d@4D4d949w4D@%#9*+#@#+56d3")));
			$token = md5(uniqid(mt_rand(), true));
			$UPDATE = pg_query_params("UPDATE users SET token=$1 WHERE name=$2 AND password=$3", array($token, $_POST["name"], hash("sha256", "fe453@^#/f*5%$3dw99a9/*//*2sqdw./adw2'".$_POST["pasw"]."#*fhm3/98d483d@4D4d949w4D@%#9*+#@#+56d3"))) or die('Failed to generate token');
			echo($token);			
		} else {
			die("Names can only contain alphanumeric characters");
		}
	}
} else if(isset($_POST["name"]) && isset($_POST["token"]) && isset($_POST["salt"])) {
	$dbConnection = pg_connect(getenv("DATABASE_URL")) or die('Login server offline');
	$query="SELECT token FROM users WHERE name=$1";
	$token = pg_query_params($query, array($_POST["name"]));
	$token = pg_fetch_array($token)[0];
	if($token && hash("sha256", $token.$_POST["salt"]) == $_POST["token"]) { 
		echo("true");
	} else {
		echo("false");
	}
} else if(isset($_POST["getVersion"])) {
	echo("1.0.18");
} else {
	header('Location: index.html') ;  
	header("Cache-Control: no-cache, must-revalidate");
}
?>
