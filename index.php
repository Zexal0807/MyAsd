<?php
require 'backEnd/Zexarel/loader.php';

require 'backEnd/classes/CRUDuscite.php';
require 'backEnd/classes/CRUDentrate.php';
require 'backEnd/classes/CRUDcorsi.php';
require 'backEnd/classes/CRUDorari.php';

session_start();
ZRoute::get("/", function (){
	include "frontEnd/app.html";
});

ZRoute::get("/logout", function ($data){
	$_SESSION = [];
	redirect("/");
});

ZRoute::get("/load-file/<id>", function ($data){
	require_once 'backEnd/classes/Database.php';
	$DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

	$ret = $DB->select("*")
		->from("file")
		->where("id", "=", $data['id'])
		->execute();
		
	if(sizeof($ret) == 1){
		require_once 'backEnd/Zexarel/class/ZDownloader/ZDownloader.php';
		$ext = substr($ret[0]['nome'], find(".", $ret[0]['nome']) + 1);
		header("Content-type: ".ZDownloader::$MIME_TYPE[$ext]);
		header("Content-Disposition: attachment; filename=".$ret[0]['nome']);
		ob_clean();
		flush();
		echo $ret[0]['data'];
	}
});

require 'backEnd/api.php';

ZRoute::listen();

?>
