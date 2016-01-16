<?php
require "../models-be/ClsBrand.php";

    $objBrand = new ClsBrand();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objBrand->Get_Brand_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcBrand = $objDatos->cBrand;

            try
            {
                $Resultado = $objBrand->Set_Brand_by_todo($pcBrand);
                $objBrand->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objBrand->rollback() ;
                echo $e ;
            }

        }

        //ELIMINAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objBrand->delete_brand($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='Editar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objBrand->Get_equipo_By_Id($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='actualizar')
        {
            
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcCodigo = $objDatos->cCodigo;
            $pcDescri = $objDatos->cDescripcion;

            try
            {
                $Resultado = $objBrand->update_brand($pcCodigo,$pcDescri);

                $objBrand->beginTransaction();
                echo $Resultado;
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objBrand->rollback() ;
                echo $e ;
            }

        }


    }

?>