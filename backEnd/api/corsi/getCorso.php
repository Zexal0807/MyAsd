<?php
class getCorso{

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

            $ret['iscritti'] = $DB->executeSql('SELECT
                sub.pagato AS pagato,
                sub.idCorso AS idCorso,
                sub.idIscritto AS id,
                sub.costo AS costo,
                anagrafiche.cognome AS cognome,
                anagrafiche.nome AS nome,
                DATE_FORMAT(
                    anagrafiche.data_nascita,
                    "%d/%m/%Y"
                ) AS data_nascita,
                anagrafiche.codice_fiscale AS codice_fiscale,
                anagrafiche.foto AS foto,
                IFNULL(sub.costo / sub.pagato, 0) AS perc
            FROM (
                SELECT
                    IFNULL(SUM(entrate.importo), 0) AS pagato,
                    iscrizioni.idCorso AS idCorso,
                    iscrizioni.idIscritto AS idIscritto,
                    iscrizioni.costo AS costo
                FROM
                    iscrizioni
                LEFT JOIN pagamenti ON pagamenti.idIscrizione = iscrizioni.id
                LEFT JOIN entrate ON pagamenti.idEntrata = entrate.id
                GROUP BY
                    pagamenti.idIscrizione,
                    iscrizioni.idIscritto
            ) AS sub
            INNER JOIN anagrafiche ON anagrafiche.idIscritto = sub.idIscritto
            WHERE sub.idCorso = '.$data['id']);
            
            return $ret;
        }
    }
}