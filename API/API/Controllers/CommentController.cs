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
    public class CommentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                select CommentId, CommentData from dbo.Comment";
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
        public string Post(CommentFunction comm)
        {
            try
            {
                string query = @"
                insert into dbo.Comment values('" + comm.CommentData + @"')";
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
                return "Comment Added successfully";

            }
            catch (Exception)
            {
                return "Failed to add user";
            }

        }
        public string Put(CommentFunction comm)
        {
            try
            {
                string query = @"
                update dbo.Comment set  CommentData ='" + comm.CommentData + @"'   
                where CommentId=" + comm.CommentId + @"                                  
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
                return "Comment Updated successfully";

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
                delete from dbo.Comment
                where CommentId ='" + id + @"'";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["E-Commerece"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Comment Deleted successfully";

            }
            catch (Exception)
            {
                return "Failed to deletes user";
            }

        }
    }
}
