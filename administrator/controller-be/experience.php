<?php
require "../models-be/ClsExperience.php";

    $objExperience = new ClsExperience();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objExperience->Get_Experience_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcExperience = $objDatos->cExperience;

            try
            {
                $Resultado = $objExperience->Set_Experience_by_todo($pcExperience);
                $objExperience->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objExperience->rollback() ;
                echo $e ;
            }

        }

        //ELIMINAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pidexperience = $objDatos->idexperience;
            $Resultado = $objExperience->delete_Experience_by_todo($pidexperience);
        }


        if ($_GET["accion"]=='Editar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objExperience->Get_equipo_By_Id($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='actualizar')
        {
            
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcCodigo = $objDatos->cCodigo;
            $pcDescri = $objDatos->cDescripcion;

            try
            {
                $Resultado = $objExperience->update_experience($pcCodigo,$pcDescri);

                $objExperience->beginTransaction();
                echo $Resultado;
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objExperience->rollback() ;
                echo $e ;
            }

        }

    }

?>