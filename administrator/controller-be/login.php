<?php
require "../models-be/ClsLogin.php";

    $objLogin = new ClsLogin();
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='obtengo')
        {
            $Resultado = $objLogin->Get_Login_by_todo();
            echo $Resultado;
        }


    }

?>


