<?php
class getCorsoDetails{

    public static $fx = 15;

    public static $schema = [
        [
            "name" => "id",
            "type" => "int",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("*")
            ->from("corsi")
            ->where("id", "=", $data['id'])
            ->execute();

        if(sizeof($ret) == 1){
            $ret = $DB->executeSql('SELECT iscritti.id, cognome, nome
                FROM iscritti
                INNER JOIN anagrafiche ON iscritti.id = anagrafiche.idIscritto
                WHERE iscritti.id NOT IN (
                    SELECT idIscritto
                    FROM iscrizioni
                    WHERE idCorso = '.$data['id'].'
                )
                ORDER BY cognome, nome');
            return $ret;
        }
        return [];
    }
}