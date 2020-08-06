<?php
class pdfCreator{

    public static $schema = [
    ];

    public static function api($dati, $asd = null){
		//generazione pdf
        require_once 'backEnd/Zexarel/class/ZDocument/ZPdf.php';
		
		$type = $dati['asd'];
		
		$code = pdfCreator::createModuleToken($type);
        $path = 'https://roujutsu.it/json//moduli/'.$type.'.json';
		$json = json_decode( preg_replace('/[\x00-\x1F\x80-\xFF]/', '', file_get_contents($path)), true);

		$pagine = $json["pagine"];
		$saveOn = $json["saveOn"];
		
        $pdf = new ZPdf();
        $pdf->setFont('Helvetica','',14);
        $pdf->setTextColor(0, 0, 0);
        $pdf->setAuthor("Roujutsu®");
        $pdf->setCreator("Roujutsu®");
        $pdf->setTitle($json['nome']);

		//pagine successive se esistono
		for($k = 0; $k < sizeof($pagine); $k++){
            $page = true;
			if(isset($pagine[$k]['rich'])){
				foreach ($pagine[$k]['value'] as $key => $value) {
					if($key == $dati[$pagine[$k]['rich']]){
						if($value == ""){
							$page = false;
						}else{
						$pdf->addPage();
							$pdf->addImage('https://roujutsu.it/'.$value, 0, 0, 210, 297);
						}
					}
				}
			}else{
				if($pagine[$k] == ""){
					$page = false;
				}else{
					$pdf->addPage();
					$pdf->addImage('https://roujutsu.it/'.$pagine[$k], 0, 0, 210, 297);
				}
			}
			if($page){
				$pdf->setFontSize(12);
				$pdf->addText(145, 10, $code);
				for($i = 0; $i < sizeof($saveOn["pag".($k+1)]); $i++){
					$req = $saveOn["pag".($k+1)][$i];
					if(isset($req['text']) && !isset($req['rich'])){
						$value = pdfCreator::sptostr($req['text']);
						if($value == "today()"){
							$value = date("d/m/Y");
						}elseif($value == "year()"){
							$value = date("Y");
						}elseif($value == "years()"){
							$value = intval(date("n")) < 7 ?  date("Y") : intval(date("Y"))+1;
						}
						$pdf->setFontSize($req['font']);
						//se c'è la condizione, azzero nel caso vada in false
						if(isset($req['if']['value'])){
							if(!isset($dati[$req['if']['rich']]) || $dati[$req['if']['rich']] != $req['if']['value']){
								$value = "";
							}else{
								if(isset($req['if']['value2'])){
									if(!isset($dati[$req['if']['rich2']]) || $dati[$req['if']['rich2']] != $req['if']['value2']){
										$value = "";
									}
								}
							}
						}
						//ho le coordinate
						if(isset($req['x']) && isset($req['x'])){
							$pdf->addText($req['x'], $req['y'], $value);
						}
					}else if(!isset($req['text']) && isset($req['rich'])){
						$value = "";
						//è un valore concatenato
						if(find(" + ", $req['rich']) > 0){
							$a = explode(' + ', $req['rich']);
							for ($exp = 0; $exp < sizeof($a); $exp++) {
								$value = $value." ".pdfCreator::sptostr($dati[$a[$exp]]);
							}
						}else{
							$value = pdfCreator::sptostr($dati[$req['rich']]);
						}
						if(find("data", $req['rich']) >= 0){
							$value = date("d/m/Y", strtotime($value));
						}
						if(find("email", $req['rich']) >= 0){
							$value = strtolower($value);
						}
						$pdf->setFontSize($req['font']);
						//se c'è la condizione, azzero nel caso vada in false
						if(isset($req['if']['value'])){
							if($dati[$req['if']['rich']] != $req['if']['value']){
								$value = "";
							}else{
								if(isset($req['if']['value2'])){
									if($dati[$req['if']['rich2']] != $req['if']['value2']){
										$value = "";
									}
								}
							}
						}
						//ho le coordinate
						if(isset($req['x']) && isset($req['x'])){
							$pdf->addText($req['x'], $req['y'], $value);
						}else if(isset($req['split'])){
							//va splittato
							for ($spl = 0; $spl < sizeof($req['split']); $spl++) {
								$pdf->addText($req['split'][$spl]['x'], $req['split'][$spl]['y'], substr($value, $spl, 1));
							}
						}
					}
				}
			}
		}
		
		//salvo pdf tmp
		$filename = date("YmdHis").".pdf";
		$pdf->save('F', $filename);
		//echo "File salvato su HD\n";

		//Salvataggio come file nel DB
		$fi = file_get_contents($filename);
		$a = intval(date("m")) > 7 ? intval(date("Y"))+1:intval(date("Y"));
		$tes = $asd->executeSql('INSERT INTO file(nome, data, creazione) VALUES ("Tesseramento '.$a.'.pdf", "'.addslashes($fi).'", "'.date("Y-m-d H:i:s").'")');
		//echo "File salvato su DB\n";

		pdfCreator::sendDocument($filename, $dati['email'],[
			"nome"=>$dati['cognome']." ".$dati['nome'],
			"tit" => "Domanda di tesseramento di ".$dati['cognome']." ".$dati['nome'],
			"sub" => $pal["nome"],
			"text" => "Email generata automaticamente, si prega di non rispondere<br><br>Buongiorno,<br> Come da voi richiesto, vi alleghiamo i moduli d'iscrizione, essi sono da riconsegnare firmati all'<b>".$pal["nome"]." entro il ".date('d/m/Y', strtotime('+7 day', time()))."</b>"
		]);
		//echo "Email inviata";

		return ['code' => $code, 'file' => $tes, "year" => $a];
	}
	
