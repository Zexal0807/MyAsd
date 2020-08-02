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
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("*")
            ->from("anagrafiche")
            ->where("codice_fiscale", "=", $data['c'])
            ->execute()[0];
        
        return $ret;
    }
}