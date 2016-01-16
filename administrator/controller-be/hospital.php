<?php
require "../models-be/ClsHospital.php";

    $objHospital = new ClsHospital();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objHospital->Get_Hospital_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcHospital = $objDatos->cHospital;
            $pcState = $objDatos->cState;

            try
            {
                $Resultado = $objHospital->Set_Hospital_by_todo($pcHospital,$pcState);
                $objHospital->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objHospital->rollback() ;
                echo $e ;
            }

        }

        //ELIMONAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pidhospital = $objDatos->idhospital;
            $Resultado = $objHospital->delete_Hospital_by_todo($pidhospital);
        }


        if ($_GET["accion"]=='Editar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objHospital->Get_equipo_By_Id($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='actualizar')
        {
            
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcCodigo = $objDatos->cCodigo;
            $pcDescri = $objDatos->cDescripcion;

            try
            {
                $Resultado = $objHospital->update_hospital($pcCodigo,$pcDescri);

                $objHospital->beginTransaction();
                echo $Resultado;
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objHospital->rollback() ;
                echo $e ;
            }

        }

    }

?>