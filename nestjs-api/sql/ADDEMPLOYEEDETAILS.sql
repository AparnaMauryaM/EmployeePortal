SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[ADDEMPLOYEEDETAILS]
-- Add the parameters for the stored procedure here
@NAME VARCHAR(100),
@USERNAME VARCHAR(100),						
@PASSWORD VARCHAR(100),			
@EMAIL VARCHAR(100),
@POSITION VARCHAR(100),
@DEPARTMENT VARCHAR(100),
@ROLE BIT,
@ISDONE INT OUTPUT,				    -- IsDone output variable returns 0/1/2/3 0 - Error,1- Success,2- More than 20 groups, 3- Group Name already exist
@ERROR_MESSAGE VARCHAR(MAX) OUTPUT	-- Return the error message to server side to log the error details 	
AS	
BEGIN TRY
	

	 INSERT INTO EMPLOYEE
	 (NAME,
	  USERNAME,
	  PASSWORD,
	  EMAIL,
	  POSITION,
	  DEPARTMENT,
	  ROLE)
	  VALUES(@NAME, @USERNAME, @PASSWORD, @EMAIL, @POSITION, @DEPARTMENT, @ROLE)
	   
		                       
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
