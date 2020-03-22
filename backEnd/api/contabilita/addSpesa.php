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
            "type" => "numeric",
            "required" => true
        ],
        [
            'name' => "tipoUscita",
            "type" => "numeric",
            "required" => true
        ],
        [
            'name' => "descrizione",
            "type" => "text",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $DB->insert("uscite")
            ->value(null, $data['data'], 1, $data['importo'], $data['tipoUscita'], $data['descrizione'], null)
            ->execute();

        return true;
    }
}