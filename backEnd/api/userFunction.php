<?php
class userFunction{

    public static $schema = [
        [
            "name" => "id",
            "type" => "numeric",
            "required" => true
        ]
    ];

    public static function api($data){
        require 'backEnd/classes/VLKDatabase.php';
        
        if(isset($_SESSION['id'])){
            $DB = new VLKDatabase();
            $ret = $DB->select("*")
                ->from("vlk_privilegi")
                ->where("idUtente", "=", $_SESSION['id'], "AND")
                ->where("idFunzione", "=", $data['id'])
                ->execute();
    
            if(sizeof($ret) > 0){
                return true;
            }else{
                header("HTTP/1.0 402 Not Valid");
                exit;
            }    
        }else{
            header("HTTP/1.0 404 Not Found");
            exit;
        }
    }
}