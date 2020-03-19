<?php

class Api {
    public static $API_LIST = [
        "login" => "login.php",
        "getUserData" => "getUserData.php"
    ];
}

function api($name, $data){
    if(array_key_exists($name, Api::$API_LIST)){
        header('Content-Type: application/json');
        require("api/".Api::$API_LIST[$name]);
        $sc = new ValidatorSchema();
        $sc->validate($name::$schema, $data);
        if($sc->validated){
            echo json_encode($name::api($data));
        } else {
            header("HTTP/1.0 404 Not Found");
            echo json_encode($sc->getErrors());
        }
    }else{
        header("HTTP/1.0 404 Not Found");
    }
}