<?php

class Api {
    public static $API_LIST = [
        "login" => "login.php",
        "getUserData" => "getUserData.php",
        "userFunction" => "userFunction.php",
        "datiAsd" => "config/datiAsd.php",                          //2
        "getTipoEntrate" => "contabilita/getTipoEntrate.php",
        "addTipoEntrate" => "contabilita/addTipoEntrate.php",       //3
        "getTipoUscite" => "contabilita/getTipoUscite.php",
        "addTipoUscite" => "contabilita/addTipoUscite.php",         //4

        
        //--------------Corsi
        "getCorsi" => "corsi/getCorsi.php",                         //6
        "getCorso" => "corsi/getCorso.php",                         //15
        "deleteCorso" => "corsi/deleteCorso.php",                   //14
        "addCorso" => "corsi/addCorso.php",                         //12
        "editCorso" => "corsi/editCorso.php",                       //13

        "addIscrizione" => "corsi/addIscrizione.php",               //15
        




        "getAssociati" => "iscritti/getAssociati.php",
        "getSoci" => "iscritti/getSoci.php",
        "getTesserati" => "iscritti/getTesserati.php",
        "getDatiIscritto" => "iscritti/getDatiIscritto.php",

        "addPagamentoCorso" => "contabilita/addPagamentoCorso.php",
        "addSpesa" => "contabilita/addSpesa.php",                   //8
        "getMovimenti" => "contabilita/getMovimenti.php"            //10
        
        
    ];
}

foreach(Api::$API_LIST as $k => $v){
    ZRoute::post("/".$k, function(){});
}

ZRoute::addMiddleware(function($data){
    $req = new Request();
    if(find("zcrud", $req->getUrl()) != -1){
        //è una crud -> frega cazzi
    }elseif($req->getMethod() == "POST"){
        if(array_key_exists($req->getUrl(), Api::$API_LIST)){

            $className = $req->getUrl();
            $classPath = "api/".Api::$API_LIST[$className];
            
            header('Content-Type: application/json');
            require($classPath);

            if(property_exists($className, 'fx')){
                require 'classes/VLKDatabase.php';
                if(isset($_SESSION['id'])){
                    $DB = new VLKDatabase();
                    $ret = $DB->selectAll()
                        ->from("vlk_privilegi")
                        ->where("idUtente", "=", $_SESSION['id'], " AND")
                        ->where("idFunzione", "=", $className::$fx)
                        ->execute();
                    if(sizeof($ret) != 1){
                        header("HTTP/1.0 403 Forbidden");
                        return false;
                    }
                }else{
                    header("HTTP/1.0 403 Forbidden");
                    return false;
                }
            }
            $sc = new ValidatorSchema();
            $sc->validate($className::$schema, $data);
            if($sc->validated){
                echo json_encode($className::api($data));
            } else {
                header("HTTP/1.0 402 Not Valid");
                return false;
            }
        }else{
            header("HTTP/1.0 404 Api Not Found");
            return false;
        }
    }
    return true;
});