	public static function createModuleToken($tipo){
		$char = [
		  "j", "Q", "r", "H", "A", "T", "8", "G", "h", "m",
		  "f", "n", "o", "y", "Z", "5", "d", "N", "3", "e",
		  "M", "v", "w", "D", "7", "0", "4", "1", "F", "q",
		  "u", "6", "g", "I",	"J", "l", "W", "P", "U", "O",
		  "C", "t", "Y", "L",	"R", "1", "x", "X", "z", "S",
		  "s", "a", "V", "9", "E", "c", "i", "b", "B", "p"
		];
		$m = date("m");
		$y = $char[intval(date("y"))%60];
		switch ($m) {
		  case "01":
			$m = "G";
			break;
		  case "02":
			$m = "F";
			break;
		  case "03":
			$m = "M";
			break;
		  case "04":
			$m = "A";
			break;
		  case "05":
			$m = "I";
			break;
		  case "06":
			$m = "U";
			break;
		  case "07":
			$m = "L";
			break;
		  case "08":
			$m = "T";
			break;
		  case "09":
			$m = "S";
			break;
		  case "10":
			$m = "O";
			break;
		  case "11":
			$m = "N";
			break;
		  case "12":
			$m = "D";
			break;
		}
		$d = $char[intval(date("d"))];
		$h = $char[intval(date("H"))];
		$i = $char[intval(date("i"))];
		$s = $char[intval(date("s"))];
		return $m.$y.$d.$tipo.$i.$s.$h;
	}
	
