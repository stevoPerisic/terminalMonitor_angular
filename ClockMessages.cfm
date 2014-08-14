<!DOCTYPE html>
<html lang="en">
	<cfquery datasource="TimeCurrent" name="messages">
	 { CALL Messages..usp_Web1_GetMessages ('#TerminalID#', '#StartDate#', '#ServerID#') }
	</cfquery>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CCP Monitor</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

  	<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  		<div class="container-fluid">
  			<div class="navbar-header">
  				<a class="navbar-brand" href="#">CCP Monitor</a>
  			</div>
  		</div>
  	</div>

  	<div class="container-fluid">
  		<div class="row">
  			<div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            
          </ul>
        </div>
  			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
  				<h1 class="page-header">Currently Monitoring Terminal <cfoutput>#TerminalID#</cfoutput></h1>

  				<div class="table-responsive">
  					<table class="table table-striped">
  						<thead>
  							<tr>
  								<th>Msg Date</th>
								<th>Subject</th>
		 						<th>Content</th>
  							</tr>
  						</thead>
  						<tbody>
  							<cfoutput query="messages">
  								<tr>
  									<td>#DateFormat(DateCreatedMessage, "mm/dd/yy")# #TimeFormat(DateCreatedMessage)#</td>		
									<td>#subject#</td>		
									<td >
										<cfquery datasource="TimeCurrent" name="mContent">
			 							{ CALL Messages..usp_Web1_GetMessageContent ('#MessageID#', '#ServerID#') }
										</cfquery>
										#mContent.contents#	
									</td>
  								</tr>
  							</cfoutput>
  						</tbody>
  					</table>
  				</div>

  			</div>
  		</div>
  	</div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
