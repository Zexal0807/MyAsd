<?php
class addTipoEntrate{

    public static $fx = 4;

    public static $schema = [
        [
            "name" => "descrizione",
            "type" => "array",
            "assoc" => false,
            "schema" => [
                "type" => "string",
                "required" => true
            ]
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        
        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        foreach($data['descrizione'] as $d){
            $DB->insert("tipoentrate", "descrizione")
                ->value($d)
                ->execute();
        }
        return true;
    }
}