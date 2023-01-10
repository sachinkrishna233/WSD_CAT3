//IIFE
(function(){
    angular.module("myApp",["ngRoute"])
    // Verification
    // .controller('myCtrl', function($scope) {
    //     $scope.xyz = "cdcd"
    // })

    .controller('homeController', function($scope, $http) {
        $http.get('http://localhost:3000').then((response) => {
            $scope.datas = response.data
        })
    })

    .controller('createController', function($scope) {
        $scope.createEntry = function() {
            var jsonObj = '{"id":'+$scope.id +',"name":"' + $scope.name +'","email":"' + $scope.email +'","item":"' + $scope.item +'","amount":' + $scope.amount +',"status":"' + $scope.status + '"}'
            console.log(jsonObj)

            fetch("http://localhost:3000/new",{
                method: "POST",
                body: jsonObj,
                headers: {"Content-Type":"application/json"}
            })
            .then((resp)=>resp.json())
            .then((result)=>console.log(result))
            .catch((err)=>console.log(err))

            $scope.id = ""
            $scope.name = ""
            $scope.email = ""
            $scope.item = ""
            $scope.amount = ""
            $scope.status = ""
        }
    })

    .config(function($routeProvider){
        $routeProvider
        .when('/',{
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .when('/create',{
            templateUrl: 'create.html',
            controller: 'createController'
        })
    })
    .config(function($locationProvider){
        $locationProvider.hashPrefix('')
    })
})();