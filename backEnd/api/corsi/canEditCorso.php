<?php
class canEditCorso{

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        
        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("COUNT(iscrizioni.id) AS iscritti", "corsi.inizio <= NOW() AS iniziato")
            ->from("iscrizioni")
            ->rightJoin("corsi", "iscrizioni.idCorso", "=", "corsi.id")
            ->where("corsi.id", "=", $data['id'])
            ->groupBy("iscrizioni.idCorso")
            ->execute();

        if(sizeof($ret) != 1)
            return false;

        $ret = $ret[0];
        if($ret['iscritti'] == 0 && !$ret['iniziato'])
            return true;
        return false;
    }
}