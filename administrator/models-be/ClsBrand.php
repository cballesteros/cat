<?php

require "../config-be/ClsConexion.php";

class ClsBrand extends ClsConexion
{
    //Listar
	function Get_Brand_by_todo()
    {
        $this->query = "call usp_get_brand()"; //select*from brand
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    //Guardar
    function Set_Brand_by_todo($pcBrand)
    {
        $this->query = "call usp_set_brand('$pcBrand')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    //Eliminar
    function delete_brand($Codigo){
        $this->query=  "DELETE FROM brand Where idbrand=$Codigo";
        $this->execute_single_query();
         return json_encode('Elimino correctamente');
    }

    function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_brand_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_brand($cod,$desc)
    {
        $this->query = "call USP_Actualizar_brand($cod,'$desc')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }
}