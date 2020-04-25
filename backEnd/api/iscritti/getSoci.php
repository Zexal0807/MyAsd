<?php
class getSoci{

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
            ->from("tesseramenti")
            ->innerJoin("anagrafiche", "tesseramenti.idIscritto", "=", "anagrafiche.idIscritto")
            ->where("tesseramenti.idTipoTesseramento", "<", 0, "AND")
            ->where("YEAR(tesseramenti.data)", "=", $data['anno'])
            ->execute();
        

        return $ret;
    }
}