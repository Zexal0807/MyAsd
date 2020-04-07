<?php
require 'backEnd/Zexarel/loader.php';
require 'backEnd/Zexarel/class/ZDatabase/ZCRUD.php';

session_start();

ZRoute::get("/", function (){
	include "frontEnd/app.html";
});

ZRoute::get("/logout", function ($data){
	$_SESSION = [];
	redirect("/");
});

require 'backEnd/classes/CRUDuscite.php';
require 'backEnd/classes/CRUDentrate.php';
require 'backEnd/api.php';
ZRoute::listen();

?>
