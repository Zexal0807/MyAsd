<?php
class getDatiIscritto{

    public static $schema = [
        [
            "name" => "id",
            "type" => "int",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("*")
            ->from("iscritti")
            ->where("id", "=", $data['id'])
            ->execute();

        if(sizeof($ret) != 1){
            header("HTTP/1.0 404 Not Found");
            return;
        }

        $retu = [
            "data" => [],
            "doc" => []
        ];

        $ret = $DB->select(
            "LOWER(email) AS email",
            "telefono",

            "nome",
            "cognome",
            "sesso",
            "luogo_nascita",
            "provincia_nascita",
            "DATE_FORMAT(data_nascita, '%d/%m/%Y') AS data_nascita",
            "UPPER(codice_fiscale) AS codice_fiscale",
            "luogo_residenza",
            "cap_residenza",
            "provincia_residenza",
            "via_residenza",
            "numero_residenza",

            "tipo_potesta",
            "nome_genitore",
            "cognome_genitore",
            "sesso_genitore",
            "luogo_nascita_genitore",
            "provincia_nascita_genitore",
            "DATE_FORMAT(data_nascita_genitore, '%d/%m/%Y') AS data_nascita_genitore",
            "UPPER(codice_fiscale_genitore) AS codice_fiscale_genitore",
            "luogo_residenza_genitore",
            "cap_residenza_genitore",
            "provincia_residenza_genitore",
            "via_residenza_genitore",
            "numero_residenza_genitore",

            "cittadino_italiano",
            "DATE_FORMAT(data_cittadino_italiano, '%d/%m/%Y') AS data_cittadino_italiano",

            "foto",
            "foto_codice_fiscale",
            "foto_codice_fiscale_genitore"
        )
            ->from("anagrafiche")
            ->where("idIscritto", "=", $data['id'])
            ->execute();
        
        $retu['data'] = $ret[0];

        $sql = 'SELECT id, nome, creazione, DATE_FORMAT(creazione, "%d/%m/%Y") AS data_creazione
            FROM file
            WHERE id IN (';
            
            if($retu['data']['foto'] != NULL)
                $sql .= $retu['data']['foto'].", ";
            if($retu['data']['foto_codice_fiscale'] != NULL)
                $sql .= $retu['data']['foto_codice_fiscale'].", ";
            if($retu['data']['foto_codice_fiscale_genitore'] != NULL)
                $sql .= $retu['data']['foto_codice_fiscale_genitore'].", ";

            $sql = substr($sql, 0, -2).') OR id IN (
                SELECT idFile 
                FROM tesseramenti
                WHERE idIscritto = '.$data['id'].'
            )';
        $retu["doc"] = $DB->executeSql($sql);

        usort($retu['doc'], "cmp");
        
        return $retu;
    }
}

        
function cmp($a, $b){
    return ($a['creazione'] > $b['creazione']) ? -1 : 1;
}