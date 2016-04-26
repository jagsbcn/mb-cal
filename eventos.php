<?php

	require_once 'mb_config_cli.php';

	$jsondata = array();
	$prueba = array();

	$mes = trim($_GET['mes']);

	$sql = "SELECT * FROM mb_evento WHERE MONTH(dia_inicio) = " . $mes;
	$result = mysqli_query($mb_db, $sql);

	$i = 0;
	while($row =mysqli_fetch_assoc($result)) {
    	$jsondata[$i] = $row;
    	$i++;
	}
    
    echo json_encode($jsondata);

    //mysqli_close($mb_db);
?>