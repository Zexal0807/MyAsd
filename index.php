<?php
require 'backEnd/Zexarel/loader.php';

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
require 'backEnd/classes/CRUDcorsi.php';
require 'backEnd/classes/CRUDorari.php';
require 'backEnd/api.php';
ZRoute::listen();

?>
