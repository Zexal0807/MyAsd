<?php

class Api {
    public static $API_LIST = [
        "login" => "login.php",
        "getUserData" => "getUserData.php",
        "datiAsd" => "config/datiAsd.php",
        "elencoCorsi" => "corsi/elencoCorsi.php",
        "addCorso" => "corsi/addCorso.php",
        "editCorso" => "corsi/editCorso.php",
        "deleteCorso" => "corsi/deleteCorso.php"
    ];
}

function api($name, $data){
    if(array_key_exists($name, Api::$API_LIST)){
        header('Content-Type: application/json');
        require("api/".Api::$API_LIST[$name]);
        if(auth($name)){
            $sc = new ValidatorSchema();
            $sc->validate($name::$schema, $data);
            if($sc->validated){
                echo json_encode($name::api($data));
            } else {
                header("HTTP/1.0 402 Not Valid");
                echo json_encode($sc->getErrors());
            }
        }else{
            header("HTTP/1.0 403 Forbidden");
        }
    }else{
        header("HTTP/1.0 404 Not Found");
    }
}

function auth($class){
    if(property_exists($class, 'fx')){
        require 'backEnd/classes/VLKDatabase.php';
        if(isset($_SESSION['id'])){
            $DB = new VLKDatabase();
            $ret = $DB->selectAll()
                ->from("vlk_privilegi")
                ->where("idUtente", "=", $_SESSION['id'], " AND")
                ->where("idFunzione", "=", $class::$fx)
                ->execute();
            if(sizeof($ret) != 1){
                return false;
            }
        }else{
            return false;
        }
    }
    return true;
}

foreach(Api::$API_LIST as $k => $v){
    ZRoute::post("/".$k, function($data){
        api((new Request())->getUrl(), $data);
    });
}