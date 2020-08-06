<?php
class getAnagrafica{

    public static $schema = [
        [
            "name" => "c",
            "type" => "string",
            "required" => true
        ]
    ];

    public static function api($data){
        require 'backEnd/classes/VLKDatabase.php';
        require_once 'backEnd/classes/Database.php';

        $DB = new VLKDatabase();
        $ret = $DB->select("host", "user", "password", "db")
            ->from("vlk_asd")
            ->where("id", "=", $data['asd'])
            ->execute();
        //Controllo che l'asd sia quella corrispondente
        if(sizeof($ret) != 1){
            header("HTTP/1.0 404 Not Found");
            exit;
        }else{
            $ret = $ret[0];
            $asd = new Database($ret['host'], $ret['user'], $ret['password'], $ret['db']);

            $ret = $asd->select("*")
            ->from("anagrafiche")
            ->where("codice_fiscale", "=", $data['c'])
            ->execute();
    
            if(sizeof($ret) == 1){
                return $ret[0];
            }else{
                header("HTTP/1.0 404 Not Found");
                exit;
            }

        }        
    }
}