<?php
	$db_server   = "localhost";
	$db_username = "mb_login";
	$db_password = "mb_login";
	$db_database = "mb";

	try{
   		$mb_db = new PDO("mysql:host={$db_server};dbname={$db_database}", $db_username, $db_password);
		$mb_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch(PDOException $e){
		echo $e->getMessage();
	}
?>