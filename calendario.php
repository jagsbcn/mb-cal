<!DOCTYPE html>
<html lang="en">
  	<head>
    	<title>Magic Blue - Calendario</title>
    
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1">

    	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    	<link rel="stylesheet" type="text/css" href="calendario.css">

    	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    	<script src="incl/mustache.min.js"></script>
	</head>

	<body>
		<div class="container">
			<div class="page-header">
				<div class="pull-right form-inline">
					<div class="btn-group">
						<button class="btn btn-primary" data-calendar-nav="prev"><i id="glyph-prev" class="glyphicon glyphicon-arrow-left"></i></button>
						<button class="btn btn-default" data-calendar-nav="hoy">Hoy</button>
						<button class="btn btn-primary" data-calendar-nav="sig"><i id="glyph-sig" class="glyphicon glyphicon-arrow-right"></i></button>
					</div>
				</div>

				<h3></h3>
			</div>
		
			<div class="row no-padding">
				<div class="col-md-9">
					<div id="calendario"></div>
				</div>
				<div class="col-md-3">
					<div id="agenda-dia"></div>
				</div>
			</div>
		</div>
	</body>

	<script src="calendario.js"></script>
	<script src="funcs.js"></script>

</html>