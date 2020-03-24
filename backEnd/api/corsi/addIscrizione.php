<?php
class addIscrizione{

    public static $fx = 15;

    public static $schema = [
        [
            'name' => "idCorso",
            "type" => "int",
            "required" => true
        ],
        [
            'name' => "data",
            "type" => "date",
            "required" => true
        ],
        [
            'name' => "idIscritto",
            "type" => "int",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $DB->insert("iscrizioni")
            ->value(null, $data['idIscritto'], $data['idCorso'], $data['data'])
            ->execute();

        return true;
    }
}