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
	</head>

	<body>
		<div class="container">
			<div class="page-header">
				<div class="btn-group">
					<button id="btn-prev" class="btn btn-default"><i id="glyph-prev" class="glyphicon glyphicon-arrow-left"></i><span id="txt-prev"></span></button>
					<button id="btn-act" class="btn btn-primary"><span id="txt-act"></span></button>
					<button id="btn-sig" class="btn btn-default"><span id="txt-sig"></span><i id="glyph-sig" class="glyphicon glyphicon-arrow-right"></i></button>
				</div>
			</div>
		
			<div class="row no-padding">
				<div class="col-md-9">
					<div id="calendario"></div>
				</div>
				<div class="col-md-3">
				</div>
			</div>
		</div>
	</body>

	<script src="calendario.js"></script>
	<script src="funcs.js"></script>

</html>