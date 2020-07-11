<?php
class addTesserato{

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
        if(sizeof($ret) != 1){
            header("HTTP/1.0 404 Not Found");
            exit;
        }else{
            $ret = $ret[0];
            $asd = new Database($ret['host'], $ret['user'], $ret['password'], $ret['db']);
            //creo il record iscritto nell'asd
            $ret = $asd->executeSql('INSERT INTO iscritti (creatore, dataCreazione, ultimaModifica) VALUES("self-moduli", "'.date("Y-m-d H:i:s").'", "'.date("Y-m-d H:i:s").'")');
            if($ret){
                echo "CREATO ASD\n";
                //creo il record iscritto nella vlk
                $vlk = $DB->executeSql('INSERT INTO vlk_iscritti (idIscritto, idAsd) VALUES('.$ret.', '.$data['asd'].')');
                if($vlk){
                    echo "CREATO VLK\n";
                    $f = "null";
                    $cf = "null";
                    $cfg = "null";

                    //Upload dei file
                    if (sizeof($_FILES['foto_mezzobusto']['name']) > 0) {
                        if (is_uploaded_file($_FILES['foto_mezzobusto']['tmp_name'])) {
                            $fi = addslashes(file_get_contents($_FILES['foto_mezzobusto']['tmp_name']));
                            $name = basename($_FILES['foto_mezzobusto']['name']);
                            $f = $asd->executeSql('INSERT INTO file(nome, data, creazione) VALUES ("foto'.$name.'", "'.$fi.'", "'.date("Y-m-d H:i:s").'")');
                            echo "UPLOAD foto\n";
                            //mail....
                        }
                    }
                    if (sizeof($_FILES['foto_codice_fiscale']['name']) > 0) {
                        if (is_uploaded_file($_FILES['foto_codice_fiscale']['tmp_name'])) {
                            $fi = addslashes(file_get_contents($_FILES['foto_codice_fiscale']['tmp_name']));
                            $name = basename($_FILES['foto_codice_fiscale']['name']);
                            $cf = $asd->executeSql('INSERT INTO file(nome, data, creazione) VALUES ("codice_fiscale'.$name.'", "'.$fi.'", "'.date("Y-m-d H:i:s").'")');
                            echo "UPLOAD codice_fiscale\n";
                        }
                    }
                    if (sizeof($_FILES['foto_codice_fiscale_genitore']['name']) > 0) {
                        if (is_uploaded_file($_FILES['foto_codice_fiscale_genitore']['tmp_name'])) {
                            $fi = addslashes(file_get_contents($_FILES['foto_codice_fiscale_genitore']['tmp_name']));
                            $name = basename($_FILES['foto_codice_fiscale_genitore']['name']);
                            $cfg = $asd->executeSql('INSERT INTO file(nome, data, creazione) VALUES ("codice_fiscale_genitore'.$name.'", "'.$fi.'", "'.date("Y-m-d H:i:s").'")');
                            echo "UPLOAD codice_fiscale_genitore\n";
                        }
                    }

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

                    //inserimento anagrafiche
                    $sql = 'INSERT INTO anagrafiche(
                        idIscritto,
                        nome,
                        cognome,
                        email,
                        telefono,
                        sesso,
                        luogo_nascita,
                        provincia_nascita,
                        data_nascita,
                        codice_fiscale,
                        luogo_residenza,
                        cap_residenza,
                        provincia_residenza,
                        via_residenza,
                        numero_residenza,
                        tipo_potesta,
                        nome_genitore,
                        cognome_genitore,
                        sesso_genitore,
                        luogo_nascita_genitore,
                        provincia_nascita_genitore,
                        data_nascita_genitore,
                        codice_fiscale_genitore,
                        luogo_residenza_genitore,
                        cap_residenza_genitore,
                        provincia_residenza_genitore,
                        via_residenza_genitore,
                        numero_residenza_genitore,
                        cittadino_italiano,
                        data_cittadino_italiano,
                        foto,
                        foto_codice_fiscale,
                        foto_codice_fiscale_genitore
                    ) VALUES (
                        '.$ret.',
                        "'.$data['nome'].'",
                        "'.$data['cognome'].'",
                        "'.strtolower($data['email']).'",
                        "'.$data['telefono'].'",
                        "'.$data['sesso'].'",
                        "'.$data['luogo_nascita'].'",
                        "'.$data['provincia_nascita'].'",
                        "'.$data['data_nascita'].'",
                        "'.$data['codice_fiscale'].'",
                        "'.$data['luogo_residenza'].'",
                        "'.$data['cap_residenza'].'",
                        "'.$data['provincia_residenza'].'",
                        "'.$data['via_residenza'].'",
                        "'.$data['numero_residenza'].'",
                        
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['tipo_potesta'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['nome_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['cognome_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['sesso_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['luogo_nascita_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['provincia_nascita_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['data_nascita_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['codice_fiscale_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['luogo_residenza_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['cap_residenza_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['provincia_residenza_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['via_residenza_genitore'].'"').',
                        '.($data['eta'] == "MAGGIORENNE" ? "null" : '"'.$data['numero_residenza_genitore'].'"').',
                
                        '.($data['eta'] == "MINORENNE" ? "null" : '"'.$data['cittadino_italiano'].'"').',
                        '.($data['eta'] == "MINORENNE" ? "null" : '"'.$data['data_cittadino_italiano'].'"').',
                        
                        '.$f.',
                        '.$cf.',
                        '.$cfg.'
                    )';
                    $r = $asd->executeSql($sql);
                    echo "CREATA anagrafica\n";


                    require_once 'backEnd/api/tesseramento/pdfCreator.php';
                    $data['type'] = $data['asd'];
                    $data['idIscritto'] = $ret;
                    $pdf = pdfCreator::api($data, $asd);

                    $sql = 'INSERT INTO tesseramenti(idIscritto, data, idTipoTesseramento, codice, idFile) VALUES("'. $data['idIscritto'].'", "'.date("Y-m-d H:i:s").'", 2'.$pdf['year'].', "'.$pdf['code'].'",'.$pdf['file'].')';
                    
                    $asd->executeSql($sql);
                }
            }
        }
    }
}