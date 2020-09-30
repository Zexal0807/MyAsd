<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

class EmailController extends PHPMailer{
  public function __construct(){
    parent::__construct(true);

    //Server settings
    $this->isSMTP();                                    // Send using SMTP
    $this->Host       = 'smtps.aruba.it';               // Set the SMTP server to send through
    $this->SMTPAuth   = true;                           // Enable SMTP authentication
    $this->Username   = 'tesserevlk@roujutsu.it';       // SMTP username
    $this->Password   = 'roujutsu2020';                 // SMTP password
    $this->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    // Enable TLS encryption;
    $this->Port       = 465;                            // TCP port to connect to

    //Recipients
    $this->setFrom('tesserevlk@roujutsu.it', 'Team Roujutsu');
  }
}
?>
