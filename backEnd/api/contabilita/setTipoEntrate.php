<?php
class setTipoEntrate{

    public static $fx = 4;

    public static $schema = [
        [
            'name' => "data",
            "type" => "array",
            "schema" => [
                [
                    'name' => "id",
                    "type" => "numeric",
                    "required" => true
                ],
                [
                    'name' => "descrizione",
                    "type" => "text",
                    "required" => true
                ]
            ]
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        
        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        foreach($data['data'] as $d){
            $DB->update("tipoEntrate")
                ->set("descrizione", $d['descrizione'])
                ->where("id", "=", $d['id'])
                ->execute();
        }
        return true;
    }
}