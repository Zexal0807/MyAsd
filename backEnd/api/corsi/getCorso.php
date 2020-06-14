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
        require_once 'backEnd/api/corsi/canEditCorso.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("*")
            ->from("corsi")
            ->where("id", "=", $data['id'])
            ->execute();

        if(sizeof($ret) == 1){
            $ret = $ret[0];
            $ret['orari'] = $DB->select("*")
                ->from('orari')
                ->where("idCorso", "=", $data['id'])
                ->execute();

            $ret['data_inizio'] = date("d/m/Y", strtotime($ret['inizio']));
            $ret['data_fine'] = date("d/m/Y", strtotime($ret['fine']));

            $ret['modificabile'] = canEditCorso::api(['id' => $ret['id']]);

            $ret['iscritti'] = $DB->select("*")
                ->from("iscritticorso")
                ->where("idCorso", "=", $data['id'])
                ->execute();
        
            return $ret;
        }
    }
}