<?php

require "../config-be/ClsConexion.php";

class ClsModel extends ClsConexion
{

	function Get_Model_by_todo()
    {
        $this->query = "call usp_get_model()";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_Model_by_todo($pcModel,$pcBrand)
    {
        $this->query = "call usp_set_model('$pcModel','$pcBrand')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_Model_by_todo($Codigo){
        $this->query=  "DELETE FROM model Where idmodel=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }

    function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_model_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_brand($cod,$desc,$brand)
    {
        $this->query = "call USP_Actualizar_model($cod,'$desc','$brand')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }
}