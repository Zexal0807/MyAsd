<?php
class getCorso{

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

        $ret = $DB->select("*", "1 AS modificabile")
            ->from("corsi")
            ->where("id", "=", $data['id'])
            ->execute();

        if(sizeof($ret) == 1){
            $ret = $ret[0];
            $ret['orari'] = $DB->select("*")
                ->from('orari')
                ->where("idCorso", "=", $data['id'])
                ->execute();

            $ret['iscritti'] = $DB->select("anagrafiche.idIscritto AS id", "anagrafiche.cognome", "anagrafiche.nome", "DATE_FORMAT(anagrafiche.data_nascita, '%d/%m/%Y') AS data_nascita", "anagrafiche.codice_fiscale", "anagrafiche.foto")
                ->from("iscritti")
                ->innerJoin("anagrafiche", "iscritti.id", "=", "anagrafiche.idIscritto")
                ->innerJoin("iscrizioni", "iscrizioni.idIscritto", "=", "iscritti.id")
                ->where("iscrizioni.idCorso", "=", $data['id'])
                ->execute();
        



            return $ret;
        }
    }
}