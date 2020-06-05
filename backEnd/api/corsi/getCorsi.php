<?php
class getCorsi{

    public static $fx = 6;

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        require_once 'backEnd/api/corsi/canEditCorso.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);
        $ret = $DB->select("id", "nome", "DATE_FORMAT(inizio, '%d/%m/%Y') AS data_inizio", "DATE_FORMAT(fine, '%d/%m/%Y') AS data_fine")
            ->from("corsi")
            ->orderBy("inizio DESC, id")
            ->execute();

        return $ret;
    }
}