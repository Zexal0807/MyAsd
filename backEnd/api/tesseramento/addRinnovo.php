<?php
class addRinnovo{

    public static $schema = [
        
    ];

    public static function api($data){
        require 'backEnd/classes/VLKDatabase.php';
        require_once 'backEnd/classes/Database.php';

        $DB = new VLKDatabase();
        $ret = $DB->select("host", "user", "password", "db")
            ->from("vlk_asd")
            ->where("id", "=", $data['asd'])
            ->execute();
        //Controllo che l'asd sia quella corrispondente
        if(sizeof($ret) != 1){
            header("HTTP/1.0 404 Not Found");
            exit;
        }else{
            //echo "Asd corretta \n";
            $ret = $ret[0];
            $asd = new Database($ret['host'], $ret['user'], $ret['password'], $ret['db']);
            //controllo che il record esista
            $ret = $asd->select("*")
                ->from("anagrafiche")
                ->where("codice_fiscale", "=", $data['codice_fiscale'], "AND ")
                ->where("idIscritto", "=", $data['idIscritto'])
                ->execute();

            if(sizeof($ret) == 1){
                //echo "Anagrafica unica\n";
                $id = $ret[0]['id'];

                //Sistemamento dei dati per le anagrafiche
                $age = DateTime::createFromFormat('Y-m-d', $data['data_nascita'])
                ->diff(new DateTime('now'))
                ->y;
                $data['eta'] = ($age >= 18 ? "MAGGIORENNE" : "MINORENNE");
                $data['codice_fiscale'] = str_replace(" ", "", $data['codice_fiscale']);
                $data['codice_fiscale_genitore'] = str_replace(" ", "", $data['codice_fiscale_genitore']);
                $data['telefono'] = "".$data['telefono'];
                unset($data['asds']);
                unset($data['_FILES']);
                unset($data['_COOKIE']);
                foreach($data as &$vv)
                    $vv = strtoupper($vv);
                $data['email'] = strtolower($data['email']);

                //echo "Dati pronti\n";

                //update anagrafiche
                $sql = 'UPDATE anagrafiche SET
                    nome = "'.$data['nome'].'",
                    cognome = "'.$data['cognome'].'",
                    email = "'.$data['email'].'",
                    telefono = "'.$data['telefono'].'",
                    sesso = "'.$data['sesso'].'",
                    luogo_nascita = "'.$data['luogo_nascita'].'",
                    provincia_nascita = "'.$data['provincia_nascita'].'",
                    data_nascita = "'.$data['data_nascita'].'",
                    codice_fiscale = "'.$data['codice_fiscale'].'",
                    luogo_residenza = "'.$data['luogo_residenza'].'",
                    cap_residenza = "'.$data['cap_residenza'].'",
                    provincia_residenza = "'.$data['provincia_residenza'].'",
                    via_residenza = "'.$data['via_residenza'].'",
                    numero_residenza = "'.$data['numero_residenza'].'",

                    tipo_potesta = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['tipo_potesta'].'"').',
                    nome_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['nome_genitore'].'"').',
                    cognome_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['cognome_genitore'].'"').',
                    sesso_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['sesso_genitore'].'"').',
                    luogo_nascita_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['luogo_nascita_genitore'].'"').',
                    provincia_nascita_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['provincia_nascita_genitore'].'"').',
                    data_nascita_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['data_nascita_genitore'].'"').',
                    codice_fiscale_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['codice_fiscale_genitore'].'"').',
                    luogo_residenza_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['luogo_residenza_genitore'].'"').',
                    cap_residenza_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['cap_residenza_genitore'].'"').',
                    provincia_residenza_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['provincia_residenza_genitore'].'"').',
                    via_residenza_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['via_residenza_genitore'].'"').',
                    numero_residenza_genitore = '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['numero_residenza_genitore'].'"').',

                    cittadino_italiano = '.($data['eta'] == "MINORENNE" ? "null" : '"'.$data['cittadino_italiano'].'"').',
                    data_cittadino_italiano = '.($data['eta'] == "MINORENNE" ? "null" : '"'.$data['data_cittadino_italiano'].'"').'

                    WHERE idIscritto = '.$data['idIscritto'];
                $asd->executeSql($sql);

                //echo "Update anagrafica\n";

                //pdf
                require_once 'backEnd/api/tesseramento/pdfCreator.php';
                $data['type'] = "1".$data['asd'];
                $pdf = pdfCreator::api($data, $asd);

                $sql = 'INSERT INTO tesseramenti(idIscritto, data, idTipoTesseramento, codice, idFile) VALUES("'. $data['idIscritto'].'", "'.date("Y-m-d H:i:s").'", 4'.$pdf['year'].', "'.$pdf['code'].'",'.$pdf['file'].')';
                $ret = $asd->executeSql($sql);

                redirect("/moduli.html?s=conf");
            }
        }
        return [];
    }
}