<?php
require "../models-be/ClsAllocation.php";

    $objAllocation = new ClsAllocation();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objAllocation->Get_LLamarUserAll_todo();
            echo $Resultado;
        }

        //LISTAR OK
        if($_GET["accion"]=='listarok')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pnCodigo = $objDatos->nCodigo;

            $Resultado = $objAllocation->Get_Allocationok_todo($pnCodigo);
            echo $Resultado;
        }


    }

?>