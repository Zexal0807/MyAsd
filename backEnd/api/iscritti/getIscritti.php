<?php
class getIscritti{

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("anagrafiche.idIscritto AS id", "anagrafiche.cognome", "anagrafiche.nome", "DATE_FORMAT(anagrafiche.data_nascita, '%d/%m/%Y') AS data_nascita", "anagrafiche.codice_fiscale", "anagrafiche.foto")
            ->from("iscritti")
            ->innerJoin("anagrafiche", "iscritti.id", "=", "anagrafiche.idIscritto")
            ->orderBy("cognome, nome")
            ->execute();
        
        return $ret;
    }
}