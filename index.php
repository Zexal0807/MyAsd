<?php
require 'backEnd/Zexarel/loader.php';

require 'backEnd/classes/VLKDatabase.php';
require 'backEnd/classes/Database.php';

session_start();

ZRoute::get("/", function (){
	include "frontEnd/app.html";
});

/*
	@input:
		username,
		password,
		rimaniConnesso???
*/
ZRoute::post("/login", function ($data){
	$DB = new VLKDatabase();
	$ret = $DB->select(
			"vlk_utenti.id", 
			"vlk_utenti.username", 
			"vlk_utenti.idAsd", 
			"vlk_asd.host AS db_host", 
			"vlk_asd.user AS db_user", 
			"vlk_asd.password AS db_pasw", 
			"vlk_asd.db AS db_db"
		)
		->from("vlk_utenti")
		->innerJoin("vlk_asd", "vlk_asd.id", "=", "vlk_utenti.idAsd")
		->where("vlk_utenti.username", "=", $data['username']," AND")
		->where("vlk_utenti.password", "=", md5($data['password']))
		->execute();
	
	if(sizeof($ret) == 0){
		header("HTTP/1.0 404 Not Found");
		exit;
	}
	if(sizeof($ret) != 1){
		header("HTTP/1.0 404 Not Found");
		exit;
	}else{
		$ret = $ret[0];
		$_SESSION['id'] = $ret['id'];
		$_SESSION['idAsd'] = $ret['idAsd'];
		$_SESSION['db_host'] = $ret['db_host'];
		$_SESSION['db_user'] = $ret['db_user'];
		$_SESSION['db_pasw'] = $ret['db_pasw'];
		$_SESSION['db_db'] = $ret['db_db'];

		header("HTTP/1.0 200 Ok");
		exit;
	}
});
/*
	@Input
		/
*/
ZRoute::get("/logout", function ($data){
	$_SESSION = [];
	redirect("/");
});
/*
	@Input
		/
	@Output
		id??
		username
		privilegi
			tipoFunzione
				funzione
*/
ZRoute::post("/getUserData", function ($data){
	if(isset($_SESSION['id'])){
		$DB = new VLKDatabase();
		$ret = $DB->select(
			"vlk_privilegi.idUtente AS id", 
			"vlk_utenti.username", 

			"vlk_tipofunzioni.id AS tid", 
			"vlk_tipofunzioni.nome AS tnome",
			"vlk_tipofunzioni.descrizione AS tdescrizione", 
			"vlk_tipofunzioni.icon AS ticon", 
			"vlk_tipofunzioni.url AS turl", 

			"vlk_funzioni.id AS fid", 
			"vlk_funzioni.nome AS fnome",
			"vlk_funzioni.descrizione AS fdescrizione", 
			"vlk_funzioni.url AS furl"
		)
		->from("vlk_privilegi")
		->innerJoin("vlk_funzioni", "vlk_privilegi.idFunzione", "=", "vlk_funzioni.id")
		->innerJoin("vlk_tipofunzioni", "vlk_funzioni.idTipoFunzione", "=", "vlk_tipofunzioni.id")
		->innerJoin("vlk_utenti", "vlk_privilegi.idUtente", "=", "vlk_utenti.id")
		->where("vlk_privilegi.idUtente", "=", $_SESSION['id'])
		->execute();

		$retu["id"] = $ret[0]['id'];
		$retu["username"] = $ret[0]['username'];
		$retu["funzioni"] = [];
		
		foreach($ret as $k => $v){
			if(!isset($retu['funzioni'][$v["tid"]])){
				$tmp['idTipoFunzione'] = $v["tid"];
				$tmp['nome'] = $v["tnome"];
				$tmp['descrizione'] = $v["tdescrizione"];
				$tmp['icon'] = $v["ticon"];
				$tmp['url'] = $v["turl"];
				$tmp['sub'] = [];

				$retu['funzioni'][$v["tid"]] = $tmp;
			}
			$tmp = [];
			$tmp['idFunzione'] = $v["fid"];
			$tmp['nome'] = $v["fnome"];
			$tmp['descrizione'] = $v["fdescrizione"];
			$tmp['url'] = $v["furl"];

			$retu['funzioni'][$v["tid"]]['sub'][] = $tmp;
		}
		header('Content-Type: application/json');
		echo json_encode($retu);
	}else{
		header("HTTP/1.0 404 Not Found");
		exit;
	}
});


ZRoute::listen();

?>
