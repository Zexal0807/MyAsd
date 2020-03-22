<?php
class setTipoUscite{

    public static $fx = 5;

    public static $schema = [
        [
            'name' => "data",
            "type" => "array",
            "schema" => [
                [
                    'name' => "id",
                    "type" => "numeric"
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
            if($d['id'] != ''){
                $DB->update("tipouscite")
                    ->set("descrizione", $d['descrizione'])
                    ->where("id", "=", $d['id'])
                    ->execute();
            }else{
                $DB->insert("tipouscite", "descrizione")
                    ->value($d['descrizione'])
                    ->execute();
            }
        }
        return true;
    }
}