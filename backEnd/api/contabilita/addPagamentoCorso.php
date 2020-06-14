<?php
class addPagamentoCorso{

    public static $schema = [
        [
            'name' => "data",
            "type" => "date",
            "required" => true
        ],
        [
            'name' => "importo",
            "type" => "float",
            "required" => true
        ],
        [
            'name' => "descrizione",
            "type" => "string",
            "required" => true
        ],
        [
            'name' => "idIscritto",
            "type" => "int",
            "required" => true
        ],
        [
            'name' => "idCorso",
            "type" => "int",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("id")
            ->from("iscrizioni")
            ->where("idIscritto", "=", $data['idIscritto'], "AND")
            ->where("idCorso", "=", $data['idCorso'])
            ->execute();

        if(sizeof($ret) == 1){
            $ret = $ret[0]['id'];

            //20 => Entrate da pagamenti corso

            $id = $DB->insert("entrate")
                ->value(null, $data['data'], 1, $data['importo'], 20, $data['descrizione'], null, 1, null)
                ->execute();

            $ret = $DB->insert("pagamenti")
                ->value(null, $ret, $id)
                ->execute();
            if($ret){
                return true;
            }            
        }
        return false;
    }
}