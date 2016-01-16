<?php
require "../models-be/ClsEspeciality.php";

    $objEspeciality = new ClsEspeciality();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objEspeciality->Get_Especiality_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcEspeciality = $objDatos->cEspeciality;

            try
            {
                $Resultado = $objEspeciality->Set_Especiality_by_todo($pcEspeciality);
                $objEspeciality->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objEspeciality->rollback() ;
                echo $e ;
            }

        }

        //ELIMINAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pidespeciality = $objDatos->idespeciality;
            $Resultado = $objEspeciality->delete_Especiality_by_todo($pidespeciality);
        }


        if ($_GET["accion"]=='Editar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objEspeciality->Get_equipo_By_Id($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='actualizar')
        {
            
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcCodigo = $objDatos->cCodigo;
            $pcDescri = $objDatos->cDescripcion;

            try
            {
                $Resultado = $objEspeciality->update_epeciality($pcCodigo,$pcDescri);

                $objEspeciality->beginTransaction();
                echo $Resultado;
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objEspeciality->rollback() ;
                echo $e ;
            }

        }

    }

?>