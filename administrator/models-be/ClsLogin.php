<?php

require "../config-be/ClsConexion.php";

class ClsLogin extends ClsConexion
{
    //Listar
	function Get_Login_by_todo()
    {
        $this->query = "call usp_get_login()"; //select*from brand
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

}