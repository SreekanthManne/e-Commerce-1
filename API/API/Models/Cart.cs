using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class Cart
    {

        public int CartID { get; set; }
        public string CartName { get; set; }
        public int CartPrice { get; set; }
        public string CartDescription { get; set; }
        public int Quantity { get; set; }
        public string CartImage { get; set; }
    }
}