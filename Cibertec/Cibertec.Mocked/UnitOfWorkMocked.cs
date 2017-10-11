using Cibertec.Repositories.Northwind;
using System;
using Cibertec.Models;
using System.Collections.Generic;
using Ploeh.AutoFixture;
using System.Linq;
using Moq;
using Cibertec.UnitOfWork;

namespace Cibertec.Mocked
{
    public class UnitOfWorkMocked
    {
        private List<Customer> _customerList;
        public UnitOfWorkMocked()
        {
            var mocked = new Mock<IUnitOfWork>();

        }
    }
}