	private static function sptostr($word) {
		$word = str_replace("@","%40",$word);
		$word = str_replace("`","%60",$word);
		$word = str_replace("¢","%A2",$word);
		$word = str_replace("£","%A3",$word);
		$word = str_replace("¥","%A5",$word);
		$word = str_replace("|","%A6",$word);
		$word = str_replace("«","%AB",$word);
		$word = str_replace("¬","%AC",$word);
		$word = str_replace("¯","%AD",$word);
		$word = str_replace("º","%B0",$word);
		$word = str_replace("±","%B1",$word);
		$word = str_replace("ª","%B2",$word);
		$word = str_replace("µ","%B5",$word);
		$word = str_replace("»","%BB",$word);
		$word = str_replace("¼","%BC",$word);
		$word = str_replace("½","%BD",$word);
		$word = str_replace("¿","%BF",$word);
		$word = str_replace("À","%C0",$word);
		$word = str_replace("Á","%C1",$word);
		$word = str_replace("Â","%C2",$word);
		$word = str_replace("Ã","%C3",$word);
		$word = str_replace("Ä","%C4",$word);
		$word = str_replace("Å","%C5",$word);
		$word = str_replace("Æ","%C6",$word);
		$word = str_replace("Ç","%C7",$word);
		$word = str_replace("È","%C8",$word);
		$word = str_replace("É","%C9",$word);
		$word = str_replace("Ê","%CA",$word);
		$word = str_replace("Ë","%CB",$word);
		$word = str_replace("Ì","%CC",$word);
		$word = str_replace("Í","%CD",$word);
		$word = str_replace("Î","%CE",$word);
		$word = str_replace("Ï","%CF",$word);
		$word = str_replace("Ð","%D0",$word);
		$word = str_replace("Ñ","%D1",$word);
		$word = str_replace("Ò","%D2",$word);
		$word = str_replace("Ó","%D3",$word);
		$word = str_replace("Ô","%D4",$word);
		$word = str_replace("Õ","%D5",$word);
		$word = str_replace("Ö","%D6",$word);
		$word = str_replace("Ø","%D8",$word);
		$word = str_replace("Ù","%D9",$word);
		$word = str_replace("Ú","%DA",$word);
		$word = str_replace("Û","%DB",$word);
		$word = str_replace("Ü","%DC",$word);
		$word = str_replace("Ý","%DD",$word);
		$word = str_replace("Þ","%DE",$word);
		$word = str_replace("ß","%DF",$word);
		$word = str_replace("à","%E0",$word);
		$word = str_replace("á","%E1",$word);
		$word = str_replace("â","%E2",$word);
		$word = str_replace("ã","%E3",$word);
		$word = str_replace("ä","%E4",$word);
		$word = str_replace("å","%E5",$word);
		$word = str_replace("æ","%E6",$word);
		$word = str_replace("ç","%E7",$word);
		$word = str_replace("è","%E8",$word);
		$word = str_replace("é","%E9",$word);
		$word = str_replace("ê","%EA",$word);
		$word = str_replace("ë","%EB",$word);
		$word = str_replace("ì","%EC",$word);
		$word = str_replace("í","%ED",$word);
		$word = str_replace("î","%EE",$word);
		$word = str_replace("ï","%EF",$word);
		$word = str_replace("ð","%F0",$word);
		$word = str_replace("ñ","%F1",$word);
		$word = str_replace("ò","%F2",$word);
		$word = str_replace("ó","%F3",$word);
		$word = str_replace("ô","%F4",$word);
		$word = str_replace("õ","%F5",$word);
		$word = str_replace("ö","%F6",$word);
		$word = str_replace("÷","%F7",$word);
		$word = str_replace("ø","%F8",$word);
		$word = str_replace("ù","%F9",$word);
		$word = str_replace("ú","%FA",$word);
		$word = str_replace("û","%FB",$word);
		$word = str_replace("ü","%FC",$word);
		$word = str_replace("ý","%FD",$word);
		$word = str_replace("þ","%FE",$word);
		$word = str_replace("ÿ","%FF",$word);
		return urldecode($word);
	}

	public static function sendDocument($file = null, $to, $extra = null){
		require "backEnd/classes/EmailController.php";
		try{
		  $mail = new EmailController();
	
		  $mail->addAddress($to);                   // Add a recipient
		  $mail->addBCC('tesserevlk@roujutsu.it'); // Attachments
		  $mail->addAttachment($file, "Moduli di ".$extra['nome']);              // Add attachments
		  $mail->isHTML(true);                      // Set email format to HTML
		  $mail->Subject = $extra['tit'];
	
		  //email body content
		  $html = file_get_contents("https://roujutsu.it/immagini/email.html");
		  $html = str_replace("{{ TITLE }}", $extra['tit'], $html);
		  $html = str_replace("{{ SUB }}", $extra['sub'], $html);
		  $html = str_replace("{{ TEXT }}", $extra['text'], $html);
	
		  $mail->Body    = $html;
		  $mail->addReplyTo('tesserevlk@roujutsu.it', 'Tessere VLK');
		  $mail->send();
		}catch(Exception $e){
		  mail("tesserevlkl@roujutsu.it", "Errore invio email", "Errore durante l'invio a ".$to." del file ".$file."<br>Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
		}
	  }
	


}
?>