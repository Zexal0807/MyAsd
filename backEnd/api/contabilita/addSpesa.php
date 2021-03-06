<?php
class addSpesa{

    public static $fx = 8;

    public static $schema = [
        [
            'name' => "data",
            "type" => "date",
            "required" => true
        ],
        [
            'name' => "importo",
            "type" => "float",
            "required" => true
        ],
        [
            'name' => "tipoUscita",
            "type" => "int",
            "required" => true
        ],
        [
            'name' => "descrizione",
            "type" => "string",
            "required" => true
        ],
        [
            'name' => "cartaceo",
            "type" => "string",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $DB->insert("uscite")
            ->value(null, $data['data'], 1, $data['importo'], $data['tipoUscita'], $data['descrizione'], $data['cartaceo'], null)
            ->execute();

        return true;
    }
}