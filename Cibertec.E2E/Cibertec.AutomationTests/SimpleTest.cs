using OpenQA.Selenium.Chrome;
using Xunit;

namespace Cibertec.AutomationTests
{
    public class SimpleTest
    {
        [Fact]
        public void Navigate()
        {
            var driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://www.google.com");
            driver.Close();
            driver.Quit();
            driver = null;
        }
    }
}
