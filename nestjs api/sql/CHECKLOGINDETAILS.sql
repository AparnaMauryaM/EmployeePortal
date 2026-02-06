SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[CHECKLOGINDETAILS]
-- Add the parameters for the stored procedure here
@USERNAME VARCHAR(100),				
@PASSWORD VARCHAR(100),			
@ISDONE INT OUTPUT,				    -- IsDone output variable returns 0/1/2/3 0 - Error,1- Success,2- More than 20 groups, 3- Group Name already exist
@ERROR_MESSAGE VARCHAR(MAX) OUTPUT	-- Return the error message to server side to log the error details 	
AS	
BEGIN TRY
	

	 SELECT USERNAME,
	        EMPLOYEE_ID,
			ROLE,
			POSITION,
			DEPARTMENT
	   FROM EMPLOYEE
	  WHERE USERNAME = @USERNAME
	    AND PASSWORD = @PASSWORD
		                       
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
