<?php
require 'backEnd/Zexarel/loader.php';

session_start();

ZRoute::get("/", function (){
	include "frontEnd/app.html";
});

require 'backEnd/api.php';

ZRoute::get("/logout", function ($data){
	$_SESSION = [];
	redirect("/");
});

ZRoute::listen();

?>
