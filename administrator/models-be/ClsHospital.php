<?php

require "../config-be/ClsConexion.php";

class ClsHospital extends ClsConexion
{

	function Get_Hospital_by_todo()
    {
        $this->query = "call usp_get_hospital()";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_Hospital_by_todo($pcBrand,$pcState)
    {
        $this->query = "call usp_set_hospital('$pcBrand','$pcState')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_Hospital_by_todo($Codigo){
        $this->query=  "DELETE FROM hospital Where idhospital=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }

     function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_hospital_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_hospital($cod,$desc)
    {
        $this->query = "call USP_Actualizar_hospital($cod,'$desc')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }
}