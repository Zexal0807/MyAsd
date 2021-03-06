<?php
class getIscrivibiliCorso{

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

        $ret = $DB->executeSql('SELECT idIscritto AS id, cognome, nome
        FROM anagrafiche
        WHERE idIscritto NOT IN (
            SELECT idIscritto FROM iscrizioni WHERE idCorso = '.$data['id'].'
        )
        ORDER BY cognome, nome');
        
        return $ret;
    }
}