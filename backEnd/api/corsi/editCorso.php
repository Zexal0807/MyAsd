<?php
class editCorso{

    public static $fx = 13;

    public static $schema = [
        [
            'name' => "id",
            "type" => "int",
            "required" => true
        ],
        [
            'name' => "nome",
            "type" => "string",
            "required" => true
        ],
        [
            'name' => "inizio",
            "type" => "date",
            "required" => true
        ],
        [
            'name' => "fine",
            "type" => "date",
            "required" => true
        ],
        [
            'name' => "costo",
            "type" => "float",
            "required" => true
        ],
        [
            'name' => "rate",
            "type" => "numeric",
            "required" => true
        ],
        [
            'name' => "costoRata",
            "type" => "float",
            "required" => true
        ],
        [
            'name' => "orari",
            "type" => "array",
            "assoc" => false,
            "schema" => [
                "type" => "array",
                "assoc" => true,
                "schema" => [
                    [
                        'name' => "giorno",
                        "type" => "string",
                        "required" => true
                    ],
                    [
                        'name' => "inizio",
                        "type" => "time",
                        "required" => true
                    ],
                    [
                        'name' => "fine",
                        "type" => "time",
                        "required" => true
                    ]
                ]
            ]
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        require_once 'backEnd/api/corsi/canEditCorso.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        if(canEditCorso::api(['id' => $data['id']])){

            $ret = $DB->update("corsi")
                ->set("nome", $data['nome'])
                ->set("inizio", $data['inizio'])
                ->set("fine", $data['fine'])
                ->set("costo", $data['costo'])
                ->set("rate", $data['rate'])
                ->set("costoRata", $data['costoRata'])
                ->where("id", "=", $data['id'])
                ->execute();

            $ret = $DB->delete("orari")
                ->where("idCorso", "=", $data['id'])
                ->execute();

            foreach($data['orari'] as $o){
                $ret = $DB->insert("orari")
                    ->value(null, $data['id'], $o['giorno'], $o['inizio'], $o['fine'])
                    ->execute();
            }

            return true;

        }
        return false;
    }
}