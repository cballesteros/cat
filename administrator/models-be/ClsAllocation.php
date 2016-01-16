<?php

require "../config-be/ClsConexion.php";

class ClsAllocation extends ClsConexion
{
    //Listar
	function Get_LLamarUserAll_todo()
    {
        $this->query = "call USP_LLamarUserAll()"; //select*from 
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    //Listar ok
	function Get_Allocationok_todo($Codigo)
    {
        $this->query = "call usp_get_Allocation($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }
}