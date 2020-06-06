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
        $c = (new CRUDcorsi())->insert([
            "nome" => $data['nome'], 
            "inizio" => $data['inizio'], 
            "fine" => $data['fine'], 
            "costo" => $data['costo']
        ]);
        foreach($data['orari'] as $o){
            (new CRUDorari())->insert([
                "idCorso" => $c['insertId'], 
                "inizio" => (new Datetime($o['inizio']))->format("H:i:s"), 
                "fine" => (new Datetime($o['fine']))->format("H:i:s"),
                "giorno" => $o['giorno']
            ]);
        }
        return true;
    }
}