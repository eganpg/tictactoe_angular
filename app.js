var appName = angular.module('tictactoe', ["firebase"]);
appName.controller('Grid', function($scope, $firebase) {
	var xMovesRef = new Firebase("https://learning-tic-tac-toe.firebaseio.com/xMoves");
	$scope.cells = [[1,2,4],[8,16,32],[64,128,256]]; 
	$scope.xMoves = $firebase(xMovesRef);
	xMovesRef.push(0);
	$scope.xMoves = 0;
	$scope.oMoves = 0;
	$scope.xArray = [];
	$scope.oArray = [];
	$scope.xScore = 0;
	$scope.oScore = 0;
	$scope.tieED = 0;
	$scope.winningCombo = [[1,2,4],[8,16,32],[64,128,256],[1,8,64],[2,16,128],[4,32,256],[1,16,256],[4,16,64]];
	$scope.binaryWinningCombo = [	{x: 7, descript: 'Vertical Left Win'}, 
																{x: 56, descript: "Vertical Middle Win"}, 
																{x: 448, descript: "Vertical Right Win"}, 
																{x: 73, descript: "Horizontal Top Win"},
																{x: 146, descript: "Horizontal Middle Win"},
																{x: 292, descript: "Horizontal Bottom Win"},
																{x: 273, descript: "Diaganol Win"},
																{x: 84, descript: "Diaganol Win"}
																];
	count = 0;
	$scope.reset = function() {
		for(q = 0; q < 9; q++) {
			$scope.xArray.pop();
			$scope.oArray.pop();
			$scope.xMoves = 0;
			$scope.oMoves = 0;
			count = 0;
			// console.log($scope.xArray);
		}
	}
	$scope.changeColor = function(cell) {
		if (count % 2 == 0) {
			count = count + 1;	
			$scope.xMoves += cell;
			// $scope.xMoves.$set({xMoves: $scope.xMoves});
			// $scope.xArray.push(cell);
			// $scope.winningArrayX();
			// $scope.clickCounter.$set({clickCounter: $scope.clickCount}) ;
			for(var bwcVar in $scope.binaryWinningCombo){
				var bwc = $scope.binaryWinningCombo[bwcVar];
				if (($scope.xMoves & bwc.x) == bwc.x) {
					alert("Player 1 has " + bwc.descript);
					$scope.keepScoreX();
					// $scope.reset();
				}
			}
			return true;
		}
		else {
			count = count + 1;
			$scope.oMoves += cell;
			// $scope.oArray.push(cell);
			// $scope.winningArrayO();
			for(var bwcVar in $scope.binaryWinningCombo){
				var bwc = $scope.binaryWinningCombo[bwcVar];
				if (($scope.oMoves & bwc.x) == bwc.x) {
					alert("Player 2 has " + bwc.descript);
					$scope.keepScoreO();
					// $scope.reset(); 
				}
			}
			return false;
		}
	}
// Changes the color of the background
$scope.isSet = function(whatever, cell){
	return (whatever & cell) == cell;
}
$scope.keepScoreX = function() {
	$scope.xScore = $scope.xScore + 1;
	console.log($scope.xScore);
}
$scope.keepScoreO = function() {
	$scope.oScore = $scope.oScore + 1;
	console.log($scope.oScore);
}
$scope.tie = function() {
	$scope.tieED = $scope.tieED + 1;
}
$scope.playerColors = [
	{color: "url('nyc.jpg')", name: 'NYC'},
	{color: "url('paris.jpg')", name: 'Paris'},
	{color: "url('sf.jpg')", name: 'SF'}
	];
// $scope.sortingFunction = function() {
// 		return $scope.xArray.sort();
// 	}
// Call a function 
// $scope.winningArrayX = function() {
// 	$scope.xArray.sort(function(a,b) {return a-b;})
// 	console.log($scope.xArray);
// 	for (var i = 0; i < $scope.winningCombo.length; i++)	{
// 			// for (var j = 0; j < $scope.xArray.length; j++) {
// 				if ($scope.winningCombo[i][0] == $scope.xArray[0]) {
// 					// j++;
// 					console.log('made it')
// 					if ($scope.winningCombo[i][1] == $scope.xArray[1]) {
// 						// j++;
// 						if ($scope.winningCombo[i][2] == $scope.xArray[2]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else if ($scope.winningCombo[i][2] == $scope.xArray[3]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else if ($scope.winningCombo[i][2] == $scope.xArray[4]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 					else if ($scope.winningCombo[i][1] == $scope.xArray[2]) {
// 						// j++;
// 						if ($scope.winningCombo[i][2] == $scope.xArray[3]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else if ($scope.winningCombo[i][2] == $scope.xArray[4]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 					else if ($scope.winningCombo[i][1] == $scope.xArray[3]) {
// 						// j++;
// 						if ($scope.winningCombo[i][2] == $scope.xArray[4]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 				}
// 				else if ($scope.winningCombo[i][0] == $scope.xArray[1]) {
// 					// j++;
// 					if ($scope.winningCombo[i][1] == $scope.xArray[2]) {
// 						// j++;
// 						if($scope.winningCombo[i][2] == $scope.xArray[3]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else if ($scope.winningCombo[i][2] == $scope.xArray[4]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 					else if ($scope.winningCombo[i][1] == $scope.xArray[3]) {
// 						// j++;
// 						if($scope.winningCombo[i][2] == $scope.xArray[4]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 				}
// 				else if ($scope.winningCombo[i][0] == $scope.xArray[2]) {
// 					// j++;
// 					if ($scope.winningCombo[i][1] == $scope.xArray[3]) {
// 						// j++;
// 						if ($scope.winningCombo[i][2] == $scope.xArray[4]) {
// 							$scope.keepScoreX(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 				}
// 				else {
// 					if (count == 9) {
// 						$scope.tie();
// 					}
// 				}
// 			}
// 		}
// $scope.winningArrayO = function() {
// 	$scope.oArray.sort(function(a,b) {return a-b;})
// 	console.log($scope.oArray);
// 	for (var i = 0; i < $scope.winningCombo.length; i++)	{
// 			// for (var j = 0; j < $scope.xArray.length; j++) {
// 				if ($scope.winningCombo[i][0] == $scope.oArray[0]) {
// 					// j++;
// 					console.log('made it')
// 					if ($scope.winningCombo[i][1] == $scope.oArray[1]) {
// 						// j++;
// 						if ($scope.winningCombo[i][2] == $scope.oArray[2]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else if ($scope.winningCombo[i][2] == $scope.oArray[3]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else if ($scope.winningCombo[i][2] == $scope.oArray[4]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 					else if ($scope.winningCombo[i][1] == $scope.oArray[2]) {
// 						// j++;
// 						if ($scope.winningCombo[i][2] == $scope.oArray[3]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else if ($scope.winningCombo[i][2] == $scope.oArray[4]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 					else if ($scope.winningCombo[i][1] == $scope.oArray[3]) {
// 						// j++;
// 						if ($scope.winningCombo[i][2] == $scope.oArray[4]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 				}
// 				else if ($scope.winningCombo[i][0] == $scope.oArray[1]) {
// 					// j++;
// 					if ($scope.winningCombo[i][1] == $scope.oArray[2]) {
// 						// j++;
// 						if($scope.winningCombo[i][2] == $scope.oArray[3]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else if ($scope.winningCombo[i][2] == $scope.oArray[4]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 					else if ($scope.winningCombo[i][1] == $scope.oArray[3]) {
// 						// j++;
// 						if($scope.winningCombo[i][2] == $scope.oArray[4]) {
// 							$scope.keepScoreO(); 
// 							$scope.reset();
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 				}
// 				else if ($scope.winningCombo[i][0] == $scope.oArray[2]) {
// 					// j++;
// 					if ($scope.winningCombo[i][1] == $scope.oArray[3]) {
// 						// j++;
// 						if ($scope.winningCombo[i][2] == $scope.oArray[4]) {
// 							alert('O Wins');
// 						}
// 						else {
// 							return;
// 						}
// 					}
// 				}
// 				else {
// 					if (count == 9) {
// 						$scope.tie();
// 					}
// 				}
// 			}
// 		}		
	});