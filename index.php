<?php
require 'backEnd/Zexarel/loader.php';

require 'backEnd/api.php';

session_start();

ZRoute::get("/", function (){
	include "frontEnd/app.html";
});

ZRoute::post("/login", function ($data){
	api("login", $data);
});

ZRoute::get("/logout", function ($data){
	$_SESSION = [];
	redirect("/");
});

ZRoute::post("/getUserData", function ($data){
	api("getUserData", $data);
});

ZRoute::listen();

?>
