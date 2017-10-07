using Microsoft.AspNetCore.Mvc;
using Cibertec.UnitOfWork;
using Cibertec.Models;
using Microsoft.AspNetCore.Authorization;

namespace Cibertec.WebApi.Controllers
{    
    [Route("api/customer")] 
    public class CustomerController : BaseController
    {
        public CustomerController(IUnitOfWork unit) : base(unit)
        {
        }

        [HttpGet]
        public IActionResult GetList()
        {
            return Ok(_unit.Customers.GetList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok(_unit.Customers.GetById(id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Customer customer)
        {
            if (ModelState.IsValid)
                return Ok(_unit.Customers.Insert(customer));
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Customer customer)
        {
            if (ModelState.IsValid && _unit.Customers.Update(customer))
                return Ok(new { Message = "The customer is updated" });
            return BadRequest(ModelState);
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Customer customer)
        {
            if (customer.Id > 0)
                return Ok(_unit.Customers.Delete(customer));
            return BadRequest(new { Message = "Incorrect data." });
        }
    }
}