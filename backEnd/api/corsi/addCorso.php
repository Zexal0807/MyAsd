<?php
class addCorso{

    public static $fx = 12;

    public static $schema = [
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
            "type" => "numeric",
            "required" => true
        ],
        [
            'name' => "rate",
            "type" => "numeric",
            "required" => true
        ],
        [
            'name' => "costoRata",
            "type" => "numeric",
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

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->insert("corsi")
            ->value(null, $data['nome'], $data['inizio'], $data['fine'], $data['costo'], $data['rate'], $data['costoRata'])
            ->execute();

        $id = $ret;

        foreach($data['orari'] as $o){
            $ret = $DB->insert("orari")
                ->value(null, $id, $o['giorno'], $o['inizio'], $o['fine'])
                ->execute();
        }

        return true;
    }
}