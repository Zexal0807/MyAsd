<?php
class getTesserati{

    public static $schema = [
        [
            "name" => "anno",
            "type" => "int",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("*")
            ->from("gettesserati")
            ->where("anno", "=", $data['anno'])
            ->execute();
        
        return $ret;
    }
}