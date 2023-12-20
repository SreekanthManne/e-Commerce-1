using API.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace API.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
            {
            string query = @"select EmployeeId, EmployeeName, EmployeeDesignation, EmployeeEmail, password, ImageUpload from dbo.Employee";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["E-Commerece"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(Employee emp)
        {
            try
            {
                string query = @"insert into dbo.Employee values('" + emp.EmployeeName + @"','" + emp.EmployeeDesignation+ @"', '" + emp.EmployeeEmail + @"', '" + emp.password + @"', '" + emp.ImageUpload + @"')";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["E-Commerece"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                Get();
                return "User Added successfully";

            }
            catch (Exception ex)
            {
                return ex.Message;
               //eturn "Failed to add user";
            }

        }
        public string Put(Employee emp)
        {
            try
            {
                string query = @"
                update dbo.Employee set  EmployeeName ='" + emp.EmployeeName + @"', EmployeeDesignation ='" + emp.EmployeeDesignation + @"', EmployeeEmail ='" + emp.EmployeeEmail + @"', password ='" + emp.password + @"', ImageUpload ='" + emp.ImageUpload + @"'   
                where EmployeeId=" + emp.EmployeeId + @"                                  
                    ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["E-Commerece"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "User Updated successfully";

            }
            catch (Exception ex)
            {
                return "Failed to update user";
            }

        }
        public string Delete(int id)
        {
            try
            {
                string query = @"
                delete from dbo.Employee
                where EmployeeId ='" + id + @"'";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["E-Commerece"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "User Deleted successfully";

            }
            catch (Exception)
            {
                return "Failed to deletes user";
            }

        }
    }
}
