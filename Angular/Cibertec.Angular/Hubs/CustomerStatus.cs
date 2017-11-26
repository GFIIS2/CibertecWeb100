using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cibertec.Angular.Hubs
{
    public class CustomerStatus : Hub
    {
        static List<int> CustomerIds = new List<int>();

        public void AddCustomerId(int id)
        {
            if (!CustomerIds.Contains(id)) CustomerIds.Add(id);
            Clients.All.InvokeAsync("customerStatus", CustomerIds);
        }

        public void RemoveCustomerId(int id)
        {
            if (CustomerIds.Contains(id)) CustomerIds.Remove(id);
            Clients.All.InvokeAsync("customerStatus", CustomerIds);
        }

        public override Task OnConnectedAsync()
        {
            return Clients.All.InvokeAsync("customerStatus", CustomerIds);
        }
    }
}
