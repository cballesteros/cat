<?php

require "../config-be/ClsConexion.php";

class ClsCountry extends ClsConexion
{

	function Get_Country_by_todo()
    {
        $this->query = "call usp_get_country()";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_Country_by_todo($pcCountry)
    {
        $this->query = "call usp_set_country('$pcCountry')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_Country_by_todo($Codigo){
        $this->query=  "DELETE FROM country Where idcountry=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }


    function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_country_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_country($cod,$desc)
    {
        $this->query = "call USP_Actualizar_country($cod,'$desc')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }

}