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
        require_once 'backEnd/api/corsi/canEditCorso.php';

        if(canEditCorso::api(['id' => $data['id']])){
            $c = (new CRUDcorsi())->update([
                "id" => $data['id'], 
                "nome" => $data['nome'], 
                "inizio" => $data['inizio'], 
                "fine" => $data['fine'], 
                "costo" => $data['costo']
            ]);

            $db  = (new CRUDorari())->connect();
            $db->query("DELETE FROM orari WHERE idCorso = ".$data['id']);

            foreach($data['orari'] as $o){
                (new CRUDorari())->insert([
                    "idCorso" => $data['id'], 
                    "giorno" => $o['giorno'],
                    "inizio" => (new Datetime($o['inizio']))->format("H:i:s"), 
                    "fine" => (new Datetime($o['fine']))->format("H:i:s")
                ]);
            }

            return true;

        }
        return false;
    }
}