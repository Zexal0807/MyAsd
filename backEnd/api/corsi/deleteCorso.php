<?php
class deleteCorso{

    public static $fx = 14;

    public static $schema = [
        [
            'name' => "id",
            "type" => "int",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        require_once 'backEnd/api/corsi/canEditCorso.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        if(canEditCorso::api(['id' => $data['id']])){
            $ret = $DB->delete("orari")
                ->where("idCorso", "=", $data['id'])
                ->execute();

            $ret1 = $DB->delete("corsi")
                ->where("id", "=", $data['id'])
                ->execute();
                
            return $ret && $ret1;
        }
        return false;
    }
}