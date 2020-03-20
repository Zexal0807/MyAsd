<?php
class elencoCorsi{

    public static $fx = 6;

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        
        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);
        $ret = $DB->select("*", "inizio > NOW() AS modificabile")
            ->from("corsi")
            ->orderBy("modificabile, inizio DESC")
            ->execute();

        foreach($ret as &$v){
            $v['orari'] = $DB->select("*")
                ->from("orari")
                ->where("idCorso", "=", $v['id'])
                ->execute();
        }
        
        return $ret;
    }
}