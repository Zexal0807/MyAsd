<?php
class getTipoPagamento{

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);
        $ret = $DB->select("*")
            ->from("tipopagamenti")
            ->orderBy("id")
            ->execute();

        return $ret;
    }
}