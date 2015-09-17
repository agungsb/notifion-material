<!DOCTYPE html>
<html ng-app="notifionApp">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Notifion Material</title>
        <link rel="icon" type="image/png" href="img/icon.png"/>
        <link href="bower_components/angular-material/modules/css/angular-material-layout.css" rel="stylesheet" type="text/css"/>
        <link href="bower_components/angular-material/angular-material.css" rel="stylesheet" type="text/css"/>
        <link href="bower_components/angular-material-icons-master/angular-material-icons.css" rel="stylesheet" type="text/css"/>
        <link href="bower_components/md-date-time/dist/md-date-time.css" rel="stylesheet" type="text/css"/>
        <link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link href="bower_components/textAngular/dist/textAngular.css" rel="stylesheet" type="text/css"/>
        <link href="css/app.css" rel="stylesheet" type="text/css"/>
    </head>

    <body>

        <div ui-view class="sn"></div>

        <!--<script src="bower_components/angular/angular.js"></script>-->
        <script src="bower_components/angular/angular.min.js" type="text/javascript"></script>
        <!--<script src="bower_components/angular/angular-1.3.15.js" type="text/javascript"></script>-->
        <!--<script src="bower_components/angular-cookies/angular-cookies.min.js" type="text/javascript"></script>-->
        <script src="bower_components/angular-ui-router/release/angular-ui-router.js" type="text/javascript"></script>
        <script src="bower_components/angular-cookies/angular-cookies.js" type="text/javascript"></script>
        <script src="bower_components/angular-aria/angular-aria.js"></script>
        <script src="bower_components/angular-animate/angular-animate.js"></script>
        <script src="bower_components/angular-material/angular-material.js" type="text/javascript"></script>

        <script src="bower_components/textAngular/dist/textAngular-rangy.min.js"></script>
        <script src="bower_components/textAngular/dist/textAngular-sanitize.min.js"></script>
        <script src="bower_components/textAngular/dist/textAngular.min.js"></script>
        <script src="bower_components/md-date-time/dist/md-date-time.js" type="text/javascript"></script>

        <script src="js/app.js" type="text/javascript"></script>
        
        <script src="js/controllers/HomeCtrl.js" type="text/javascript"></script>
        <script src="js/controllers/DashboardCtrl.js" type="text/javascript"></script>
        <script src="js/controllers/BuatSuratCtrl.js" type="text/javascript"></script>
        
        <script src="js/directives/NavDirective.js" type="text/javascript"></script>
        <script src="js/directives/MainDirective.js" type="text/javascript"></script>
        
        <script src="js/services/SuratKeluarService.js" type="text/javascript"></script>
        <script src="js/services/SuratMasukService.js" type="text/javascript"></script>
    </body>

</html>
