SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[GETEMPLOYEEDETAIL]
-- Add the parameters for the stored procedure here
@EMPID INT,
@ISDONE INT OUTPUT,				    -- IsDone output variable returns 0/1/2/3 0 - Error,1- Success,2- More than 20 groups, 3- Group Name already exist
@ERROR_MESSAGE VARCHAR(MAX) OUTPUT	-- Return the error message to server side to log the error details 	
AS	
BEGIN TRY
	
	if(@EMPID = 0)
	BEGIN
		SELECT NAME, USERNAME, POSITION, EMAIL, DEPARTMENT
		FROM EMPLOYEE
	END
	ELSE
	BEGIN
		SELECT  EMPLOYEE_ID,NAME , USERNAME, POSITION, EMAIL, DEPARTMENT
		FROM EMPLOYEE
		WHERE EMPLOYEE_ID = @EMPID
	END

	   
		                       
	SELECT @ISDONE = 1
		
END TRY
	
BEGIN CATCH
	IF @@TRANCOUNT > 0
	ROLLBACK	
	SET @ISDONE = 0	
	SELECT @ERROR_MESSAGE = 'Procedure Name : ' + ERROR_PROCEDURE() +
								'<BR/> Procedure Line : ' + CAST(ERROR_LINE() AS VARCHAR(5)) +
								'<BR/> Error Message  : ' + ERROR_MESSAGE();
END CATCH
GO
