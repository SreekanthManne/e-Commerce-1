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
    public class CartController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"select CartID, CartName, CartPrice, CartDescription, Quantity, CartImage from dbo.Cart";
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
        public string Post(Cart cart)
        {
            try
            {
                string query = @"insert into dbo.Cart values('" + cart.CartName + @"','" + cart.CartPrice + @"', '" + cart.CartDescription + @"', '" + cart.Quantity + @"', '" + cart.CartImage + @"')";
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
                return "Cart Added successfully";

            }
            catch (Exception ex)
            {
                return "Failed to add user";
            }

        }
        public string Delete(int id)
        {
            try
            {
                string query = @"
                delete from dbo.Cart
                where CartID ='" + id + @"'";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["E-Commerece"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Cart Deleted successfully";

            }
            catch (Exception)
            {
                return "Failed to deletes user";
            }

        }
    }
}
