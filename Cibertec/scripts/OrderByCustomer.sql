CREATE PROCEDURE [dbo].[OrderByCustomer]
	@customerId int
AS
BEGIN
	SELECT [Id]
      ,[OrderDate]
      ,[OrderNumber]      
      ,[TotalAmount]
  FROM [dbo].[Order]
  WHERE CustomerId = @customerId
END
GO
